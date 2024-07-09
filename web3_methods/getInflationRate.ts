import { Connection } from '@solana/web3.js';

// Function to calculate inflation rate from inflation governor parameters
function calculateInflationRate(inflationGovernor: any): number {
  // Extract necessary parameters from inflation governor
  const { initial: initialRate, terminal: terminalRate, taper: taperRate } = inflationGovernor;

  // Assume time elapsed since genesis for example purposes
  const yearsElapsed = 2; // Example: 2 years

  // Calculate current inflation rate (linear tapering approximation)
  const currentRate = initialRate - (initialRate - terminalRate) * (yearsElapsed / taperRate);

  return currentRate;
}

(async () => {
  // Connect to the Solana local cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch the inflation governor parameters
    const inflationGovernor = await connection.getInflationGovernor();

    // Calculate the current inflation rate
    const inflationRate = calculateInflationRate(inflationGovernor);

    console.log('Current Inflation Rate:', inflationRate);
  } catch (error) {
    console.error('Error fetching or calculating inflation rate:', error);
  }
})();
