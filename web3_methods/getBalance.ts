import { Connection, LAMPORTS_PER_SOL, PublicKey } from "@solana/web3.js";

const pubKey = new PublicKey("VuhCxzii1aMz5PvnLBCsZt9p4xhuaEpLHDa8ZbPJkP6");

const connection = new Connection("https://api.devnet.solana.com", "confirmed");

const balInLamports = await connection.getBalance(pubKey);

const balInSOL = balInLamports / LAMPORTS_PER_SOL;

console.log(
  `💰 Finished! The balance for the wallet at address ${pubKey} is ${balInSOL}!`
);

const suppliedPublicKey = process.argv[2];
if (!suppliedPublicKey) {
  throw new Error("Provide a public key to check the balance of!");
}

const publicKey = new PublicKey(suppliedPublicKey);

const balanceInLamports = await connection.getBalance(publicKey);

const balanceInSOL = balanceInLamports / LAMPORTS_PER_SOL;

console.log(
  `✅ Finished! The balance for the wallet at address ${publicKey} is ${balanceInSOL}!`
);