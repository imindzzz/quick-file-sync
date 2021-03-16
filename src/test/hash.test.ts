import { getFileHash } from "../Hash";
import * as Path from "path";

test("hash", async () => {
  expect(await getFileHash(Path.join(process.cwd(), ".gitignore"))).toBe(
    "a5867e1ec980202487745fac1d36c29683993cbdea6856c91afe02d774b9c600"
  );
});
