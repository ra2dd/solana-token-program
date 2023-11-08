import * as web3 from '@solana/web3.js'
import * as token from '@solana/spl-token'

export async function createNewMint(
  connection: web3.Connection,
  payer: web3.Keypair,
  mintAuthority: web3.PublicKey,
  freezeAuthority: web3.PublicKey,
  decimals: number,
): Promise<web3.PublicKey> {
  
  const tokenMint = await token.createMint(
    connection,
    payer,
    mintAuthority,
    freezeAuthority,
    decimals
  );

  console.log(
    `Token Mint https://explorer.solana.com/address/${tokenMint}?cluster=devnet`
  )

  return tokenMint
}

export async function createTokenAccount(
  connection: web3.Connection,
  payer: web3.Keypair,
  mint: web3.PublicKey,
  owner: web3.PublicKey
) {
  const tokenAccount = await token.getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    owner
  )

  console.log(
    `Token Account: https://explorer.solana.com/address/${tokenAccount.address}?cluster=devnet`  
  )

  return tokenAccount
}

export async function mintTokens(
  connection: web3.Connection,
  payer: web3.Keypair,
  mint: web3.PublicKey,
  destination: web3.PublicKey,
  authority: web3.Keypair,
  amount: number
) {
  const transactionSignature = await token.mintTo(
    connection,
    payer,
    mint,
    destination,
    authority,
    amount
  )

  console.log(
    `Mint token transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
    )
}

export async function approveDelegate(
  connection: web3.Connection,
  payer: web3.Keypair,
  tokenAccount: web3.PublicKey,
  delegate: web3.PublicKey,
  owner: web3.Signer | web3.PublicKey,
  amount: number
) {
  const transactionSignature = await token.approve(
    connection,
    payer,
    tokenAccount,
    delegate,
    owner,
    amount
  )

  console.log(
    `Approve delegate transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )
}

export async function transferTokens(
  connection: web3.Connection,
  payer: web3.Keypair,
  sourceTokenAccount: web3.PublicKey,
  destinationTokenAccount: web3.PublicKey,
  owner: web3.Keypair,
  amount: number
) {
  const transactionSignature = await token.transfer(
    connection,
    payer,
    sourceTokenAccount,
    destinationTokenAccount,
    owner,
    amount
  )

  console.log(
    `Transfer transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )
}

export async function revokeDelegate(
  connection: web3.Connection,
  payer: web3.Keypair,
  tokenAccount: web3.PublicKey,
  owner: web3.Signer | web3.PublicKey,
) {
  const transactionSignature = await token.revoke(
    connection,
    payer,
    tokenAccount,
    owner
  )

  console.log(
    `Revoke Delegate transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )
}

export async function burnTokens(
  connection: web3.Connection,
  payer: web3.Keypair,
  tokenAccount: web3.PublicKey,
  mint: web3.PublicKey,
  owner: web3.Keypair,
  amount: number
) {
  const transactionSignature = await token.burn(
    connection,
    payer,
    tokenAccount,
    mint,
    owner,
    amount
  )

  console.log(
    `Burn transaction: https://explorer.solana.com/tx/${transactionSignature}?cluster=devnet`
  )
}