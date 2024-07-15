import { Connection, PublicKey, AccountInfo } from '@solana/web3.js';

async function subscribeToAccountChanges(accountAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the account address to a PublicKey
    const publicKey = new PublicKey(accountAddress);

    // Subscribe to changes in the specified account
    const subscriptionId = connection.onAccountChange(publicKey, (accountInfo: AccountInfo<Buffer>, context) => {
      console.log(`Received account update for ${publicKey.toBase58()}:`, accountInfo, context);

      // Perform actions based on account updates
      processAccountData(accountInfo);
    });

    console.log(`Subscribed to account changes for ${publicKey.toBase58()}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from account changes when done (add this to a cleanup function as needed)
    // connection.removeAccountChangeListener(subscriptionId);
    // console.log('Unsubscribed from account changes.');
  } catch (error) {
    console.error('Error subscribing to account changes:', error);
  }
}

// Example function to process account data
function processAccountData(accountInfo: AccountInfo<Buffer>) {
  // Process the account data as needed
  const data = accountInfo.data;
  console.log('Account data:', data.toString('hex'));
}

const accountAddress = '9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g';

subscribeToAccountChanges(accountAddress).catch((err) => {
  console.error('Error subscribing to account changes:', err);
});
