import { Connection, PublicKey } from '@solana/web3.js';

async function getTokenSupply(mintAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the mint address to a PublicKey
    const mintPublicKey = new PublicKey(mintAddress);

    // Get the token supply for the specified mint address
    const tokenSupply = await connection.getTokenSupply(mintPublicKey);

    // Display the token supply
    console.log('Token Supply:', tokenSupply.value.uiAmountString);
  } catch (error) {
    console.error('Error fetching token supply:', error);
  }
}

// Replace 'YOUR_MINT_ADDRESS_HERE' with the actual mint address you want to query
const mintAddress = '8686VsjTBhDGJ45y8g9RrZjJLiWUUNLLUV8AwAManq95';

getTokenSupply(mintAddress).catch((err) => {
  console.error('Error fetching token supply:', err);
});
