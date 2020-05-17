const cheerio = require("cheerio");

function extractFromWeddingWire(html) {
  const $ = cheerio.load(html);

  function extractReviewData(el, selector, child) {
    if (child) {
      return $(el).find(selector).first().children(child).text().trim();
    }

    $(el).find(selector).first().children().remove();
    return $(el).find(selector).first().text().trim();
  }

  const rating = $(".storefrontSummary .storefrontSummary__text")
    .first()
    .text()
    .replace("out of 5.0", "")
    .trim();

  const reviews = [];
  const reviewListItems = $("li.storefrontReview");
  reviewListItems.each((_i, el) => {
    const reviewer = extractReviewData(el, ".storefrontReview__name");
    const reviewRating = extractReviewData(el, ".app-review-rating", "span");
    const title = extractReviewData(el, ".storefrontReview__title");
    const content = extractReviewData(el, ".storefrontReview__description");
    const date = extractReviewData(el, ".storefrontReview__sentDate")
      .replace("Sent on", "")
      .trim();

    reviews.push({
      reviewer,
      rating: reviewRating,
      title,
      content,
      date,
    });
  });

  return { rating, reviews };
}

function extractFromTheKnot(html) {
  const $ = cheerio.load(html);

  const rating = $(".styles__overall-rating___1JlCr").first().text().trim();

  return { rating };
}

module.exports = {
  extractFromWeddingWire,
  extractFromTheKnot,
};
