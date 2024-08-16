import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

type Product = {
  id: string;
  productName: string;
  price: string;
  rating: string;
  availability: string;
};

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function fetchProducts() {
    const response = await fetch(
      "http://localhost:5000/categories/Phone/products?n=10&sortBy=rating&order=DESC"
    );
    const data = await response.json();
    setProducts(data);
  }

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="p-10">
      <div className="flex justify-end px-10">
        <Link to="/" className="p-2 bg-gray-200 rounded-md mb-4">
          Home
        </Link>
      </div>
      <div className="grid xsm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {products.map((product: Product) => (
          <Link
            to={`/product/${product.id}`}
            key={product.id}
            className="p-5 bg-gray-100 rounded-md"
          >
            <img
              src="https://api.api-ninjas.com/v1/randomimage?category=nature"
              alt={product.productName}
              className="w-full h-20 object-cover rounded-md"
            />
            <h1 className="text-lg font-bold">{product.productName}</h1>
            <p className="text-sm">Name: {product.price}</p>
            <p className="text-sm">Rating: {product.rating}</p>
            <p className="text-sm">Availability: {product.availability}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;
