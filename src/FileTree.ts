import * as fs from "fs";
import * as Path from "path";
import { getDirHash, getFileHash } from "./Hash";

const ignoreList: string[] = [".git", "node_modules", ".vscode", ".idea"];

export interface FileDirHashTree {
  type: "dir" | "file";
  path: string;
  hash: string;
  children: FileDirHashTree[];
}
/**
 *
 * @param path
 * @param oPath  用于确定相对路径
 * @returns
 */
const dfs = async (path: string, oPath: string) => {
  if (!fs.lstatSync(path).isDirectory()) {
    const tree: FileDirHashTree = {
      type: "file",
      path: path.replace(oPath, ""),
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
    children.push(await dfs(Path.join(path, childDir), oPath));
  }
  const tree: FileDirHashTree = {
    type: "dir",
    path: path.replace(oPath, ""),
    hash: await getDirHash(children.map((x) => x.hash)),
    children,
  };
  return tree;
};

export const buildTree = async (path: string) => {
  if (!fs.existsSync(path)) {
    return;
  }
  return await dfs(path, path);
};
