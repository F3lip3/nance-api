import { seedCurrencies } from './seeds/currencies';

seedCurrencies()
  .then(() => {
    console.info('seeding done');
  })
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
