import { Connection, clusterApiUrl } from '@solana/web3.js';

async function listenToSlotChanges() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Subscribe to slot changes
    connection.onSlotChange((slotInfo) => {
      console.log('Slot change:', slotInfo);

      // Handle slot change, for example:
      handleSlotChange(slotInfo);
    });

    console.log('Listening for slot changes. Press Ctrl+C to exit.');

    // Keep the script running to continue receiving updates
    process.stdin.resume();
  } catch (error) {
    console.error('Error subscribing to slot changes:', error);
  }
}

// Example function to handle slot change
function handleSlotChange(slotInfo: number) {
  console.log('Slot changed to:', slotInfo);
}

// Start listening to slot changes
listenToSlotChanges().catch((err) => {
  console.error('Error listening to slot changes:', err);
});
