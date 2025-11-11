const axios = require("axios");
const { cmd } = require("../command");


cmd({
    pattern: "mpesamenu",
    alias: ["pesa"],
    desc: "menu the bot",
    category: "menu",
    react: "🧿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `*╭───❍𝐏𝐀𝐘𝐌𝐄𝐍𝐓🫡❍*
‎*├⬡ .𝐇𝐚𝐥𝐨 𝐏𝐞𝐬𝐚*
‎*├⬡ .255612491554*
‎*╰───────────────❍*`;

        await conn.sendMessage(
            from,
            {
                image: { url: `https://n.uguu.se/enxBsCxO.jpg` },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363422610520277@newsletter',
                        newsletterName: "𝐒𝐈𝐋𝐀 𝐓𝐄𝐂𝐇 𝐏𝐀𝐘𝐌𝐄𝐍𝐓",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
