const puppeteer = require("puppeteer");

const url =
  "https://www.weddingwire.com/biz/kalli-bear-films/86e1f15a273366c2.html";

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url), { waitUntil: "networkidle2" };

  const ratingEl = page.$(".storefrontSummary__text");
  const descriptionEls = page.$$(".storefrontReview__description");

  console.log(ratingEl);
  console.log(descriptionEls);

  await browser.close();
})();
