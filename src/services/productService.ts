import axios from "axios";
import { ProductSummary, ProductDetail } from "../types/Product";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const TIMEOUT = 10000;

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Get all products
export const getProducts = async (): Promise<ProductSummary[]> => {
  try {
    const response = await api.get("/product");
    return response.data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw new Error("Error fetching product list");
  }
};

// Get product by ID
export const getProduct = async (id: string): Promise<ProductDetail> => {
  try {
    const response = await api.get(`/product/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Error fetching product");
  }
};

//Add product to cart
export const addToCart = async ({
  id,
  colorCode,
  storageCode,
}: {
  id: string;
  colorCode: string;
  storageCode: string;
}): Promise<{ count: number }> => {
  try {
    const response = await api.post("/cart", {
      id,
      colorCode,
      storageCode,
    });

    return response.data;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw new Error("Error adding product to cart");
  }
};
