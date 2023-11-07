import { initializeKeypair } from "./initializeKeypair"
import { createNewMint, createTokenAccount, mintTokens, approveDelegate } from "./tokenProgram"
import * as web3 from "@solana/web3.js"
import * as token from "@solana/spl-token"


async function main() {
  const connection = new web3.Connection(web3.clusterApiUrl("devnet"))
  const user = await initializeKeypair(connection)

  const mint = await createNewMint(
    connection, user, user.publicKey, user.publicKey, 2
  )

  const mintInfo = await token.getMint(connection, mint)

  const tokenAccount = await createTokenAccount(
    connection, user, mint, user.publicKey
  )

  await mintTokens(
    connection, user, mint, tokenAccount.address, user, 100 * 10 ** mintInfo.decimals
  )
  
  const delegate = web3.Keypair.generate()

  await approveDelegate(
    connection, user, tokenAccount.address , delegate.publicKey, user.publicKey, 50 * 10 ** mintInfo.decimals
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
