import { Connection, PublicKey } from '@solana/web3.js';

async function subscribeToProgramAccountChanges(programId: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  try {
    // Convert the program ID to a PublicKey
    const programPublicKey = new PublicKey(programId);

    // Subscribe to changes for all accounts owned by the specified program
    const subscriptionId = connection.onProgramAccountChange(programPublicKey, (keyedAccountInfo) => {
      console.log(`Received update for account ${keyedAccountInfo.accountId.toBase58()}:`, keyedAccountInfo.accountInfo);

      // Perform actions based on account updates
      processAccountData(keyedAccountInfo);
    }, 'confirmed');

    console.log(`Subscribed to program account changes for program ${programPublicKey.toBase58()}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from account changes when done (add this to a cleanup function as needed)
    // connection.removeProgramAccountChangeListener(subscriptionId);
    // console.log('Unsubscribed from program account changes.');
  } catch (error) {
    console.error('Error subscribing to program account changes:', error);
  }
}

// Example function to process account data
function processAccountData(keyedAccountInfo: {accountId: PublicKey, accountInfo: any}) {
  // Process the account data as needed
  const data = keyedAccountInfo.accountInfo.data;
  console.log('Account data:', data.toString('hex'));
}

// Replace 'YOUR_PROGRAM_ID_HERE' with the actual Solana program ID
const programId = '11111111111111111111111111111111';

subscribeToProgramAccountChanges(programId).catch((err) => {
  console.error('Error subscribing to program account changes:', err);
});
