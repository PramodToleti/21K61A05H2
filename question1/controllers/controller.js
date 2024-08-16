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

    const products = companies.map(async (company) => {
      const res = await apiConfig.getProductsByCategory(
        `/companies/${company}/categories/${categoryname}/products?top=${n}&minPrice=1&maxPrice=10000`
      );

      const data = res.data.map((product) => {
        return {
          id: company + "-" + categoryname + "-" + product.productName,
          ...product,
        };
      });

      return data;
    });

    let formatedData = await Promise.all(products);

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

const getProductDetails = async (req, res) => {
  const { categoryname, productid } = req.params;
  console.log(categoryname, productid);

  try {
    const [company, categoryname, productName] = productid.split("-");
    const response = await apiConfig.getProductsByCategory(
      `/companies/${company}/categories/${categoryname}/products?top=100&minPrice=1&maxPrice=10000`
    );

    const product = response.data.find(
      (product) =>
        company + "-" + categoryname + "-" + product.productName === productid
    );

    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal Server Error");
  }
};

module.exports = {
  getProductsByCategory,
  getProductDetails,
};
