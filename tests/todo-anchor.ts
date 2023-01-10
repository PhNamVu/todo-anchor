import * as anchor from "@project-serum/anchor";
import { Program } from "@project-serum/anchor";
import { TodoAnchor } from "../target/types/todo_anchor";

describe("todo-anchor", () => {
  // Configure the client to use the local cluster.
  anchor.setProvider(anchor.AnchorProvider.env());

  const program = anchor.workspace.TodoAnchor as Program<TodoAnchor>;

  it("Is initialized!", async () => {
    // Add your test here.
    const tx = await program.methods.initialize().rpc();
    console.log("Your transaction signature", tx);
  });
});
