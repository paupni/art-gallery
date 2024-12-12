import React from "react";
import { Link } from "react-router";

const Categories = () => {
  const categories = ["unclassified", "painting", "sculpture", "video"];

  return (
    <div className="page categories">
      {categories.map((cat) => {
        return (
          <Link className="category" to={`/artworks/categories/${cat}`}>
            {cat}
          </Link>
        );
      })}
    </div>
  );
};

export default Categories;
