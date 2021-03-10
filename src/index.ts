import * as fs from "fs";
import * as Path from "path";

const ignoreList: string[] = [".git", "node_modules", ".vscode", ".idea"];
interface FileDirHashTree {
  hash: string;
  children: FileDirHashTree[];
}

const deep = (path: string) => {
  if (!fs.lstatSync(path).isDirectory()) {
    return {
      path,
      hash: "",
      children: [],
    };
  }

  const children: FileDirHashTree[] = [];

  const list = fs.readdirSync(path);
  for (const childDir of list) {
    if (ignoreList.indexOf(childDir) != -1) {
      continue;
    }
    children.push(deep(Path.join(path, childDir)));
  }
  return {
    path,
    hash: "",
    children,
  };
};

const tree = deep(process.cwd());
console.log(JSON.stringify(tree, null, 2));
