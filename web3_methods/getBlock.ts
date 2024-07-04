import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the current slot (latest block)
  const currentSlot = await connection.getSlot();
  console.log('Current Slot:', currentSlot);

  // Get the block information for the current slot
  const blockInfo = await connection.getBlock(currentSlot);

  if (blockInfo) {
    console.log('Block Information:', blockInfo);
  } else {
    console.log('Failed to fetch block information.');
  }
})();
