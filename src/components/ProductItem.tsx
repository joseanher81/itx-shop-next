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
      className="block border rounded p-4 hover:shadow transition"
    >
      <Image
        src={product.imgUrl}
        alt={product.model}
        width={300}
        height={160}
        className="w-full h-40 object-contain mb-2"
        priority={false} // Lazy load by default
      />

      <div>
        <h2 className="font-semibold text-lg">
          {product.brand} {product.model}
        </h2>
        <p className={product.price ? "text-blue-600" : "text-gray-400"}>
          {product.price ? `${product.price} €` : "Not available"}
        </p>
      </div>
    </Link>
  );
};

export default ProductItem;
