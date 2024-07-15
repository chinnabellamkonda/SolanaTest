import { Connection, PublicKey } from '@solana/web3.js';

async function subscribeToSignature(signature: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Subscribe to status changes for the specified transaction signature
    const subscriptionId = connection.onSignature(signature, (result, context) => {
      console.log(`Received status change for signature ${signature}:`, result);

      // Perform actions based on the status change
      handleSignatureStatusChange(result, context);
    }, 'confirmed');

    console.log(`Subscribed to status changes for signature ${signature}. Press Ctrl+C to exit.`);

    // Keep the script running to continue receiving updates
    process.stdin.resume();

    // Unsubscribe from status changes when done (add this to a cleanup function as needed)
    // connection.removeSignatureListener(subscriptionId);
    // console.log('Unsubscribed from status changes.');
  } catch (error) {
    console.error('Error subscribing to status changes:', error);
  }
}

// Example function to handle signature status change
function handleSignatureStatusChange(result: any, context: any) {const connection = new Connection('https://api.devnet.solana.com', 'confirmed');
  // Request an airdrop of 1 SOL (1 SOL = 1_000_000_000 lamports)
  const airdropSignature = 'LFDyi4MtWHBewXKZCEd4bDwBEKNFHCRiYYzisLguckadXrRJb3sbfsNi5EDSWnTvAz49oRxULCkAMtpukbMy5GC'

  // Confirm the transaction
  await connection.confirmTransaction(airdropSignature, 'confirmed');
  console.log('Status change result:', result);
  console.log('Context:', context);
}

// Replace 'YOUR_SIGNATURE_HERE' with the actual transaction signature you want to monitor
const signature = 'LFDyi4MtWHBewXKZCEd4bDwBEKNFHCRiYYzisLguckadXrRJb3sbfsNi5EDSWnTvAz49oRxULCkAMtpukbMy5GC';

subscribeToSignature(signature).catch((err) => {
  console.error('Error subscribing to status changes:', err);
});
