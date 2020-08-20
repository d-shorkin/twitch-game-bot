import {getAuthToken} from "./auth";
import WebSocket from 'ws';
import axios from "axios";

function nonce(length: number) {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

getAuthToken()
  .then(token => {
    return axios.get('https://api.twitch.tv/kraken/channel', {
      headers: {
        'Accept': 'application/vnd.twitchtv.v5+json',
        'Client-ID': 'nw1bxwrj6z5kiblpa6tufqiwrw9rjy',
        'Authorization': 'OAuth ' + token
      }
    }).then((res) => ({auth_token: token, channel_id: res.data._id}))
  })
  .then(({auth_token, channel_id}) => {
    const ws = new WebSocket('wss://pubsub-edge.twitch.tv');

    ws.onmessage = (event) => {
      console.log(JSON.parse(event.data.toString()));
    };

    ws.onopen = () => {
      console.log(nonce(15), auth_token);
      ws.send(JSON.stringify({
        type: 'LISTEN',
        nonce: nonce(15),
        data: {
          topics: ['channel-points-channel-v1.' + channel_id],
          auth_token: auth_token
        }
      }));
    }
  }).catch(console.error);