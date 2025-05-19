"use client";

import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import {
  getProduct,
  addToCart as apiAddToCart,
} from "../../../services/productService";
import { useCache } from "../../../hooks/useCache";
import { useCartContext } from "../../../context/CartContext";
import { toast } from "react-toastify";
import ProductImage from "../../../components/Image";
import Description from "../../../components/Description";
import Actions from "../../../components/Actions";
import Loading from "../../../components/Loading";
import ErrorMessage from "../../../components/ErrorMessage";
import { ProductDetail } from "../../../types/Product";

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

  // Inicializa los valores por defecto
  useEffect(() => {
    if (!product) return;
    if (!selectedColor && product.options.colors?.length > 0) {
      setSelectedColor(product.options.colors[0].code);
    }
    if (!selectedStorage && product.options.storages?.length > 0) {
      setSelectedStorage(product.options.storages[0].code);
    }
  }, [product, selectedColor, selectedStorage]);

  const handleAddToCart = async (payload: {
    id: string;
    colorCode: string;
    storageCode: string;
  }) => {
    setIsPending(true);
    try {
      const res = await apiAddToCart(payload);
      setCount(res.count);
      addToCart(product!);
      toast.success("Product added to cart!");
    } catch {
      toast.error("Could not add to cart.");
    }
    setIsPending(false);
  };

  if (loading) return <Loading />;
  if (error || !product) return <ErrorMessage message={error?.message} />;

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1">
          <ProductImage product={product} />
        </div>

        <div className="flex-1 space-y-4">
          <Description product={product} />
          <Actions
            product={product}
            selectedColor={selectedColor}
            selectedStorage={selectedStorage}
            handleChangeColor={setSelectedColor}
            handleChangeStorage={setSelectedStorage}
            handleAddToCart={handleAddToCart}
            isPending={isPending}
          />
        </div>
      </div>
    </div>
  );
}
