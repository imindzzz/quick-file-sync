import * as OSS from "ali-oss";

let client = new OSS({
  region: "oss-cn-beijing",
  accessKeyId: "LTAI5tPESUoga9rBa4q2AMEB",
  accessKeySecret: "zGKFbyVQay0dPMAchbGdWvMLsvpj4g",
  // bucket: "kq-static",
});

async function getBucketInfo() {
  const result = await client.getBucketInfo("kq-static");
  // 获取存储空间所在的地域。
  console.log(result.bucket.Location);
  // 获取存储空间的名称。
  console.log(result.bucket.Name);
  // 获取存储空间的拥有者ID。
  console.log(result.bucket.Owner.ID);
  // 获取存储空间的拥有者名称，目前和拥有者ID一致。
  console.log(result.bucket.Owner.DisplayName);
  // 获取存储空间的创建时间。
  console.log(result.bucket.CreationDate);
  // 获取存储空间的存储类型。
  console.log(result.bucket.StorageClass);
  // 获取存储空间的版本控制状态。
  console.log(result.bucket.Versioning);
}

getBucketInfo();
