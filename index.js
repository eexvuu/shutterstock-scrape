const jsdom = require("jsdom");
const { JSDOM } = jsdom;

async function scrape(url) {
  try {
    const myHeaders = new Headers();
    myHeaders.append("priority", "u=0, i");
    myHeaders.append(
      "user-agent",
      "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
    );

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      throw new Error(`Failed to fetch URL: ${response.status} ${response.statusText}`);
    }

    const result = await response.text();

    const dom = new JSDOM(result);
    const nextDataElement = dom.window.document.getElementById("__NEXT_DATA__");

    if (!nextDataElement) {
      throw new Error("Could not find the '__NEXT_DATA__' element.");
    }

    const data = nextDataElement.textContent;

    let jsonData;
    try {
      jsonData = JSON.parse(data);
    } catch (error) {
      throw new Error("Failed to parse JSON data from '__NEXT_DATA__'.");
    }

    const obj = {};

    try {
      const asset = jsonData?.props?.pageProps?.asset;
      if (!asset) {
        throw new Error("Could not find the 'asset' property in the JSON data.");
      }

      obj.contributor = asset.contributor?.displayName || null;
      obj.description = asset.description || null;
      obj.keywords = asset.keywords || null;
      obj.categories = Array.isArray(asset.categories)
        ? asset.categories.map((category) => category.name)
        : null;
    } catch (error) {
      throw new Error("Error extracting metadata from JSON data.");
    }

    return obj;
  } catch (error) {
    console.error(`Error scraping URL ${url}:`, error.message);
    return null; // Or you could throw the error again, depending on your needs
  }
}

module.exports = scrape;