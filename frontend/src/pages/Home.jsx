import "../styles/Home.css";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { useEffect, useState } from "react";

function Home() {
  const [carts, setCarts] = useState(0);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const [products, setProducts] = useState([]);  
  const [loading, setLoading] = useState(false);

  const handleAddToCart = () => {
    setCarts((prev) => prev + 1);
  };

  
  useEffect(() => {
  setLoading(true);

  fetch(`http://localhost:8085/products?search=${search}`)
    .then((res) => res.json())
    .then((data) => {
      // Filter locally if category is not 'All'
      const filtered = category === "All"
        ? data
        : data.filter((p) => p.category === category);

      setProducts(filtered);
      setLoading(false);
    })
    .catch((err) => {
      console.error("Error fetching products", err);
      setLoading(false);
    });
}, [search, category]);


  return (
    <>
      <Navbar
        carts={carts}
        search={search}
        setSearch={setSearch}
      />

      <div className="page">
      
        <div className="filter-bar">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Misc">Misc</option>
          </select>
        </div>

        <div className="product-grid">
          {loading ? (
            <p>Loading products...</p>
          ) : products.length === 0 ? (
            <p>No products found</p>
          ) : (
            products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToCart={handleAddToCart}
              />
            ))
          )}
        </div>
      </div>
    </>
  );
}

export default Home;