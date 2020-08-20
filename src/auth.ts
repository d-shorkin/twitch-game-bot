import express, {Application} from 'express';
import {Server} from "http";
import axios from "axios";

export function getAuthToken(): Promise<string> {

  return new Promise<string>(resolve => {
    const app: Application = express();

    let server: Server | null = null;

    app.all('/access_token', (req, res) => {
      res.send('You can close this page');
      if (server) {
        server.close();
      }

      axios.post('https://id.twitch.tv/oauth2/token', {}, {
        params: {
          client_id: 'nw1bxwrj6z5kiblpa6tufqiwrw9rjy',
          client_secret: 'rzgqodbfqskejs7l248u1g37rcm71f',
          code: req.query.code?.toString(),
          grant_type: 'authorization_code',
          redirect_uri: 'http://localhost:3322/access_token'
        }
      }).then(res => {
        console.log(res.data);
        resolve(res.data.access_token);
      }).catch(console.error);

      //return resolve(req.query.code?.toString());
    });

    server = app.listen(3322, () => {
      console.log('https://id.twitch.tv/oauth2/authorize?client_id=nw1bxwrj6z5kiblpa6tufqiwrw9rjy&redirect_uri=http://localhost:3322/access_token&response_type=code&scope=channel:read:redemptions+channel_read');
    });
  });

}


// curl -H 'Accept: application/vnd.twitchtv.v5+json' -H 'Client-ID: nw1bxwrj6z5kiblpa6tufqiwrw9rjy' -H 'Authorization: OAuth u95wncpztdcyi3p4v5odesx5qsu8k3' -X GET 'https://api.twitch.tv/kraken/channel'