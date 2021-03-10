import * as fs from "fs";
import * as crypto from "crypto";

export const getFileHash = (path: string) => {
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
