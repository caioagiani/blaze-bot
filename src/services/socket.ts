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

  const interval = setInterval(() => wss.send('2'), 5000);

  wss.on('open', () => {
    wss.send('423["cmd",{"id":"subscribe","payload":{"room":"double_v2"}}]');
  });

  wss.on('message', (data: any) => {
    const message = parseString(data.toString());

    if (message?.id == 'double.tick') event.emit('double', message.payload);
  });

  wss.on('close', (code: number, reason: Buffer) => {
    event.emit('close', { code, reason: reason.toString() });
    clearInterval(interval);
    wss.close();
  });

  return { event };
};
