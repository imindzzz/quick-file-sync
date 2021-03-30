import * as path from "path";
import { buildTree } from "./FileTree";

(async () => {
  console.time("buildTree");
  console.log("buildTree start");
  await buildTree(path.join(process.cwd(), "node_modules"));
  console.log("buildTree end");
  console.timeEnd("buildTree");
})();
