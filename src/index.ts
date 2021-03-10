import * as Path from "path";
import { buildTree } from "./FileTree";

const testPathRoot = Path.join("D:", "Doc", "quick-file-sync-test");

buildTree(Path.join(testPathRoot, "local")).then((tree) => {
  console.log(JSON.stringify(tree, null, 2));
});

buildTree(Path.join(testPathRoot, "server")).then((tree) => {
  console.log(JSON.stringify(tree, null, 2));
});
