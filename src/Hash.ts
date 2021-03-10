import * as Path from "path";
import * as fs from "fs";
import * as crypto from "crypto";

export const getFileHash = (path: string) => {
  // Get-FileHash .gitignore

  // Algorithm       Hash                                                                   Path
  // ---------       ----                                                                   ----
  // SHA256          F1A9A09B226CF8E98A4286200C5D9EBD5C28924707AC3317947F8ECF06AB167B       D:\Doc\quick-file-sync\.gitignore

  return new Promise<string>((resolve) => {
    const stream = fs.createReadStream(path);
    const fsHash = crypto.createHash("sha256");

    fsHash.update(Path.parse(path).base); // 加上文件名，排除复制的文件

    stream.on("data", function (d) {
      fsHash.update(d);
    });

    stream.on("end", function () {
      const md5 = fsHash.digest("hex");
      resolve(md5);
    });
  });
};

export const getDirHash = (childHashs: string[]) => {
  return new Promise<string>((resolve) => {
    const fsHash = crypto.createHash("sha256");

    childHashs.forEach((childHash) => {
      fsHash.update(childHash);
    });

    const md5 = fsHash.digest("hex");
    resolve(md5);
  });
};
