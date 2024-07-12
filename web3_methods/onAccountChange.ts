import { Connection, PublicKey } from '@solana/web3.js';

async function subscribeToAccountChanges(accountAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the account address to a PublicKey
    const publicKey = new PublicKey(accountAddress);

    // Subscribe to changes in the specified account
    const subscriptionId = connection.onAccountChange(publicKey, (accountInfo, context) => {
      console.log(`Received account update for ${publicKey.toBase58()}:`, accountInfo, context);
    });

    console.log(`Subscribed to account changes for ${publicKey.toBase58()}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.read();

    // Unsubscribe from account changes when done
    connection.removeAccountChangeListener(subscriptionId);
    console.log('Unsubscribed from account changes.');

  } catch (error) {
    console.error('Error subscribing to account changes:', error);
  }
}

// Replace 'YOUR_ACCOUNT_ADDRESS_HERE' with the actual Solana account address to monitor
const accountAddress = '9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g';

subscribeToAccountChanges(accountAddress).catch((err) => {
  console.error('Error subscribing to account changes:', err);
});
