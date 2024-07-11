import {
  Connection,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
  ParsedAccount,
} from '@solana/web3.js';

async function getProgramAccounts(programId: PublicKey) {
  // Connect to the Solana cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Fetch program accounts
  const programAccounts = await connection.getProgramAccounts(programId);

  // Display the accounts
  programAccounts.forEach(({ pubkey, account: { data, executable, lamports } }: AccountInfo<ParsedAccountData>) => {
    console.log('Public Key:', pubkey.toBase58());
    console.log('Data:', data);
    console.log('Is Executable:', executable);
    console.log('Lamports:', lamports);
    console.log('---------------------------------------');
  });
}

// Replace 'YOUR_PROGRAM_ID_HERE' with the actual program ID you want to query
const programId = new PublicKey('11111111111111111111111111111111');

getProgramAccounts(programId).catch((err) => {
  console.error('Error fetching program accounts:', err);
});
