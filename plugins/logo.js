const { cmd } = require('../command');
const mumaker = require('mumaker');

const textStyles = {
    metallic: { url: "https://en.ephoto360.com/impressive-decorative-3d-metal-text-effect-798.html", name: "Metallic" },
    ice: { url: "https://en.ephoto360.com/ice-text-effect-online-101.html", name: "Ice" },
    snow: { url: "https://en.ephoto360.com/create-a-snow-3d-text-effect-free-online-621.html", name: "Snow" },
    impressive: { url: "https://en.ephoto360.com/create-3d-colorful-paint-text-effect-online-801.html", name: "Colorful Paint" },
    matrix: { url: "https://en.ephoto360.com/matrix-text-effect-154.html", name: "Matrix" },
    light: { url: "https://en.ephoto360.com/light-text-effect-futuristic-technology-style-648.html", name: "Futuristic Light" },
    neon: { url: "https://en.ephoto360.com/create-colorful-neon-light-text-effects-online-797.html", name: "Neon Light" },
    devil: { url: "https://en.ephoto360.com/neon-devil-wings-text-effect-online-683.html", name: "Devil Wings" },
    purple: { url: "https://en.ephoto360.com/purple-text-effect-online-100.html", name: "Purple" },
    thunder: { url: "https://en.ephoto360.com/thunder-text-effect-online-97.html", name: "Thunder" },
    leaves: { url: "https://en.ephoto360.com/green-brush-text-effect-typography-maker-online-153.html", name: "Green Leaves" },
    '1917': { url: "https://en.ephoto360.com/1917-style-text-effect-523.html", name: "1917 Style" },
    arena: { url: "https://en.ephoto360.com/create-cover-arena-of-valor-by-mastering-360.html", name: "Arena of Valor" },
    hacker: { url: "https://en.ephoto360.com/create-anonymous-hacker-avatars-cyan-neon-677.html", name: "Hacker" },
    sand: { url: "https://en.ephoto360.com/write-names-and-messages-on-the-sand-online-582.html", name: "Sand Writing" },
    blackpink: { url: "https://en.ephoto360.com/create-a-blackpink-style-logo-with-members-signatures-810.html", name: "Blackpink Style" },
    glitch: { url: "https://en.ephoto360.com/create-digital-glitch-text-effects-online-767.html", name: "Glitch" },
    fire: { url: "https://en.ephoto360.com/flame-lettering-effect-372.html", name: "Fire" }
};

cmd({
    pattern: "logo",
    desc: "Create text logos with various styles",
    react: "🎨",
    category: "creator",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!q) {
            const stylesList = Object.entries(textStyles).map(([key, style]) => 
                `• .logo ${key} <text> - ${style.name}`
            ).join('\n');
            
            const usage = `
🎨 *LOGO MAKER COMMAND*

*Usage:* .logo <style> <text>

*Available Styles:*
${stylesList}

*Example:* .logo metallic Sila
*Example:* .logo neon Bot
            `.trim();
            return reply(usage);
        }

        const parts = q.split(' ');
        const style = parts[0].toLowerCase();
        const text = parts.slice(1).join(' ');

        if (!text) {
            return reply("❌ Please provide text after the style\nExample: .logo metallic Sila");
        }

        if (!textStyles[style]) {
            return reply(`❌ Invalid style: *${style}*\nUse .logo to see available styles`);
        }

        await reply("⏳ Creating your logo... Please wait!");

        const result = await mumaker.ephoto(textStyles[style].url, text);

        if (!result || !result.image) {
            throw new Error('Failed to generate logo');
        }

        await conn.sendMessage(from, {
            image: { url: result.image },
            caption: `🎨 *${textStyles[style].name.toUpperCase()} LOGO*\n\n📝 *Text:* ${text}\n\n🔗 *Powered by Sila-Md*`
        }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Failed to create logo: ${e.message}`);
    }
});
