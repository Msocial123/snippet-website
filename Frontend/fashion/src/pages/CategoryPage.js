// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// // import "./CategoryPage.css";

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setProducts([]);
    
//     fetch(`http://localhost:5000/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching category products:", err));
//   }, [category]);


//   return (
//     <div className="category-wrapper">
//       {/* <h2 className="category-title">{category.toUpperCase()}</h2>
//       <h2>{category.replace(/-/g, ' ')}</h2> */}

//       <div className="product-grid">
//         {products.map((product) => (
//           <ProductCard key={product.PID} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import ProductCard from "../components/ProductCard";
// import "./CategoryPage.css"; // 👈 make sure to import your CSS here

// const CategoryPage = () => {
//   const { category } = useParams();
//   const [products, setProducts] = useState([]);

//   useEffect(() => {
//     setProducts([]);
//     fetch(`http://localhost:5000/api/products/category/${category}`)
//       .then((res) => res.json())
//       .then((data) => setProducts(data))
//       .catch((err) => console.error("Error fetching category products:", err));
//   }, [category]);

//   return (
//     <div className="category-wrapper">
//       {/* <h2 className="category-title">{category.toUpperCase()}</h2> */}
//       {/* <h2>{category.replace(/-/g, ' ')}</h2> */}

//       <div className="product-grid fade-in">
//         {products.map((product) => (
//           <ProductCard key={product.PID} product={product} />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CategoryPage;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import "./CategoryPage.css";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true); // 👈 track loading state

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:5000/api/products/category/${category}`)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching category products:", err);
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="category-wrapper">
      {loading ? (
        <p className="loading-text"></p> // 👈 optional spinner or text
      ) : (
        <div className="product-grid fade-in">
          {products.map((product) => (
            <ProductCard key={product.PID} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
