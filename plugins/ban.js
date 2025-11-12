const { cmd } = require('../command');

cmd({
    pattern: "ban",
    desc: "Ban user from using the bot",
    react: "🚫",
    category: "owner",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner) {
            return reply("❌ This command is for bot owner only!");
        }

        if (!quoted && !q) {
            return reply("❌ Please mention user or reply to their message\nUsage: .ban @user or reply .ban");
        }

        let targetUser = sender;
        if (quoted) {
            targetUser = quoted.participant || quoted.sender;
        } else if (q.includes('@')) {
            targetUser = q.replace('@', '').split(' ')[0] + '@s.whatsapp.net';
        }

        // Add your ban logic here (save to database or file)
        // Example: bannedUsers.add(targetUser);

        await reply(`🚫 User has been banned!\n📱 User: ${targetUser.split('@')[0]}`);

        // Optional: Send message to banned user
        try {
            await conn.sendMessage(targetUser, {
                text: `🚫 *YOU HAVE BEEN BANNED*\n\nYou are no longer allowed to use Sila-Md bot.\n\nContact owner if this is a mistake.`
            });
        } catch (e) {
            console.log("Could not notify banned user");
        }

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
