import * as fs from "fs";

const f = fs.readdirSync(process.cwd());
console.log(f);
