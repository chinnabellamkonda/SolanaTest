import { Connection } from '@solana/web3.js';

async function getNodeVersion() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.mainnet-beta.solana.com', 'confirmed');

  try {
    // Fetch Solana node version
    const version = await connection.getVersion();
    console.log('Solana Node Version:', version);
  } catch (error) {
    console.error('Error fetching Solana node version:', error);
  }
}

getNodeVersion().catch((err) => {
  console.error('Error fetching Solana node version:', err);
});
