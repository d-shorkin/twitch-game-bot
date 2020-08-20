const {TwitchClient, StaticAuthProvider} = require('twitch');
const {PubSubClient} = require('twitch-pubsub-client');

const clientId = '123abc';
const accessToken = 'def456';
const authProvider = new StaticAuthProvider(clientId, accessToken);
const apiClient = new TwitchClient({authProvider});
const pubSubClient = new PubSubClient();
pubSubClient.registerUserListener(apiClient)
  .then(console.log);