import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the current slot (latest block)
  const currentSlot = await connection.getSlot();
  console.log('Current Slot:', currentSlot);

  // Get the block time for the current slot
  const blockTime = await connection.getBlockTime(currentSlot);

  if (blockTime !== null) {
    const dateTime = new Date(blockTime * 1000);
    console.log('Block Time:', dateTime.toLocaleString());
  } else {
    console.log('Failed to fetch block time.');
  }
})();
