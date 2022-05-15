import Double from '../database/schemas/double';
import { BlazeAPI } from '../services/socket';

const blazeSocketAPI = BlazeAPI();

blazeSocketAPI.event.on('double', async (data: any) => {
  await Double.findOneAndUpdate({ id: data.id }, data, {
    upsert: true,
    new: true,
  });
});

export default blazeSocketAPI;
