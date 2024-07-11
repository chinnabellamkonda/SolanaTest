import {
  Connection,
  PublicKey,
  AccountInfo,
  ParsedAccountData,
  ParsedAccount,
} from '@solana/web3.js';

async function getParsedProgramAccounts() {
  // Connect to the Solana cluster
  const connection = new Connection('http://127.0.0.1:8899', 'confirmed');

  // Replace with the program ID you want to query
  const programId = new PublicKey('11111111111111111111111111111111');

  // Fetch program accounts with parsed data
  const programAccounts = await connection.getParsedProgramAccounts(programId, {
    filters: [
      // You can add additional filters here if needed
    ],
  });

  // Display the accounts
  programAccounts.forEach(({ pubkey, account: { data, executable, lamports } }: ParsedAccount<AccountInfo<ParsedAccountData>>) => {
    console.log('Public Key:', pubkey.toBase58());
    console.log('Data:', data);
    console.log('Is Executable:', executable);
    console.log('Lamports:', lamports);
    console.log('---------------------------------------');
  });
}

getParsedProgramAccounts().catch((err) => {
  console.error('Error fetching program accounts:', err);
});
