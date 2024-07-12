import { Connection } from '@solana/web3.js';

async function getSupply() {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  try {
    // Get the total supply of SOL
    const totalCurrentSupply = await connection.getSupply();

    // Display the total supply information
    console.log('Total Supply:', totalCurrentSupply);

    const supplyWithoutNonCirculatingAccList = await connection.getSupply({excludeNonCirculatingAccountsList: true});

     // Display the total supply information without non circulating account list
    console.log('Total Supply without non circulating account list:', supplyWithoutNonCirculatingAccList);

  } catch (error) {
    console.error('Error fetching total supply:', error);
  }
}

getSupply().catch((err) => {
  console.error('Error fetching total supply:', err);
});
