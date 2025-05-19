"use client";

import Link from "next/link";
import Image from "next/image";
import { ProductSummary } from "../types/Product";

interface Props {
  product: ProductSummary;
}

const ProductItem = ({ product }: Props) => {
  return (
    <Link
      href={`/product/${product.id}`}
      className="flex flex-col gap-2 p-4 border border-gray-300 rounded-lg bg-white text-black no-underline hover:-translate-y-1 hover:shadow-lg transition"
    >
      <Image
        src={product.imgUrl}
        alt={product.model}
        width={300}
        height={160}
        className="w-full h-40 object-contain bg-gray-100"
        priority={false}
      />

      <div className="flex flex-col justify-between text-center flex-grow">
        <h2 className="text-base font-bold">
          {product.brand} {product.model}
        </h2>
        <p
          className={
            product.price
              ? "text-[#1069cf] text-base"
              : "text-red-700 font-bold"
          }
        >
          {product.price ? `${product.price} €` : "Not available"}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
