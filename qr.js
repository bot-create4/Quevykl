const { makeid } = require('./gen-id');
const express = require('express');
const QRCode = require('qrcode');
const fs = require('fs');
let router = express.Router();
const pino = require("pino");
const {
    default: makeWASocket,
    useMultiFileAuthState,
    delay,
    makeCacheableSignalKeyStore,
    Browsers,
    jidNormalizedUser
} = require("@whiskeysockets/baileys");
const axios = require('axios');

function removeFile(FilePath) {
    if (!fs.existsSync(FilePath)) return false;
    fs.rmSync(FilePath, { recursive: true, force: true });
}

router.get('/', async (req, res) => {
    const id = makeid();
    
    async function GIFTED_MD_PAIR_CODE() {
        const {
            state,
            saveCreds
        } = await useMultiFileAuthState('./temp/' + id);
        try {
            var items = ["Safari"];
            function selectRandomItem(array) {
                var randomIndex = Math.floor(Math.random() * array.length);
                return array[randomIndex];
            }
            var randomItem = selectRandomItem(items);
            
            let sock = makeWASocket({
                auth: state,
                printQRInTerminal: false,
                logger: pino({
                    level: "silent"
                }),
                browser: Browsers.macOS("Desktop"),
            });
            
            sock.ev.on('creds.update', saveCreds);
            sock.ev.on("connection.update", async (s) => {
                const {
                    connection,
                    lastDisconnect,
                    qr
                } = s;
                if (qr) await res.end(await QRCode.toBuffer(qr));
                if (connection == "open") {
                    await delay(5000);
                    let data = fs.readFileSync(__dirname + `/temp/${id}/creds.json`);
                    let rf = __dirname + `/temp/${id}/creds.json`;
                    
                    function generateRandomText() {
                        const prefix = "3EB";
                        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        let randomText = prefix;
                        for (let i = prefix.length; i < 22; i++) {
                            const randomIndex = Math.floor(Math.random() * characters.length);
                            randomText += characters.charAt(randomIndex);
                        }
                        return randomText;
                    }
                    
                    const randomText = generateRandomText();
                    try {
                        const base64Session = Buffer.from(data.toString()).toString('base64');
                        let md = "KING-RANUX~" + base64Session;
                        let code = await sock.sendMessage(sock.user.id, { text: md });
                        
                        let cap = `
_*👑 KING RANUX QR Scan Successful! 🚀*_

Your *KING RANUX* Session ID has been securely delivered in the previous message. You're now officially connected to the realm of automation royalty! 👑

🛠️ *How to add your SESSION_ID:*
1️⃣ Open the `session.js` file in your project repo
2️⃣ Paste your session like this:
```js
module.exports = {
  SESSION_ID: 'PASTE_YOUR_SESSION_ID_HERE'
}
```
  3️⃣ Save the file
4️⃣ Run the bot and watch the magic unfold! ✅

---

⚠️ _IMPORTANT:_
Your Session ID is *private*. Never share it with anyone—even your most trusted allies!

---

📣 _Community & Updates:_
🔗 Join our support group: https://chat.whatsapp.com/Fdg0tLbtrZs3WA0v2y8DHx?mode=ems_copy_t
📢 Follow the official channel: https://whatsapp.com/channel/0029VbB0bnq0gcfMqhA9j93c

---

🙏 _Thank you for choosing KING RANUX!_ 🤖
> _Crafted with ❤️ by Mr. Ransara Devnath_
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "King RANUX MD",
                                thumbnailUrl: "https://raw.githubusercontent.com/bot-create4/Quevykl/refs/heads/main/Item/Gemini_Generated_Image_88me0y88me0y88me.png",
                                sourceUrl: "https://whatsapp.com/channel/0029VbB0bnq0gcfMqhA9j93c",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: code });
                    } catch (e) {
                        let ddd = await sock.sendMessage(sock.user.id, { text: e.toString() });
                       let cap = `
_*👑 KING RANUX QR Scan Successful! 🚀*_

Your *KING RANUX* Session ID has been securely delivered in the previous message. You're now officially connected to the realm of automation royalty! 👑

🛠️ *How to add your SESSION_ID:*
1️⃣ Open the `session.js` file in your project repo
2️⃣ Paste your session like this:
```js
module.exports = {
  SESSION_ID: 'PASTE_YOUR_SESSION_ID_HERE'
}
```
  3️⃣ Save the file
4️⃣ Run the bot and watch the magic unfold! ✅

---

⚠️ _IMPORTANT:_
Your Session ID is *private*. Never share it with anyone—even your most trusted allies!

---

📣 _Community & Updates:_
🔗 Join our support group: https://chat.whatsapp.com/Fdg0tLbtrZs3WA0v2y8DHx?mode=ems_copy_t
📢 Follow the official channel: https://whatsapp.com/channel/0029VbB0bnq0gcfMqhA9j93c

---

🙏 _Thank you for choosing KING RANUX!_ 🤖
> _Crafted with ❤️ by Mr. Ransara Devnath_
`;
                    await sock.sendMessage(sock.user.id, {
                        text: cap,
                        contextInfo: {
                            externalAdReply: {
                                title: "King RANUX MD",
                                thumbnailUrl: "https://raw.githubusercontent.com/bot-create4/Quevykl/refs/heads/main/Item/Gemini_Generated_Image_88me0y88me0y88me.png",
                                sourceUrl: "https://whatsapp.com/channel/0029VbB0bnq0gcfMqhA9j93c",
                                mediaType: 2,
                                renderLargerThumbnail: true,
                                showAdAttribution: true,
                            },
                        },
                    }, { quoted: ddd });
                    }
                    await delay(10);
                    await sock.ws.close();
                    await removeFile('./temp/' + id);
                    console.log(`👤 ${sock.user.id} 𝗖𝗼𝗻𝗻𝗲𝗰𝘁𝗲𝗱 ✅ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...`);
                    await delay(10);
                    process.exit();
                } else if (connection === "close" && lastDisconnect && lastDisconnect.error && lastDisconnect.error.output.statusCode != 401) {
                    await delay(10);
                    GIFTED_MD_PAIR_CODE();
                }
            });
        } catch (err) {
            console.log("service restarted", err);
            await removeFile('./temp/' + id);
            if (!res.headersSent) {
                await res.send({ code: "❗ Service Unavailable" });
            }
        }
    }
    await GIFTED_MD_PAIR_CODE();
});

setInterval(() => {
    console.log("☘️ 𝗥𝗲𝘀𝘁𝗮𝗿𝘁𝗶𝗻𝗴 𝗽𝗿𝗼𝗰𝗲𝘀𝘀...");
    process.exit();
}, 180000);

module.exports = router;
