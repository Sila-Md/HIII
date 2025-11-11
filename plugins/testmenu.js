const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');

cmd({
    pattern: "menu",
    desc: "Show auto-style powerful menu",
    category: "main",
    react: "☠️",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {
    try {
        const symbols = ['⚡', '✨', '🌟', '🔮', '🎯', '🚀', '💫', '🔱'];
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        
        const name = await conn.getName(m.sender);
        const totalreg = Object.keys(global.db.data.users || {}).length;
        const uptime = runtime(process.uptime());

        // Auto-style command layout
        const menuText = `
*${config.OWNER_NAME}* • AUTO SYSTEM

╭━━━━━━━━━━━━━━━━━━━━╮
│    ☠️ BOT STATUS    │
╰━━━━━━━━━━━━━━━━━━━━╯

👤 User: ${name}
🕒 Uptime: ${uptime}
👥 Users: ${totalreg}
🌐 Mode: ${config.MODE}
⚡ Prefix: ${config.PREFIX}

╭━━━━━━━━━━━━━━━━━━━━╮
│    🚀 COMMANDS     │
╰━━━━━━━━━━━━━━━━━━━━╯

${randomSymbol} menu
${randomSymbol} profile  
${randomSymbol} tools
${randomSymbol} ai
${randomSymbol} media
${randomSymbol} download
${randomSymbol} group
${randomSymbol} fun
${randomSymbol} sticker
${randomSymbol} owner

╭━━━━━━━━━━━━━━━━━━━━╮
│    🌐 PORTAL       │
╰━━━━━━━━━━━━━━━━━━━━╯

> ${config.DESCRIPTION}
        `.trim();

        const botImg = 'https://files.catbox.moe/jwmx1j.jpg';

        // Send menu with dual media and buttons
        await conn.sendMessage(from, { 
            image: { url: botImg }, // MAIN LARGE IMAGE
            caption: menuText,
            footer: 'Tap button to open portal in browser →',
            templateButtons: [
                {
                    index: 1,
                    urlButton: {
                        displayText: '🌐 VISIT SILA PORTAL', 
                        url: 'https://xibs.space'
                    }
                },
                {
                    index: 2,
                    urlButton: {
                        displayText: '📢 JOIN CHANNEL', 
                        url: 'https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02'
                    }
                }
            ],
            contextInfo: {
                externalAdReply: {
                    title: "XIBS",
                    body: "View Our Channel",
                    thumbnailUrl: botImg, // THUMBNAIL FOR EXTERNAL AD
                    sourceUrl: "https://whatsapp.com/channel/0029VbBG4gfISTkCpKxyMH02",
                    mediaType: 1,
                    renderLargerThumbnail: true
                }
            }
        }, { 
            quoted: mek,
            // ORDER MESSAGE BUSINESS STYLE
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                externalAdReply: {
                    showAdAttribution: true,
                    title: "ORDER #2009 • INQUIRY",
                    body: "Items: 2004 | CATALOG: from SILA-MD-s2",
                    thumbnailUrl: botImg, // THUMBNAIL FOR ORDER MESSAGE
                    sourceUrl: "https://xibs.space",
                    mediaType: 1
                }
            }
        });

    } catch (e) {
        console.error('Menu Error:', e);
        await conn.sendMessage(
            from,
            { 
                text: `❌ Menu system is currently busy. Please try again later.\n\n> ${config.DESCRIPTION}` 
            },
            { quoted: mek }
        );
    }
});
