"use client";

import { useState, useEffect } from "react";
import { getProducts } from "../services/productService";
import { useCache } from "../hooks/useCache";
import { ProductSummary } from "../types/Product";
import ProductItem from "../components/ProductItem";
import Search from "../components/Search";

export default function HomePage() {
  const { data, loading, error } = useCache<ProductSummary[]>(
    "products",
    getProducts,
    60 * 60 * 1000
  );
  const [query, setQuery] = useState("");
  const [filtered, setFiltered] = useState<ProductSummary[]>([]);

  useEffect(() => {
    const products = data || [];
    if (!products.length) return;
    const result = products.filter((p) =>
      `${p.brand} ${p.model}`.toLowerCase().includes(query.toLowerCase())
    );
    setFiltered(result);
  }, [query, data]);

  if (loading) return <p className="text-center py-8">Loading...</p>;
  if (error)
    return <p className="text-center text-red-500">Error loading products.</p>;

  return (
    <div className="space-y-6">
      <Search query={query} setQuery={setQuery} />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
        {filtered.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
