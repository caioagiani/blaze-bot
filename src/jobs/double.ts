import { BlazeAPI } from '../services/socket';
import Double from '../database/schemas/double';

const blazeSocketAPI = BlazeAPI();

blazeSocketAPI.event.on('double', async (data) => {
  await Double.findOneAndUpdate({ id: data.id }, data, {
    upsert: true,
    new: true,
  });
});

export default blazeSocketAPI;
