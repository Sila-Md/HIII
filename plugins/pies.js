const { cmd } = require('../command');
const fetch = require('node-fetch');

const BASE = 'https://shizoapi.onrender.com/api/pies';
const VALID_COUNTRIES = ['china', 'indonesia', 'japan', 'korea', 'hijab'];

async function fetchPiesImageBuffer(country) {
    const url = `${BASE}/${country}?apikey=shizo`;
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('image')) throw new Error('API did not return an image');
    return res.buffer();
}

cmd({
    pattern: "pies",
    desc: "Get pies images from different countries",
    react: "🥧",
    category: "fun",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const country = q ? q.toLowerCase().trim() : '';
        
        if (!country) {
            const usage = `
🥧 *PIES COMMAND*

*Usage:* .pies <country>
            
*Available Countries:*
${VALID_COUNTRIES.map(c => `• ${c.charAt(0).toUpperCase() + c.slice(1)}`).join('\n')}

*Example:* .pies japan
            `.trim();
            return reply(usage);
        }

        if (!VALID_COUNTRIES.includes(country)) {
            return reply(`❌ Unsupported country: *${country}*\n\nAvailable: ${VALID_COUNTRIES.join(', ')}`);
        }

        const imageBuffer = await fetchPiesImageBuffer(country);
        
        await conn.sendMessage(from, {
            image: imageBuffer,
            caption: `🥧 *Pies from ${country.charAt(0).toUpperCase() + country.slice(1)}*\n\n🔗 *Powered by Sila-Md*`
        }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Failed to fetch image: ${e.message}`);
    }
});
