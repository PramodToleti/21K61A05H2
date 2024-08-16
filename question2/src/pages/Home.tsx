import { useEffect, useState } from "react";

type Product = {
  id: string;
  name: string;
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
      <div className="grid grid-cols-3 md:grid-cols-4 gap-5">
        {products.map((product: Product) => (
          <div key={product.id} className="p-5 bg-gray-100 rounded-md">
            <img
              src="https://api.api-ninjas.com/v1/randomimage?category=nature"
              alt={product.name}
              className="w-full h-20 object-cover rounded-md"
            />
            <h1 className="text-lg font-bold">{product.name}</h1>
            <p className="text-sm">{product.price}</p>
            <p className="text-sm">{product.rating}</p>
            <p className="text-sm">{product.availability}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
