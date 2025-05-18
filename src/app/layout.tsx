import { CartProvider } from "../context/CartContext";
import Header from "../components/Header";
import "./globals.css";

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
        </CartProvider>
      </body>
    </html>
  );
}
