import { Connection, PublicKey } from '@solana/web3.js';

async function subscribeToLogs(programId: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the program ID to a PublicKey
    const programPublicKey = new PublicKey(programId);

    // Subscribe to logs for the specified program
    const subscriptionId = connection.onLogs(programPublicKey, (log) => {
      console.log(`Received log for program ${programPublicKey.toBase58()}:`, log);

      // Perform actions based on log data
      processLogData(log);
    }, 'confirmed');

    console.log(`Subscribed to logs for program ${programPublicKey.toBase58()}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from logs when done (add this to a cleanup function as needed)
    // connection.removeOnLogsListener(subscriptionId);
    // console.log('Unsubscribed from logs.');
  } catch (error) {
    console.error('Error subscribing to logs:', error);
  }
}

// Example function to process log data
function processLogData(log: any) {
  // Process the log data as needed
  console.log('Log data:', log);
}

// Replace 'YOUR_PROGRAM_ID_HERE' with the actual Solana program ID
const programId = '9B5XszUGdMaxCZ7uSQhPzdks5ZQSmWxrmzCSvtJ6Ns6g';

subscribeToLogs(programId).catch((err) => {
  console.error('Error subscribing to logs:', err);
});
