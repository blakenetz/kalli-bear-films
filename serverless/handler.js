const request = require("axios");

const { extractReviewsFromHtml } = require("./helpers");
const url =
  "https://www.weddingwire.com/biz/kalli-bear-films/86e1f15a273366c2.html";

module.exports.getReviews = (event, context, callback) => {
  request(url)
    .then(({ data }) => {
      const reviews = extractReviewsFromHtml(data);
      callback(null, { reviews });
    })
    .catch(callback);
};

// Use this code if you don't use the http event with the LAMBDA-PROXY integration
// return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
// module.exports.hello = async (event) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify(
//       {
//         message: "Go Serverless v1.0! Your function executed successfully!",
//         input: event,
//       },
//       null,
//       2
//     ),
//   };
// };
