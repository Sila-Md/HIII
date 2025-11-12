const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "sora",
    desc: "Generate AI videos using Sora AI",
    react: "🎥",
    category: "ai",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const rawText = m.message?.conversation?.trim() ||
            m.message?.extendedTextMessage?.text?.trim() ||
            m.message?.imageMessage?.caption?.trim() ||
            m.message?.videoMessage?.caption?.trim() ||
            '';

        const used = (rawText || '').split(/\s+/)[0] || '.sora';
        const args = rawText.slice(used.length).trim();
        const quotedMsg = m.message?.extendedTextMessage?.contextInfo?.quotedMessage;
        const quotedText = quotedMsg?.conversation || quotedMsg?.extendedTextMessage?.text || '';
        const prompt = args || quotedText;

        if (!prompt) {
            return reply(`🎥 *SORA AI VIDEO GENERATOR*\n\n*Usage:* .sora <prompt>\n*Example:* .sora anime girl with short blue hair\n\nOr reply to a message with .sora`);
        }

        await reply("⏳ Generating your video... Please wait!");

        const apiUrl = `https://okatsu-rolezapiiz.vercel.app/ai/txt2video?text=${encodeURIComponent(prompt)}`;
        const { data } = await axios.get(apiUrl, { timeout: 60000, headers: { 'user-agent': 'Mozilla/5.0' } });

        const videoUrl = data?.videoUrl || data?.result || data?.data?.videoUrl;
        if (!videoUrl) {
            throw new Error('No video URL received from API');
        }

        await conn.sendMessage(from, {
            video: { url: videoUrl },
            mimetype: 'video/mp4',
            caption: `🎥 *SORA AI GENERATED*\n\n📝 *Prompt:* ${prompt}\n\n🔗 *Powered by Sila-Md*`
        }, { quoted: mek });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Failed to generate video: ${e.message || 'Try a different prompt'}`);
    }
});
