# PlayWithViewersListener
A bot that allows you to automatically enter a command to be able to enter the PlayWithViewersBot bot queue, this bot has the ability to know when the room opens, when the player is removed from the list to resend the command and when the room is closed room to avoid sending commands.

To run the bot, just open the bat: `bot.bat`.

## Dependencies

We will need to install Node.js to run the bot, there is no need to install the additional tools. Download Node.js [here](https://nodejs.org/en) (I recommend the stable version).

The bot includes the following modules:

• TMI.js: To send messages to the channel.

• Puppeteer: To observe the behavior of the widget.

• Play-sound: Emits a sound to notify the user that there is 1 game left to enter.

**WARNING**: In case the modules do not work, enter the following commands inside the PlayWithViewers folder:

`npm install tmi.js`

`npm install play-sound`

`npm install puppeteer`

## Setting
Before starting the bot we need to configure some parameters so that it works correctly with your Twitch user, remember that all the information must be in lowercase. We must access the following directory src/data.

We will enter the config.json file

### Misc:

`language`: Language in which PlayWithViewers works, you can configure the files in the lang folder with the prefix plus .txt for example es.txt, en.txt, pt.txt.

`sound`: When we are about to play the bot notifies us by issuing an alarm to notify us (it opens the Windows music player).

### Credentials:

`username`: We will have to put our Twitch username in lowercase, the username must be the one used to log in.

`usernameDisplay`: Username that appears in the chat, this can be the same or different from username.

`password`: It is not the usual password to log in to Twitch, it is an authentication key that the bot uses to enter as a bot, so when we start the bot it will not need the authenticator code (if the account has it activated ).
To obtain this key, we will have to enter the following [link](https://twitchapps.com/tmi/), then at the bottom click on "Connect", where Twitch will ask us to authorize the bot, it will give us a key that we will have to copy and paste in the password file (remember not to leave spaces before or at the end).

### channelData:

`name`: Username of the channel where the bot has to send the messages.

`command`: Command to enter the room.

`open`: Command used by moderators to open the room.

`close`: Command used by moderators to close the room.

`widgetUrl`: Url of the widget, to obtain it we must go to the lower right part of the widget, we will see a square button with an arrow coming out, when clicked it will open a pop-up window, there we will copy the url and put it in this field .

`teamSize`: Team size.

### messages:

`team0`: Message that will be sent to the channel when the team is about to play, this field is completed only with `true` or `false`.

`team1`: Message that will be sent to the channel when the team is one game to play, this field is completed only with `true` or `false`.
