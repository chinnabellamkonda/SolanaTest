import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the current slot (latest block)
  const currentSlot = await connection.getSlot();
  console.log('Current Slot:', currentSlot);

  // Get the confirmed block information for the current slot
  const confirmedBlock = await connection.getConfirmedBlock(currentSlot);

  if (confirmedBlock) {
    console.log('Confirmed Block Information:', confirmedBlock);
  } else {
    console.log('Failed to fetch confirmed block information.');
  }
})();
