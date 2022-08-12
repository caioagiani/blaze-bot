(function () {
  const wss = new WebSocket(
    `wss://api-v2.blaze.com/replication/?EIO=3&transport=websocket`,
  );

  const parseString = (string) => {
    const stringPick = string.match(/^(\d+)\[(.+)\]$/);

    if (typeof stringPick != 'object') return;
    if (!stringPick || stringPick[1] !== '42') return;

    const payload = stringPick[2].slice(7, stringPick[2].length);

    return JSON.parse(payload);
  };

  setInterval(() => wss.send('2'), 9000);

  const doubleBrands = {
    0: {
      name: 'Branco',
      color: 'white',
    },
    1: {
      name: 'Vermelho',
      color: 'red',
    },
    2: {
      name: 'Preto',
      color: 'black',
    },
  };

  wss.onopen = () => {
    wss.send('423["cmd",{"id":"subscribe","payload":{"room":"double_v2"}}]');
  };

  wss.onmessage = (event) => {
    const message = parseString(event.data);
    const id = message?.payload?.id;
    const wrapper = document.querySelector('.wrapper');

    if (document.getElementById(id)) return;

    if (
      message?.id == 'double.tick' &&
      message?.payload?.status == 'complete' &&
      message?.payload?.id == id
    ) {
      const newDouble = document.createElement('div');
      const { color } = doubleBrands[message.payload.color];

      newDouble.className = `double ${color}`;
      newDouble.id = id;
      newDouble.innerHTML = `<p>${message.payload.roll}</p>`;

      wrapper.prepend(newDouble);
    }
  };
})();
