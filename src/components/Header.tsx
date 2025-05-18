"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";

const Header = () => {
  const { count } = useCartContext();
  const pathname = usePathname();

  const renderBreadcrumbs = () => {
    if (pathname === "/") return "Home";

    if (pathname.startsWith("/product/")) {
      return (
        <span className="text-sm text-gray-300">
          <Link href="/" className="hover:underline text-white">
            Home
          </Link>{" "}
          / Product Details
        </span>
      );
    }

    return null;
  };

  return (
    <header className="bg-gray-900 text-white py-4 shadow">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo + Breadcrumbs */}
        <div>
          <Link href="/" className="text-2xl font-bold text-white">
            ITX Shop
          </Link>
          <div>{renderBreadcrumbs()}</div>
        </div>

        {/* Cart */}
        <div className="flex items-center gap-2">
          <FaShoppingCart className="text-xl" />
          <span className="text-sm">{count} items</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
