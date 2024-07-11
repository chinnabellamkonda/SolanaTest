import { Connection } from '@solana/web3.js';

async function getRecentPerformanceSamples() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Fetch recent performance samples
  const performanceSamples = await connection.getRecentPerformanceSamples();

  // Display the performance samples
  console.log('Recent Performance Samples:', performanceSamples);
}

getRecentPerformanceSamples().catch((err) => {
  console.error('Error fetching recent performance samples:', err);
});
