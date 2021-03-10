import * as fs from "fs";
import * as Path from "path";
import { getDirHash, getFileHash } from "./Hash";

const ignoreList: string[] = [".git", "node_modules", ".vscode", ".idea"];

interface FileDirHashTree {
  path: string;
  hash: string;
  children: FileDirHashTree[];
}

const dfs = async (path: string) => {
  if (!fs.lstatSync(path).isDirectory()) {
    const tree: FileDirHashTree = {
      path,
      hash: await getFileHash(path),
      children: [],
    };
    return tree;
  }

  const children: FileDirHashTree[] = [];

  const list = fs.readdirSync(path);
  for (const childDir of list) {
    if (ignoreList.indexOf(childDir) != -1) {
      continue;
    }
    children.push(await dfs(Path.join(path, childDir)));
  }
  return {
    path,
    hash: await getDirHash(children.map((x) => x.hash)),
    children,
  };
};

export const buildTree = async (path: string) => {
  return await dfs(path);
};
