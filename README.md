**shutterstock-scraping-metadata**

A Node.js package to scrape metadata from Shutterstock images and videos.

**Description**

This package allows you to programmatically extract metadata such as contributor, keywords, categories, and descriptions from Shutterstock asset URLs. It utilizes the `jsdom` library to parse the HTML content of Shutterstock pages and retrieve the desired information.

**Installation**

You can install this package using npm:

```bash
npm install shutterstock-scraping-metadata
```

Here's a basic example of how to use the package:

```javascript
const scrapeMetadata = require('shutterstock-scraping-metadata');

async function main() {
  const imageUrl = '[https://www.shutterstock.com/image-photo/bright-spring-view-cameo-island-coast-1047730157](https://www.shutterstock.com/image-photo/bright-spring-view-cameo-island-coast-1047730157)'; // Example Shutterstock image URL
  const videoUrl = '[https://www.shutterstock.com/video/clip-10758438-woman-enjoying-sunset-ocean-beach-feeling](https://www.shutterstock.com/video/clip-10758438-woman-enjoying-sunset-ocean-beach-feeling)'; // Example Shutterstock video URL

  try {
    const imageMetadata = await scrapeMetadata(imageUrl);
    console.log('Image Metadata:', imageMetadata);
  } catch (error) {
    console.error('Error scraping image metadata:', error);
  }

  try {
    const videoMetadata = await scrapeMetadata(videoUrl);
    console.log('Video Metadata:', videoMetadata);
  } catch (error) {
    console.error('Error scraping video metadata:', error);
  }
}

main();
```

**Functionality (Example - Adjust based on your actual implementation)**

The `scrapeMetadata` function (or whatever you name your main exported function) should:

1.  Take a Shutterstock URL (either image or video page) as input.
2.  Fetch the HTML content of the URL.
3.  Use `jsdom` to parse the HTML.
4.  Extract relevant metadata such as:
    * Contributor Name
    * Keywords/Tags
    * Categories
    * Description/Caption
5.  Return an object containing the extracted metadata.

**Dependencies**

* [jsdom](https://www.npmjs.com/package/jsdom): Used for parsing the HTML content.

**Author**

****eexvuu****