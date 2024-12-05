/** @format */

import React from "react";
import { IProduct } from "@/interfaces/product.interface";

export default function CardComponent(product: IProduct) {
  return (
    <div className="card bg-base-100 w-full shadow-xl">
      <figure>
        <img src={product.img} alt="Shoes" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{product.product_name}</h2>
        <p>{product.description}</p>
        <b>${product.price}</b>
        <div className="card-actions justify-end">
          <button className="btn btn-primary">Add to Card</button>
        </div>
      </div>
    </div>
  );
}
