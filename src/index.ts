import { initializeKeypair } from "./initializeKeypair"
import { 
  createNewMint, 
  createTokenAccount, 
  mintTokens, 
  approveDelegate,
  transferTokens,
  revokeDelegate,
  burnTokens
} from "./tokenProgram"
import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"


async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"), {
    commitment: "confirmed"
  })
  const user = await initializeKeypair(connection)

  // Create mint account
  const mint = await createNewMint(
    connection, user, user.publicKey, user.publicKey, 2
  )

  // Create token account
  const tokenAccount = await createTokenAccount(
    connection, user, mint, user.publicKey
  )

  const mintInfo = await token.getMint(connection, mint)

  // Mint tokens
  await mintTokens(
    connection, user, mint, tokenAccount.address, user, 100 * 10 ** mintInfo.decimals
  )
  
  // Create and add delegate to token account
  const delegate = web3.Keypair.generate()
  await approveDelegate(
    connection, user, tokenAccount.address , delegate.publicKey, user.publicKey, 50 * 10 ** mintInfo.decimals
  )

  // Create transfer receiver and its token account
  const receiver = web3.Keypair.generate()
  const receiverTokenAccount = await createTokenAccount(
    connection, user, mint, receiver.publicKey
  )

  // Transfer tokens from delgate behalf to reveiver tokenAccount
  await transferTokens(
    connection, user, tokenAccount.address, receiverTokenAccount.address, delegate, 50 * 10 ** mintInfo.decimals
  )
  
  // Revoke delegate (no delegate info, becasue tokenAccount can only have one delegate)
  await revokeDelegate(
    connection, user, tokenAccount.address, user.publicKey
  )

  // Burn tokens
  await burnTokens(
    connection, user, tokenAccount.address, mint, user, 25 * 10 ** mintInfo.decimals
  )

  console.log(mint)
  console.log(mintInfo)
  console.log(tokenAccount)
}

main()
  .then(() => {
    console.log("Finished successfully")
    process.exit(0)
  })
  .catch((error) => {
    console.log(error)
    process.exit(1)
  })
