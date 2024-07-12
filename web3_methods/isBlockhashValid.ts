import { Connection, PublicKey } from '@solana/web3.js';

async function checkBlockhashValidity(blockhash: string) {
  // Connect to the Solana cluster (replace with the desired network URL)
  const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

  try {
    // Check if the provided blockhash exists in the recent blockhashes

    const isBlockhashValid = await connection.isBlockhashValid(blockhash);

    console.log(`Blockhash ${blockhash} is valid: ${isBlockhashValid.value}`);
  } catch (error) {
    console.error('Error checking blockhash validity:', error);
  }
}

// Replace 'YOUR_BLOCKHASH_HERE' with the actual blockhash you want to check
const blockhash = '8i67Hxx7MD38p1gwwvGx5uK2YaRYjx8EYuFEqKrtiqo1';

checkBlockhashValidity(blockhash).catch((err) => {
  console.error('Error checking blockhash validity:', err);
});
