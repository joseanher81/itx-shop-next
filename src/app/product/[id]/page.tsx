"use client";

import { useParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useCache } from "../../../hooks/useCache";
import { getProduct } from "../../../services/productService";
import { useCartContext } from "../../../context/CartContext";
import { addToCart as apiAddToCart } from "../../../services/productService";
import { ProductDetail } from "../../../types/Product";
//import { toast } from 'react-toastify';
import Image from "next/image";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const fetchProduct = useCallback(() => getProduct(id as string), [id]);
  const {
    data: product,
    loading,
    error,
  } = useCache<ProductDetail>(`product-${id}`, fetchProduct);
  const { setCount, addToCart } = useCartContext();

  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [selectedStorage, setSelectedStorage] = useState<string | null>(null);
  const [isPending, setIsPending] = useState(false);

  // Set default options when product is loaded
  useEffect(() => {
    if (!product) return;
    if (!selectedColor && product.options.colors?.length > 0) {
      setSelectedColor(product.options.colors[0].code);
    }
    if (!selectedStorage && product.options.storages?.length > 0) {
      setSelectedStorage(product.options.storages[0].code);
    }
  }, [product, selectedColor, selectedStorage]);

  const handleAddToCart = async () => {
    if (!selectedColor || !selectedStorage || !product) {
      alert("Please select color and storage");
      return;
    }

    setIsPending(true);
    try {
      const res = await apiAddToCart({
        id: product.id,
        colorCode: selectedColor,
        storageCode: selectedStorage,
      });

      setCount(res.count);
      addToCart(product);
      //toast.success('Product added to cart!');
    } catch (err) {
      console.log(err);
      //toast.error('Failed to add to cart');
    }
    setIsPending(false);
  };

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error || !product)
    return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Image */}
      <div className="max-w-md w-full mx-auto">
        <Image
          src={product.imgUrl}
          alt={product.model}
          width={400}
          height={300}
          className="w-full h-auto object-contain"
          priority
        />
      </div>

      {/* Details */}
      <div>
        <h1 className="text-2xl font-bold mb-2">
          {product.brand} - {product.model}
        </h1>
        <p className="text-blue-600 text-lg mb-4">{product.price} €</p>

        <ul className="mb-4 text-sm text-gray-700">
          <li>CPU: {product.cpu || "N/A"}</li>
          <li>RAM: {product.ram || "N/A"}</li>
          <li>Battery: {product.battery || "N/A"}</li>
          <li>OS: {product.os || "N/A"}</li>
          <li>Resolution: {product.displayResolution || "N/A"}</li>
        </ul>

        <div className="flex flex-col gap-4">
          {/* Storage */}
          <label>
            Storage:
            <select
              value={selectedStorage ?? ""}
              onChange={(e) => setSelectedStorage(e.target.value)}
              className="w-full border p-2 mt-1"
            >
              {product.options.storages.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </label>

          {/* Color */}
          <label>
            Color:
            <select
              value={selectedColor ?? ""}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-full border p-2 mt-1"
            >
              {product.options.colors.map((opt) => (
                <option key={opt.code} value={opt.code}>
                  {opt.name}
                </option>
              ))}
            </select>
          </label>

          {/* Add to cart */}
          <button
            disabled={isPending || !product.price}
            onClick={handleAddToCart}
            className="bg-blue-600 text-white p-2 rounded disabled:opacity-50"
          >
            {isPending ? "Adding..." : "Add to cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
