import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the genesis hash
    const genesisHash = await connection.getGenesisHash();

    console.log('Genesis Hash:', genesisHash);
  } catch (error) {
    console.error('Error fetching genesis hash:', error);
  }
})();
