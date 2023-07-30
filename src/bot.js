// MADE BY FRANCO CALDERAZZO
// UNIFRANN264
// 2023

//Requirements
const tmi = require('tmi.js');
const puppeteer = require('puppeteer');
const fs = require('fs');

//Load language bot
const lang = [];
const contentLang = fs.readFileSync("src/data/lang/es.txt", 'utf-8');
const splitContent = contentLang.split('\n');

splitContent.forEach((line) => {

    if (line.trim() != '' && !line.includes('#')) {

        lang.push(line.trim());

    }
});

//Set client data
var isOpen = false; //Queue list status
var tempIsOpen = false; //Auxiliar variable for "isOpen" 
var username, usernameDisplay, password; //User twitch credentials
var channel, channelArray; //Channel to send commands
var command; //Command to join the queue
var open, close; //Command to open and close the queue
var url; //Url widget of PlayWithViewers
var countNext = 0; //Count when mods send !list command more than once
var firstTime = true; //First loop check is ignored or altered
var arrayUsers; //List with users from widget
var tempArrayUsers; //Auxiliar variable list for "arrayUsers"
var stateOfGame = -1; //-1: Nothing 0: Live 1: Next 2: Queue 
var tempStateOfGame = -1; //Auxiliar variable for "stateOfGame"
var ignoreLoop = false; //Ignore loop for Puppeteer
var soundSwitch; //Sound when the user is one game away from playing
var teamSize; //Team size of queue
var team0Message, team1Message; //Message events on queue position updated

function delay(ms) {

    return new Promise(resolve => setTimeout(resolve, ms));

}

//Set Puppeteer function
async function runPuppeteer() {

    const downloadIframes = async () => {

        await page.waitForSelector('iframe.extension-panel-extension-frame__popout', { timeout: 10000 });
        const iframeElement = await page.$('iframe.extension-panel-extension-frame__popout');
        const frame1 = await iframeElement.contentFrame();

        const html = await frame1.content();

        await frame1.waitForSelector('iframe', { timeout: 10000 });
        const iframeElement2 = await frame1.$('iframe');
        const frame2 = await iframeElement2.contentFrame();

        //If it is the first loop sets timeout of 1 second
        if (firstTime) {

            await delay(5000);

        }

        //Check if the list is closed
        const isListClosed = await frame2.evaluate((lang) => {

            const messageElement = document.querySelector('div.Header__message___2553O');
            return messageElement && messageElement.textContent.includes(lang[0]);

        }, lang);

        if (firstTime && !isListClosed) {

            isOpen = true;
            tempIsOpen = true;

        } else {

            isOpen = !isListClosed;

            if (isOpen != tempIsOpen) {

                if (isOpen) {

                    partyOpened();
                    await delay(5000);

                } else {

                    partyClosed();

                }

                tempIsOpen = isOpen;

            }

        }

        //Get list of users and ranks
        const listContent = await frame2.evaluate(() => {
            const listItems = Array.from(document.querySelectorAll('.PlayersList__list___1hUBH li')).map(item => {
                const rank = item.querySelector('.Player__rank___QAMIY').textContent.trim();
                const username = item.querySelector('.Player__username___1k_68 span').textContent.trim().toLowerCase();
                return { rank, username };
            });
            return listItems;
        });

        arrayUsers = listContent;

        if (!ignoreLoop) {

            if (isOpen && arrayUsers != tempArrayUsers) {

                const index = arrayUsers.findIndex(user => user.username == usernameDisplay);
                var teamPos = 0;

                //Check the user position in the list
                if (index == -1) {

                    resendCommand();
                    await delay(1000);

                } else {

                    var tempTeamSize = teamSize;

                    for (var i = 0; i <= index; i++) {

                        if (tempTeamSize == 0) {

                            tempTeamSize = teamSize - 1;
                            teamPos++;

                        } else {

                            tempTeamSize--;

                        }

                    }

                    stateOfGame = teamPos;

                }

                if (stateOfGame != tempStateOfGame) {

                    if (stateOfGame == 0) {

                        if (!firstTime) {

                            if (team0Message) {

                                client.say(channel, lang[1]);

                            }

                            if (soundSwitch) {

                                player.play('src/data/notification.wav', function (err) {
                                    if (err) throw err
                                });

                            }

                            printMessage(lang[2]);
                            countNext = 0;

                        }
                        else {

                            firstTime = false;

                        }

                    } else if (stateOfGame == 1) {

                        if(tempStateOfGame != 0) {

                            nextToPlay();

                        }
                        
                    }

                    tempStateOfGame = stateOfGame;

                }

                tempArrayUsers = arrayUsers;

            }

        }
        else {

            await delay(5000);
            ignoreLoop = false;

        }

    };

    const browser = await puppeteer.launch({
        headless: true
    });
    const page = await browser.newPage();

    await page.goto(url);

    //Check the widget each half a second
    while (true) {

        await delay(500);
        await downloadIframes();

    }

}

//Functions to have code readability
function printMessage(message) {

    var outline = "=";

    for (var i = 1; i < message.length; i++) {

        outline = outline + "="

    }

    console.log("");
    console.log(outline);
    console.log("");
    console.log(message);
    console.log("");
    console.log(outline);
    console.log("")

}

function nextToPlay() {

    if (team1Message) {

        if (countNext == 0) {

            client.say(channel, lang[3]);

        }

        countNext++;
        printMessage(lang[4])

    }

}

function resendCommand() {

    //When moderators deletes the user, resend the command
    countNext = 0;
    stateOfGame = -1;
    client.say(channel, command);
    printMessage(lang[5])

}

function partyOpened() {

    const index = arrayUsers.findIndex(user => user.username === "UniFrann264");

    if (index === -1) {

        client.say(channel, command);
        printMessage(lang[6])

    }

}

function partyClosed() {

    client.say(channel, lang[7]);
    printMessage(lang[8])

}

console.log("d8888b. db   d8b   db db    db db      ");
console.log("88  `8D 88   I8I   88 88    88 88      ");
console.log("88oodD' 88   I8I   88 Y8    8P 88      ");
console.log("88~~~   Y8   I8I   88 `8b  d8' 88      ");
console.log("88      `8b d8'8b d8'  `8bd8'  88booo. ");
console.log("88       `8b8' `8d8'     YP    Y88888P ");
console.log("");

//Load configuration file
try {

    const configData = fs.readFileSync('src/data/config.json', 'utf-8');

    const config = JSON.parse(configData);

    soundSwitch = config.misc.sound;

    username = config.credentials.username;
    usernameDisplay = config.credentials.usernameDisplay;
    password = config.credentials.password;

    channel = config.channeldata.name;
    channelArray = [channel];
    command = config.channeldata.command;
    open = config.channeldata.open;
    close = config.channeldata.close;
    url = config.channeldata.widgetUrl;
    teamSize = config.channeldata.teamSize;
    
    team0Message = config.messages.team0;
    team1Message = config.messages.team1;

    if (soundSwitch) {

        var player = require('play-sound')(opts = {});

    }

} catch (error) {

    console.error(lang[9], error);

}

//Set options for tmi.js
const options = {
    options: {
        debug: true
    },
    identity: {
        username: username,
        password: password
    },
    channels: channelArray
}

const client = new tmi.client(options);

//Initialize tmi.js
client.connect().catch(console.error);

//Initialize chrome for read the widget PlayWithViewers
runPuppeteer();

//Message listener
client.on('chat', (target, ctx, message, self) => {

    var messageFinal = message.toLowerCase();

    if (self) return;

    if (ctx.mod && messageFinal == open) {

        ignoreLoop = true;
        partyOpened();

    }

    if (ctx.mod && messageFinal == close) {

        ignoreLoop = true;
        partyClosed();

    }

})