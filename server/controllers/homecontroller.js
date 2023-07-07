const axios = require("axios");
exports.homepage = (req, res) => {
  var { type, value } = req.query;
  if (type && value) {
    axios
      .post(
        process.env.BASE_URL +
          `/api/stock/products/filtred?type=${type}&value=${value}`
      )
      .then((response) => {
        res.json({
          length: response.data.docs.length,
          data: response.data,
        });
      })
      .catch((error) => {
        res.json({
          error: "Something went wrong",
        });
      });
  } else {
    axios
      .post(process.env.BASE_URL + "/api/stock/products")
      .then((response) => {
        res.json({
          length: response.data.docs.length,
          data: response.data,
        });
      })
      .catch((error) => {
        res.json({
          error: "Something went wrong",
        });
      });
  }
};
