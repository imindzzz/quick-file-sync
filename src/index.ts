import axios from "axios";
import * as fs from "fs";
import * as path from "path";

axios({
  method: "get",
  url: "https://www.linkunbin.com/api/v1/brands",
  headers: {
    Host: "www.linkunbin.com",
    Connection: "keep-alive",
    "User-Agent":
      "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
    "content-type": "application/JSON",
    Referer: "https://servicewechat.com/wx29406b8d06443658/49/page-frame.html",
    "Accept-Encoding": "gzip, deflate, br",
  },
})
  .then(async (response) => {
    for (let i = 0; i < response.data.data.length; i++) {
      const brand = response.data.data[i];
      console.log(brand);
      const res = await getBrandPhone(brand.id, 0);
      console.log(JSON.stringify(res.length));
      fs.writeFileSync(
        path.join(`${brand.title}-${brand.id}.json`),
        JSON.stringify(res, null, 2)
      );
    }
  })
  .catch(function (error) {
    console.log(error);
  });

async function getBrandPhone(id: string, page: number): Promise<any[]> {
  console.log("getBrandPhone", id, page);
  const response = await axios({
    method: "get",
    url: `https://www.linkunbin.com/api/v1/phone?brandId=${id}&page=${page}`,
    headers: {
      Host: "www.linkunbin.com",
      Connection: "keep-alive",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJvcGVuaWQiOiJveHF2OTQ0Z3AzWFN6VjFDdWpYNEdGU3ZjaVhnIiwiaWF0IjoxNjIyNzY0NzE1LCJleHAiOjE2MjM2Mjg3MTV9.LaLQ3FuvqbfGG6YwcPy5ruf9Sml_Zcn3BF2mbag9mnU",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 MicroMessenger/7.0.9.501 NetType/WIFI MiniProgramEnv/Windows WindowsWechat",
      "content-type": "application/json",
      Referer:
        "https://servicewechat.com/wx29406b8d06443658/49/page-frame.html",
      "Accept-Encoding": "gzip, deflate, br",
    },
  });

  if (response.data.data.length >= 21) {
    const next = await getBrandPhone(id, page + 1);
    response.data.data = response.data.data.concat(next);
  }

  return response.data.data;
}
