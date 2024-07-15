import { Connection } from '@solana/web3.js';

async function getSignatureStatus(transactionSignature: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Get the status of the transaction signature
    const status = await connection.getSignatureStatus(transactionSignature);

    // Display the status
    console.log('Signature Status:', status);

  } catch (error) {
    console.error('Error fetching signature status:', error);
  }
}

// Replace 'YOUR_TRANSACTION_SIGNATURE_HERE' with the actual transaction signature you want to query
const transactionSignature = '26ShXf2AeqsptTbzp7iuZeKv85qnBdaZpgbgyaRDvvnevfWwyrR97u548tkr5iGsTJHiy3PS9yATwkaVtWoCv6gC';

getSignatureStatus(transactionSignature).catch((err) => {
  console.error('Error fetching signature status:', err);
});
