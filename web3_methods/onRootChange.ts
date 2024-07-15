import { Connection } from '@solana/web3.js';

async function subscribeToRootChanges() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Subscribe to root change notifications
    const subscriptionId = connection.onRootChange((root) => {
      console.log(`Received root change notification. New root: ${root}`);
      
      // Perform actions based on the new root
      handleRootChange(root);
    });

    console.log('Subscribed to root change notifications. Press Ctrl+C to exit.');

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from root changes when done (add this to a cleanup function as needed)
    // connection.removeRootChangeListener(subscriptionId);
    // console.log('Unsubscribed from root change notifications.');
  } catch (error) {
    console.error('Error subscribing to root changes:', error);
  }
}

// Example function to handle root change
function handleRootChange(root: number) {
  // Implement your logic here
  console.log('Handling new root:', root);
}

subscribeToRootChanges().catch((err) => {
  console.error('Error subscribing to root changes:', err);
});
