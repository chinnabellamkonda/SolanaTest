import { Connection, clusterApiUrl } from '@solana/web3.js';

async function listenToSlotUpdates() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Subscribe to slot updates
    connection.onSlotUpdate((slotInfo) => {
      console.log('Slot update:', slotInfo);

      // Handle slot update, for example:
      handleSlotUpdate(slotInfo);
    });

    console.log('Listening for slot updates. Press Ctrl+C to exit.');

    // Keep the script running to continue receiving updates
    process.stdin.resume();
  } catch (error) {
    console.error('Error subscribing to slot updates:', error);
  }
}

// Example function to handle slot update
function handleSlotUpdate(slotInfo: number) {
  console.log('Current slot:', slotInfo);
}

// Start listening to slot updates
listenToSlotUpdates().catch((err) => {
  console.error('Error listening to slot updates:', err);
});
