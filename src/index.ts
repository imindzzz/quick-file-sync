import { buildTree } from "./FileTree";

buildTree(process.cwd()).then((tree) => {
  console.log(JSON.stringify(tree, null, 2));
});
