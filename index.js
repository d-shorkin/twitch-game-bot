const tmi = require('tmi.js');
const fs = require('fs');

console.log();

// Define configuration options
const opts = {
  identity: {
    username: 'dirteamug',
    password: fs.readFileSync('./token').toString()
  },
  channels: ['dirteamug']
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
  console.log(target, context, msg, self);
}

// Called every time the bot connects to Twitch chat
function onConnectedHandler(addr, port) {
  console.log(`* Connected to ${addr}:${port}`);
}