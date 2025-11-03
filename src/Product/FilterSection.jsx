import React from "react";

const FilterSection = ({onHandleSelect}) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-2xl font-bold">Your Products</h2>
      <div className="flex items-center space-x-2">
        <span className="text-sm">Sort by:</span>
        <select className="border rounded-md px-2 py-1 text-sm" onChange={onHandleSelect}>
          <option value="mostPopular">Most Popular</option>
          <option value="lowTohigh">Price: Low to High</option>
          <option value="highTolow">Price: High to Low</option>
        </select>
      </div>
    </div>
  );
};

export default FilterSection;
