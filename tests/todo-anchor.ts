import * as anchor from "@project-serum/anchor";
import { utf8 } from "@project-serum/anchor/dist/cjs/utils/bytes";

import {
  Keypair,
} from '@solana/web3.js';

import { Program } from "@project-serum/anchor";
import { TodoAnchor } from "../target/types/todo_anchor";

describe("todo-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());
 
  const program = anchor.workspace.TodoAnchor as Program<TodoAnchor>;
  
  let secretKey = new Uint8Array([186,156,43,50,125,172,233,34,11,236,250,253,34,27,74,253,92,205,215,153,209,124,179,142,217,23,225,171,165,202,90,130,21,249,30,42,81,163,56,63,5,234,10,3,81,17,229,35,98,101,153,103,86,154,204,7,215,254,92,26,156,209,155,32]);
  let defaultAccount = Keypair.fromSecretKey(secretKey);

  it("Initalising profile!", async () => {
      
    const [userProfilePDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('USER_STATE'),
      defaultAccount.publicKey.toBuffer()
    ], program.programId)

  
    // const tx = await program.methods.initializeUser().accounts({
    //   authority: defaultAccount.publicKey,
    //   userProfile: userProfilePDA,
    //   systemProgram: anchor.web3.SystemProgram.programId,
    // })
    // .signers([defaultAccount])
    // .rpc();
    // console.log("Your transaction signature", tx);
  
    
  });

  it("Add todo!", async () => {    
    const [userProfilePDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('USER_STATE'),
      defaultAccount.publicKey.toBuffer()
    ], program.programId)

    const userProfileData = await program.account.userProfile.fetch(userProfilePDA);

    console.log(userProfileData)

    const [todoAccountPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('TODO_STATE'),
      defaultAccount.publicKey.toBuffer(),
      Buffer.from([0])
    ], program.programId)
    console.log("todoAccountPDA", todoAccountPDA.toBase58());
    // const tx = await program.methods.addTodo("new todo").accounts({
    //   userProfile: userProfilePDA,
    //   todoAccount: todoAccountPDA,
    //   authority: defaultAccount.publicKey,
    //   systemProgram: anchor.web3.SystemProgram.programId,
    // })
    // .signers([defaultAccount])
    // .rpc();
    // console.log("Your transaction signature", tx);
  });

  it("Mark todo!", async () => {    
    const [userProfilePDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('USER_STATE'),
      defaultAccount.publicKey.toBuffer()
    ], program.programId)

    const [todoAccountPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('TODO_STATE'),
      defaultAccount.publicKey.toBuffer(),
      Buffer.from([0])
    ], program.programId)
    console.log("todoAccountPDA", todoAccountPDA.toBase58());

    // const tx = await program.methods.markTodo(0).accounts({
    //   todoAccount: todoAccountPDA,
    //   authority: defaultAccount.publicKey,
    //   userProfile: userProfilePDA,
    //   systemProgram: anchor.web3.SystemProgram.programId,
    // }).signers([defaultAccount])
    // .rpc();
    // console.log("Your transaction signature", tx);
  });

  it("Remove todo item!", async () => {    
    const [userProfilePDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('USER_STATE'),
      defaultAccount.publicKey.toBuffer()
    ], program.programId)

    const [todoAccountPDA] = await anchor.web3.PublicKey.findProgramAddress([
      utf8.encode('TODO_STATE'),
      defaultAccount.publicKey.toBuffer(),
      Buffer.from([0])
    ], program.programId)
    console.log("todoAccountPDA", todoAccountPDA.toBase58());

    const tx = await program.methods.removeTodo(0).accounts({
      todoAccount: todoAccountPDA,
      authority: defaultAccount.publicKey,
      userProfile: userProfilePDA,
      systemProgram: anchor.web3.SystemProgram.programId,
    }).signers([defaultAccount])
    .rpc();
    console.log("Your transaction signature", tx);
  });
});
