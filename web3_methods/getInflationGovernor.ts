import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the inflation governor parameters
    const inflationGovernor = await connection.getInflationGovernor();

    console.log('Inflation Governor Parameters:', inflationGovernor);
  } catch (error) {
    console.error('Error fetching inflation governor parameters:', error);
  }
})();
