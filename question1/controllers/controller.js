const { default: axios } = require("axios");
const apiConfig = require("../apiConfig");

const getProductsByCategory = async (req, res) => {
  const { categoryname } = req.params;
  const { n, page, sortBy = "", order = "ASC" } = req.query;

  if (!n) {
    return res.status(400).json({
      error: "n is missing in query params",
    });
  }

  if (n > 10 && !page) {
    return res.status(400).json({
      error: "page is missing in query params",
    });
  }

  try {
    const companies = ["AMZ", "FLP", "SNP", "MYN", "AZO"];

    const promises = companies.map((company) => {
      return apiConfig.getProductsByCategory(
        `/companies/${company}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`
      );
    });

    const responses = await Promise.all(promises);

    let formatedData = [];

    responses.forEach((response) => {
      formatedData = formatedData.concat(...response.data);
    });

    formatedData = formatedData.map((product, index) => {
      return {
        id: index + 1,
        ...product,
      };
    });

    if (sortBy) {
      for (let i = 0; i < formatedData.length; i++) {
        for (let j = i + 1; j < formatedData.length; j++) {
          if (order === "ASC") {
            if (formatedData[i][sortBy] > formatedData[j][sortBy]) {
              let temp = formatedData[i];
              formatedData[i] = formatedData[j];
              formatedData[j] = temp;
            }
          } else {
            if (formatedData[i][sortBy] < formatedData[j][sortBy]) {
              let temp = formatedData[i];
              formatedData[i] = formatedData[j];
              formatedData[j] = temp;
            }
          }
        }
      }
    }

    formatedData = formatedData.slice(0, n);

    if (n > 10 && page) {
      const start = (page - 1) * 10;
      const end = page * 10;
      console.log(start, end);
      formatedData = formatedData.slice(start, end);
      console.log(formatedData);
    }

    res.status(200).json(formatedData);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProductsByCategory,
};
