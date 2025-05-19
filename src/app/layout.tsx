import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export const metadata = {
  title: "ITX Shop",
  description: "React + Next.js mobile shop simulator",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Header />
          <main className="container mx-auto p-4">{children}</main>
          <ToastContainer position="bottom-center" autoClose={3000} />
        </CartProvider>
      </body>
    </html>
  );
}
