const { exec } = require("child_process");
const { upload } = require('./mega');
const express = require('express');
let router = express.Router()
const pino = require("pino");

let { toBuffer } = require("qrcode");

const path = require('path');

const fs = require("fs-extra");

const { Boom } = require("@hapi/boom");

const MESSAGE = process.env.MESSAGE ||  `
*SESSION GENERATED SUCCESSFULY* ✅

_*HELLO RAZA-INC-MD USER*_ 👋 

*_POWERED BY LEGEND RAZA_*🙂🥂
___________________________________
╔════◇
║ _*『 WOW YOU'VE CHOSEN RAZA-INC-MD 』*_
║ _YOU HAVE COMPLETED THE FIRST STEP TO DEPLOY A WHATSAPP BOT._
╚════════════════════════╝
╔═════◇
║  ••• _𝗩𝗶𝘀𝗶𝘁 𝗙𝗼𝗿 𝗛𝗲𝗹𝗽_ •••
║❒ _*YOUTUBE:*_ _youtube.com/@INNOXCENTRAZA_
║❒ *Owner:* _https://wa.me/923280966780_
║❒ _*Repo:*_ _https://github.com/LEGEND-RAZA/RAZA-INC-MD-V1
║

║❒ _*WA CHANNEL:*_ _https://whatsapp.com/channel/0029Vb3tkvIJZg48ETQSWN2z_
║
╚════════════════════════╝
`























if (fs.existsSync('./auth_info_baileys')) {

    fs.emptyDirSync(__dirname + '/auth_info_baileys');

  };

  

  router.get('/', async (req, res) =>  {



  const { default: SuhailWASocket, useMultiFileAuthState, Browsers, delay,DisconnectReason, makeInMemoryStore, } = require("@whiskeysockets/baileys");

  const store = makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })

  async function SUHAIL() {

    const { state, saveCreds } = await useMultiFileAuthState(__dirname + '/auth_info_baileys')

    try {

      let Smd =SuhailWASocket({ 

        printQRInTerminal: false,

        logger: pino({ level: "silent" }), 

        browser: Browsers.macOS("Desktop"),

        auth: state 

        });





      Smd.ev.on("connection.update", async (s) => {

        const { connection, lastDisconnect, qr } = s;

        if (qr) {

                    // Ensure the response is only sent once

                    if (!res.headersSent) {

                        res.setHeader('Content-Type', 'image/png');

                        try {

                            const qrBuffer = (await toBuffer(qr));  // Convert QR to buffer

                            res.end(qrBuffer);  // Send the buffer as the response

                            return; // Exit the function to avoid sending further responses

                        } catch (error) {

                            console.error("Error generating QR Code buffer:", error);

                            

                            return; // Exit after sending the error response

                        }

                    }

        }





        if (connection == "open"){

          await delay(3000);

          let user = Smd.user.id;





//===========================================================================================

//===============================  SESSION ID    ===========================================

//===========================================================================================



          function randomMegaId(length = 6, numberLength = 4) {

                      const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

                      let result = '';

                      for (let i = 0; i < length; i++) {

                      result += characters.charAt(Math.floor(Math.random() * characters.length));

                        }

                       const number = Math.floor(Math.random() * Math.pow(10, numberLength));

                        return `${result}${number}`;

                        }



                        const auth_path = './auth_info_baileys/';

                        const mega_url = await upload(fs.createReadStream(auth_path + 'creds.json'), `${randomMegaId()}.json`);



                        const string_session = mega_url.replace('https://mega.nz/file/', '');



                        const Scan_Id = string_session;

          console.log(`

====================  SESSION ID  ==========================                   

SESSION-ID ==> ${Scan_Id}

-------------------   SESSION CLOSED   -----------------------

`)





          let msgsss = await Smd.sendMessage(user, { text:  Scan_Id });

          await Smd.sendMessage(user, { text: MESSAGE } , { quoted : msgsss });

          await delay(1000);

          try{ await fs.emptyDirSync(__dirname+'/auth_info_baileys'); }catch(e){}





        }



        Smd.ev.on('creds.update', saveCreds)



        if (connection === "close") {            

            let reason = new Boom(lastDisconnect?.error)?.output.statusCode

            // console.log("Reason : ",DisconnectReason[reason])

            if (reason === DisconnectReason.connectionClosed) {

              console.log("Connection closed!")

             // SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.connectionLost) {

                console.log("Connection Lost from Server!")

            //  SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.restartRequired) {

                console.log("Restart Required, Restarting...")

              SUHAIL().catch(err => console.log(err));

            } else if (reason === DisconnectReason.timedOut) {

                console.log("Connection TimedOut!")

             // SUHAIL().catch(err => console.log(err));

            }  else {

                console.log('Connection closed with bot. Please run again.');

                console.log(reason)

              await delay(5000);

              exec('pm2 restart qasim');

              process.exit(0)

            }

          }







      });

    } catch (err) {

        console.log(err);

        exec('pm2 restart qasim');

       await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

       

    }

  }

  SUHAIL().catch(async(err) => {

    console.log(err)

    await fs.emptyDirSync(__dirname+'/auth_info_baileys'); 

    exec('pm2 restart qasim');





    //// MADE WITH 



});

return await SUHAIL()



  });

module.exports = router
