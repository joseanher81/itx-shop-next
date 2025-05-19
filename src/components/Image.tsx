"use client";

import NextImage from "next/image";
import { ProductDetail } from "../types/Product";

interface Props {
  product: ProductDetail;
}

const ProductImage = ({ product }: Props) => {
  return (
    <div className="relative w-full max-w-md aspect-square mx-auto">
      <NextImage
        src={product.imgUrl}
        alt={product.model}
        fill
        className="object-contain rounded border"
        priority
      />
    </div>
  );
};

export default ProductImage;
