import * as cron from 'node-cron';
import Double from '../database/schemas/double';
import DoubleController from '../controllers/double';

cron.schedule(
  '*/15 * * * * *',
  async () => {
    const getDoubles = await DoubleController.crawl();

    getDoubles.records.map(async (record: any) => {
      const checkValue = await Double.findOne({ id: record.id });

      if (checkValue) return;

      await Double.create(record);
    });

    console.log('CRON: ON', new Date());
  },
  {
    scheduled: true,
    timezone: 'America/Sao_Paulo',
  },
);

module.exports = cron;
