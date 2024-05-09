const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function scrape(url) {
  const myHeaders = new Headers();
  myHeaders.append(
    "accept",
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7"
  );
  myHeaders.append("accept-language", "en-US,en;q=0.9");
  myHeaders.append("priority", "u=0, i");
  myHeaders.append(
    "sec-ch-ua",
    '"Chromium";v="124", "Google Chrome";v="124", "Not-A.Brand";v="99"'
  );
  myHeaders.append("sec-ch-ua-mobile", "?0");
  myHeaders.append("sec-ch-ua-platform", '"Windows"');
  myHeaders.append("sec-fetch-dest", "document");
  myHeaders.append("sec-fetch-mode", "navigate");
  myHeaders.append("sec-fetch-site", "none");
  myHeaders.append("sec-fetch-user", "?1");
  myHeaders.append("upgrade-insecure-requests", "1");
  myHeaders.append(
    "user-agent",
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
  );
  myHeaders.append(
    "Cookie",
    "sstk_anonymous_id=9deaded4-a439-46df-b4da-7df16d7acb81; stck_anonymous_id=9deaded4-a439-46df-b4da-7df16d7acb81; n_v=7423ce27cc2; ssnext=true"
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const response = await fetch(url, requestOptions);
  const result = await response.text();

  const dom = new JSDOM(result);
  const data = dom.window.document.getElementById("__NEXT_DATA__").textContent;

  const obj = {};

  const jsonData = JSON.parse(data);
  const description = jsonData.props.pageProps.asset.description;
  const keywords = jsonData.props.pageProps.asset.keywords;
  const categories = jsonData.props.pageProps.asset.categories.map(
    (category) => category.name
  );

  obj.description = description;
  obj.categories = categories;
  obj.keywords = keywords;

  return obj;
}

module.exports = scrape;
