const { cmd } = require('../command');

cmd({
    pattern: "tagall",
    desc: "Tag all group members",
    react: "📢",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Check if it's a group
        if (!isGroup) {
            return reply("❌ This command can only be used in groups!");
        }

        // Check if user is admin
        if (!isAdmins && !isOwner) {
            return reply("❌ Only admins can use this command!");
        }

        // Check if bot is admin
        if (!isBotAdmins) {
            return reply("❌ Bot needs to be admin to use this command!");
        }

        const message = q ? q : "📢 *Attention Everyone!* 📢";
        
        let text = `📢 ${message}\n\n`;
        let mentions = [];

        // Add all participants to mentions
        participants.forEach(member => {
            mentions.push(member.id);
            text += `@${member.id.split('@')[0]}\n`;
        });

        // Send message with mentions
        await conn.sendMessage(from, {
            text: text,
            mentions: mentions
        }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
