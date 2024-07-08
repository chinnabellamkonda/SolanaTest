import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Get the current slot (latest block)
  const currentSlot = await connection.getSlot();
  console.log('Current Slot:', currentSlot);

  if (currentSlot) {
    console.log('Current Slot:', currentSlot);
  } else {
    console.log('Failed to fetch Slot information.');
  }
})();
