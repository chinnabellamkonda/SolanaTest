import { Connection, PublicKey } from '@solana/web3.js';
import { getMint, TOKEN_PROGRAM_ID } from '@solana/spl-token';

async function getTokenLargestAccounts(mintAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the mint address to a PublicKey
    const mintPublicKey = new PublicKey(mintAddress);

    // Get the largest accounts for the specified token mint
    const largestAccounts = await connection.getTokenLargestAccounts(mintPublicKey);

    // Iterate through largest accounts and fetch details
    for (const account of largestAccounts.value) {
      console.log('Token Account:', account)
      console.log('Token Account Address:', account.address.toBase58());
      console.log('Amount:', account.uiAmountString);
    }
  } catch (error) {
    console.error('Error fetching largest token accounts:', error);
  }
}

// Replace 'YOUR_MINT_ADDRESS_HERE' with the actual mint address you want to query
const mintAddress = '8686VsjTBhDGJ45y8g9RrZjJLiWUUNLLUV8AwAManq95';

getTokenLargestAccounts(mintAddress).catch((err) => {
  console.error('Error fetching largest token accounts:', err);
});
