import React from "react";
import { useState } from "react";
import Product from "./Product";

export default function Dashboard(props) {
  const { products, onAdd } = props;
  const [search, setSearch] = useState(false);
  const [searchedProd, setProduct] = useState([]);

  const searchProduct = (e, products) => {
    console.log(e.target.value, "From Dahboard"); // product.name.toLowerCase() === e.target.value.toLowerCase() for exact search
    let prod = products.filter(
      (product) =>
        product.category.toLowerCase().includes(e.target.value.toLowerCase()) ||
        product.title.toLowerCase().includes(e.target.value.toLowerCase())
    );
    if (prod.length) {
      setSearch(false);
      setProduct(prod);
    } else {
      setSearch(true);
    }
    if (e.target.value === "") {
      setSearch(false);
      setProduct(prod);
    }
  };
  let prodDisplay = searchedProd.length
    ? searchedProd.map((product) => (
        <Product key={product.id} product={product} onAdd={onAdd}></Product>
      ))
    : products.map((product) => (
        <Product key={product.id} product={product} onAdd={onAdd}></Product>
      ));

  return (
    <main className="block col-2">
      <h2>Products</h2>
      <input
        type="text"
        id="myInput"
        onChange={(e) => searchProduct(e, props.products)}
        placeholder="Search for products..."
      ></input>
      <div className="row">
        {search ? <div>No items found</div> : prodDisplay}
      </div>
    </main>
  );
}
