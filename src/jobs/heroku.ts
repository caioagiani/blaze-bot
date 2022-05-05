import axios from 'axios';

module.exports = setInterval(async () => {
  console.log('RUNNING');

  const { status } = await axios.get(
    `https://${process.env.APPLICATION}.herokuapp.com/`,
  );

  if (status !== 200) return console.log('[-] Aplicação com erro.');

  return console.log('[+] Aplicação ok.');
}, 20 * 60 * 1000);
