import * as fs from "fs";
import * as Path from "path";
import * as crypto from "crypto";

const ignoreList: string[] = [".git", "node_modules", ".vscode", ".idea"];

interface FileDirHashTree {
  path: string;
  hash: string;
  children: FileDirHashTree[];
}

const getFileHash = (path: string) => {
  // Get-FileHash yarn.lock
  // SHA256          F6A72625CDC0E891FABC0DC71066797DAE7F154927C4072CBDB2B99D33797B2F       D:\Doc\quick-file-sync\yarn.lock
  return new Promise<string>((resolve) => {
    const stream = fs.createReadStream(path);
    const fsHash = crypto.createHash("sha256");

    stream.on("data", function (d) {
      fsHash.update(d);
    });

    stream.on("end", function () {
      const md5 = fsHash.digest("hex");
      resolve(md5);
    });
  });
};
const getDirHash = (childHashs: string[]) => {
  return new Promise<string>((resolve) => {
    const fsHash = crypto.createHash("sha256");
    childHashs.forEach((childHash) => {
      fsHash.update(childHash);
    });

    const md5 = fsHash.digest("hex");
    resolve(md5);
  });
};
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

dfs(process.cwd()).then((tree) => {
  console.log(JSON.stringify(tree, null, 2));
});
