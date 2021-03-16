import * as fs from "fs";
import * as Path from "path";
import { buildFileDir, buildTree, rmDir } from "./FileTree";
import { diffTree } from "./Diff";

const testPathRoot = Path.join(process.cwd(), ".test");
rmDir(testPathRoot);
fs.mkdirSync(testPathRoot);

buildFileDir(
  {
    type: "dir",
    name: "local",
    content: "",
    children: [
      { type: "file", name: "1.txt", content: "111", children: [] },
      { type: "file", name: "2.txt", content: "222", children: [] },
    ],
  },
  testPathRoot
);
buildFileDir(
  {
    type: "dir",
    name: "server",
    content: "",
    children: [
      { type: "file", name: "1.txt", content: "111", children: [] },
      { type: "file", name: "3.txt", content: "333", children: [] },
    ],
  },
  testPathRoot
);
rmDir(testPathRoot);

// const run = async () => {
//   const tree1 = await buildTree(Path.join(testPathRoot, "local"));
//   // console.log(JSON.stringify(tree1, null, 2));

//   const tree2 = await buildTree(Path.join(testPathRoot, "server"));
//   // console.log(JSON.stringify(tree2, null, 2));

//   const diff = diffTree(tree1, tree2);
//   console.log(diff);
// };
// run();
