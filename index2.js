const { ChatClient } = require("dank-twitch-irc");
const fs = require('fs');

let client = new ChatClient({
  username: "dirteamug",
  password: fs.readFileSync('./token').toString(),
});

client.on("ready", () => console.log("Successfully connected to chat"));
client.on("close", (error) => {
  if (error != null) {
    console.error("Client closed due to error", error);
  }
});

client.on("PRIVMSG", (msg) => {
  console.log(`[#${msg.channelName}] ${msg.displayName}: ${msg.messageText}`);
});

client.on("USERNOTICE", (msg) => {
  console.log(msg);
});

// See below for more events

client.connect();
client.join("dirteamug");