import { Connection } from '@solana/web3.js';

(async () => {
  // Connect to the Solana mainnet-beta cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Fetch a recent blockhash
    const { blockhash } = await connection.getRecentBlockhash();

    // Fetch the fee calculator for the blockhash
    const feeCalculatorResponse = await connection.getFeeCalculatorForBlockhash(blockhash);

    if (feeCalculatorResponse.value) {
      console.log('Fee Calculator:', feeCalculatorResponse.value);
    } else {
      console.log('Fee Calculator not found for blockhash:', blockhash);
    }
  } catch (error) {
    console.error('Error fetching fee calculator:', error);
  }
})();
