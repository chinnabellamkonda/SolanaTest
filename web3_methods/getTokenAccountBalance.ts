import { Connection, PublicKey } from '@solana/web3.js';
import { getAccount, TOKEN_PROGRAM_ID } from '@solana/spl-token';

async function getTokenAccountBalance(tokenAccountAddress: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Convert the token account address to a PublicKey
    const tokenAccountPublicKey = new PublicKey(tokenAccountAddress);

    // Get the token account info
    const tokenAccountInfo = await connection.getTokenAccountBalance(tokenAccountPublicKey);

    // Display the token account balance
    console.log('Token Account Balance:', tokenAccountInfo.value.amount);

  } catch (error) {
    console.error('Error fetching token account balance:', error);
  }
}

// Replace 'YOUR_TOKEN_ACCOUNT_ADDRESS_HERE' with the actual token account address you want to query
const tokenAccountAddress = 'CQBoNEWHa8pFDdwuFeNsDaRfeVnLECZWC27zreSHDRUa';

getTokenAccountBalance(tokenAccountAddress).catch((err) => {
  console.error('Error fetching token account balance:', err);
});
