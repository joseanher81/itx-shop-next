"use client";

import { createContext, useContext, useReducer, ReactNode } from "react";

// Types
interface Product {
  id: string;
  colorCode?: string;
  storageCode?: string;
}

interface CartState {
  count: number;
  cart: Product[];
}

type CartAction =
  | { type: "ADD_TO_CART"; payload: Product }
  | { type: "REMOVE_FROM_CART"; payload: string }
  | { type: "SET_COUNT"; payload: number }
  | { type: "RESET" };

interface CartContextProps extends CartState {
  addToCart: (product: Product) => void;
  removeFromCart: (id: string) => void;
  setCount: (count: number) => void;
  clearCart: () => void;
}

// Estado inicial
const initialState: CartState = {
  count: 0,
  cart: [],
};

// Reductor
const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item.id !== action.payload),
      };
    case "SET_COUNT":
      return { ...state, count: action.payload };
    case "RESET":
      return initialState;
    default:
      return state;
  }
};

// Crear contexto
const CartContext = createContext<CartContextProps | undefined>(undefined);

// Hook personalizado
export const useCartContext = (): CartContextProps => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// Provider
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product: Product) =>
    dispatch({ type: "ADD_TO_CART", payload: product });

  const removeFromCart = (id: string) =>
    dispatch({ type: "REMOVE_FROM_CART", payload: id });

  const setCount = (count: number) =>
    dispatch({ type: "SET_COUNT", payload: count });

  const clearCart = () => dispatch({ type: "RESET" });

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        setCount,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
