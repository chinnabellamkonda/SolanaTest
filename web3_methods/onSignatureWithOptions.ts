import { Connection, clusterApiUrl } from '@solana/web3.js';

async function subscribeToSignatureWithOptions(signature: string) {
  // Connect to the Solana cluster
  const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');

  try {
    // Subscribe to status changes for the specified transaction signature with options
    const subscriptionId = connection.onSignatureWithOptions(
      signature,
      {
        commitment: 'confirmed', // Specify the commitment level
        encoding: 'jsonParsed', // Specify the encoding format for transaction details
      },
      (result, context) => {
        console.log(`Received status change for signature ${signature}:`, result);

        // Perform actions based on the status change
        handleSignatureStatusChange(result, context, connection, signature);
      }
    );

    console.log(`Subscribed to status changes for signature ${signature}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from status changes when done (add this to a cleanup function as needed)
    // connection.removeSignatureListener(subscriptionId);
    console.log('Unsubscribed from status changes.');
  } catch (error) {
    console.error('Error subscribing to status changes:', error);
  }
}

async function handleSignatureStatusChange(result: any, context: any, connection: connection, signature: string) {
  console.log('Status change result:', result);
  console.log('Context:', context);

  if (result.err) {
    console.error('Transaction failed:', result.err);
  } else {
    console.log('Transaction confirmed in slot:', context.slot);
     // Request an airdrop of 1 SOL (1 SOL = 1_000_000_000 lamports)

    // Confirm the transaction
    await connection.confirmTransaction(signature, 'confirmed');
  }
}

// Replace 'YOUR_SIGNATURE_HERE' with the actual transaction signature you want to monitor
const signature = '579PtHuVoTMkea6aAB4hkensghumPMKLrYs9t1fEnods1qd9m72qnBmoeEMCQSGSzayY1hJcCRrWTNDvgbi6YUGA';

subscribeToSignatureWithOptions(signature).catch((err) => {
  console.error('Error subscribing to status changes:', err);
});
