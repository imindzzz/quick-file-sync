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

/**
 * 扫描目录生成，生成数据结构
 * @param path
 * @returns
 */
export const buildTree = async (path: string) => {
  if (!fs.existsSync(path)) {
    return;
  }
  return await dfs(path, path);
};

export interface FileDirBuildTree {
  type: "dir" | "file";
  name: string;
  content: string;
  children: FileDirBuildTree[];
}
/**
 * 根据数据结构生成真实的文件夹
 * @param path
 * @returns
 */
export const buildFileDir = async (
  tree: FileDirBuildTree,
  parentPath?: string
) => {
  if (!tree) {
    return;
  }
  const realPath = Path.join(parentPath || "", tree.name);
  if (tree.type === "dir") {
    fs.mkdirSync(realPath);
    tree.children.forEach((child) => {
      buildFileDir(child, realPath);
    });
  }

  if (tree.type === "file") {
    fs.writeFileSync(realPath, tree.content);
  }
};

export const rmDir = (path: string) => {
  if (fs.existsSync(path)) {
    const stat = fs.statSync(path);
    if (stat.isDirectory()) {
      const dirs = fs.readdirSync(path);
      if (dirs.length === 0) {
        fs.rmdirSync(path);
      } else {
        dirs.forEach((dir) => {
          rmDir(Path.join(path, dir));
        });
        fs.rmdirSync(path);
      }
    } else {
      fs.rmSync(path);
    }
  }
};
