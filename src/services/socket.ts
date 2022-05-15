import * as ws from 'ws';
import * as EventEmitter from 'events';
import parseString from '../utils/parse-string';

export type BlazeEventEmitter = EventEmitter;
export interface IBlazeConnection {
  event: BlazeEventEmitter;
}

export const BlazeAPI = (): IBlazeConnection => {
  const event = new EventEmitter();
  const wss = new ws(
    'wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket',
  );

  const interval = setInterval(() => {
    wss.send('2');
  }, 5000);

  wss.on('open', function open() {
    wss.send('423["cmd",{"id":"subscribe","payload":{"room":"double_v2"}}]');
  });

  wss.on('message', function incoming(data) {
    const message = parseString(data.toString());

    if (message?.id == 'double.tick') event.emit('double', message.payload);
  });

  wss.on('error', function error(err) {
    console.log(err);
  });

  wss.on('close', (code, reason) => {
    console.log({ code, reason: reason.toString() });
    clearInterval(interval);
    wss.close();
  });

  return { event };
};
