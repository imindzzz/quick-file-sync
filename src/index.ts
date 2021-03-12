import * as Path from "path";
import { buildTree } from "./FileTree";
import { diffTree } from "./Diff";

const testPathRoot = Path.join("D:", "Doc", "quick-file-sync-test");

const run = async () => {
  const tree1 = await buildTree(Path.join(testPathRoot, "local"));
  // console.log(JSON.stringify(tree1, null, 2));

  const tree2 = await buildTree(Path.join(testPathRoot, "server"));
  // console.log(JSON.stringify(tree2, null, 2));

  const diff = diffTree(tree1, tree2);
  console.log(diff);
};
run();
