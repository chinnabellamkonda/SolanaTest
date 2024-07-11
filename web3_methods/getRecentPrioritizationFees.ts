import { Connection } from '@solana/web3.js';

async function getRecentPrioritizationFees() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Get the recent blockhash
    const blockhash = await connection.getRecentBlockhash();

    // Get the fee calculator for the latest blockhash
    const feeCalculator = await connection.getFeeCalculatorForBlockhash(blockhash.blockhash);

    const feeCalculatorOne = await connection.getRecentPrioritizationFees();

    // Display the prioritization fees
    console.log('Recent Prioritization Fees:', feeCalculator);
    console.log('Prioritization Fees directly:', feeCalculatorOne);

  } catch (error) {
    console.error('Error fetching recent prioritization fees:', error);
  }
}

getRecentPrioritizationFees().catch((err) => {
  console.error('Error fetching recent prioritization fees:', err);
});
