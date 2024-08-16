import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

type Product = {
  id: string;
  productName: string;
  price: string;
  rating: string;
  availability: string;
};

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState<Product>();

  async function fetchProduct() {
    const response = await fetch(
      `http://localhost:5000/categories/Phone/products/${id}`
    );
    const data = await response.json();
    console.log(data);
    setProduct(data);
  }

  useEffect(() => {
    fetchProduct();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-end px-10">
        <Link to="/" className="p-2 bg-gray-200 rounded-md mb-4">
          Home
        </Link>
      </div>
      <div className="flex justify-center min-h-screen items-center">
        <div className="p-5 bg-gray-100 max-w-md rounded-md">
          <img
            src="https://api.api-ninjas.com/v1/randomimage?category=nature"
            alt={product?.productName}
            className="w-full h-20 object-cover rounded-md"
          />
          <h1 className="text-lg font-bold">{product?.productName}</h1>
          <p className="text-sm">Name: {product?.price}</p>
          <p className="text-sm">Rating: {product?.rating}</p>
          <p className="text-sm">Availability: {product?.availability}</p>
        </div>
      </div>
    </div>
  );
};

export default Product;
