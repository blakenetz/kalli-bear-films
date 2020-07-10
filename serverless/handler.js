const request = require("axios");

const { extractFromWeddingWire, extractFromTheKnot } = require("./helpers");
const dataSources = [
  {
    url:
      "https://www.weddingwire.com/biz/kalli-bear-films/86e1f15a273366c2.html",
    extractFunction: extractFromWeddingWire,
  },
  {
    url:
      "https://www.theknot.com/marketplace/kalli-bear-films-denver-co-2036700",
    extractFunction: extractFromTheKnot,
  },
];

function extractData({ url, extractFunction }) {
  console.log({ url, extractFunction });
  return request(url, { timeout: 1000 })
    .then(({ data }) => {
      if (url.indexOf("theknot.com") > -1) console.log(data);
      return extractFunction(data);
    })
    .catch((err) => console.error(err));
}

module.exports.getReviews = (event, context, callback) => {
  Promise.all(dataSources.map(extractData))
    .then((reviewData) => {
      console.log({ reviewData });
      return callback(null, { reviewData });
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
