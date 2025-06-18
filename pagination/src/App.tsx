import "./styles.css";
import { getProducts } from "./api/products";
import { useEffect, useState } from "react";
import { LIMIT } from "./constants/constants";

export default function App() {
  const [products, setProducts] = useState<any>([]);
  const [filteredProducts, setFilteredProducts] = useState<any>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then((data) => {
        setProducts(data.products);
        setFilteredProducts(data.products.slice(0, LIMIT));
      })
      .catch((e) => setError("Something went Wrong. " + e));
  }, [getProducts, setProducts, setFilteredProducts, setError]);

  function handlePageChange(value: number) {
    setFilteredProducts(products.slice(LIMIT * (value - 1), LIMIT * value));
  }

  if (error)
    return (
      <div className="App">
        <h1>{error}</h1>
      </div>
    );

  return (
    <div className="App">
      <h1>Pagination</h1>
      <div className="product-section">
        {filteredProducts.map((product: any) => (
          <div className="product-card">
            <span>{product.id}</span>
            <span>{product.title}</span>
            <span>{product.description}</span>
            <span>{product.category}</span>
          </div>
        ))}
      </div>

      <div className="button-div">
        {Array.from({ length: products.length / LIMIT }, (_, index) => (
          <button onClick={() => handlePageChange(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
