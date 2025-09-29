"use client";

import React from "react";
import Image from "next/image";
import { useCart } from "@/context/CartContext";

interface CartSidebarProps {
  open: boolean;
  onClose: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({ open, onClose }) => {
  const { items, increment, decrement, removeItem, clear, totalCount, totalPrice } = useCart();

  return (
    <div className={`fixed inset-0 z-50 ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity ${open ? "opacity-30" : "opacity-0"}`}
        onClick={onClose}
      />
      {/* Panel */}
      <aside
        className={`absolute right-0 top-0 h-full w-full sm:w-[420px] bg-white shadow-xl transform transition-transform duration-300 flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <header className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Your Cart ({totalCount})</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">✕</button>
        </header>

        <section className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500">Your cart is empty.</p>
          ) : (
            items.map((it) => (
              <div key={it.id} className="flex items-center gap-3 border rounded-md p-2">
                {it.image ? (
                  <Image src={it.image} alt={it.name} width={56} height={56} className="rounded" />
                ) : (
                  <div className="w-14 h-14 bg-gray-100 rounded" />
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-medium truncate">{it.name}</div>
                  <div className="text-sm text-gray-500">{it.price.toFixed(2)}</div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="px-2 py-1 rounded border" onClick={() => decrement(it.id)}>-</button>
                  <span className="w-6 text-center">{it.qty}</span>
                  <button className="px-2 py-1 rounded border" onClick={() => increment(it.id)}>+</button>
                </div>
                <button className="text-red-600 text-sm ml-2" onClick={() => removeItem(it.id)}>Remove</button>
              </div>
            ))
          )}
        </section>

        <footer className="p-4 border-t space-y-2">
          <div className="flex items-center justify-between font-semibold">
            <span>Total</span>
            <span>{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex items-center justify-between gap-2">
            <button className="px-3 py-2 rounded border" onClick={clear} disabled={items.length === 0}>Clear</button>
            <button className="px-4 py-2 rounded bg-pink-500 hover:bg-pink-600 text-white" disabled={items.length === 0}>Checkout</button>
          </div>
        </footer>
      </aside>
    </div>
  );
};

export default CartSidebar;
