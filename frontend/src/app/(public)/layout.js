// src/app/(public)/layout.js
import { CartProvider } from "@/context/CartContext";

export const metadata = {
  title: "min store",
  description: "Minimalist e-commerce",
};

export default function PublicLayout({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  );
}