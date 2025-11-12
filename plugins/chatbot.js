const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "chatbot",
    desc: "Toggle chatbot on/off",
    react: "🤖",
    category: "ai",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        if (!isOwner && !isAdmins) {
            return reply("❌ Only admins/owner can use this command!");
        }

        const status = q ? q.toLowerCase() : '';
        
        if (!status || !['on', 'off'].includes(status)) {
            return reply(`🤖 *CHATBOT SETTINGS*\n\n*Usage:* .chatbot on/off\n*Example:* .chatbot on\n\n*Note:* When on, bot will auto-reply to all messages`);
        }

        // Add your chatbot toggle logic here
        // Example: chatbotStatus[from] = status === 'on';

        await reply(`🤖 Chatbot has been turned *${status.toUpperCase()}* ${status === 'on' ? '✅' : '❌'}`);

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ Error: ${e.message}`);
    }
});

// AUTO-CHATBOT HANDLER (Add this to your main message handler)
async function handleChatbot(message, conn) {
    try {
        // Check if chatbot is enabled for this chat
        // if (!chatbotEnabled) return;

        const text = message.message?.conversation || 
                    message.message?.extendedTextMessage?.text || '';

        if (!text || text.startsWith('.')) return;

        // Use either API
        const api1 = `https://api.dreaded.site/api/chatgpt?text=${encodeURIComponent(text)}`;
        const api2 = "https://ai-api-key-699ac94e6fae.herokuapp.com/api/ask";
        
        let response;
        try {
            // Try first API
            const { data } = await axios.get(api1);
            response = data.response || data.answer || "Samahani, sielewi hili.";
        } catch (e) {
            // Try second API if first fails
            const { data } = await axios.post(api2, { question: text });
            response = data.answer || data.response || "Samahani, sielewi hili.";
        }

        // Reply in Swahili/English mix
        await conn.sendMessage(message.key.remoteJid, { 
            text: `🤖 ${response}\n\n_Powered by Sila-Md_` 
        }, { quoted: message });

    } catch (error) {
        console.error("Chatbot error:", error);
    }
}
