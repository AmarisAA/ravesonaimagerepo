import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

const MyCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loadingCheckout, setLoadingCheckout] = useState(false);

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  const updateCart = (updatedItems) => {
    setCartItems(updatedItems);
    localStorage.setItem("cart", JSON.stringify(updatedItems));
  };

  const removeItem = (id) => {
    const updatedItems = cartItems.filter((item) => item.id !== id);
    updateCart(updatedItems);
  };

  const changeQuantity = (id, amount) => {
    const updatedItems = cartItems.map((item) => {
      if (item.id === id) {
        const newQuantity = Math.max(1, (item.quantity || 1) + amount);
        return { ...item, quantity: newQuantity };
      }
      return item;
    });

    updateCart(updatedItems);
  };

  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = Number(item.price) || 0;
      const quantity = Number(item.quantity) || 1;
      return sum + price * quantity;
    }, 0);
  }, [cartItems]);

  const tax = 0;
  const total = subtotal + tax;

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty.");
      return;
    }

    try {
      setLoadingCheckout(true);
      alert("Stripe checkout comes next.");
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Something went wrong during checkout.");
    } finally {
      setLoadingCheckout(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a] text-white px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-300">My Cart</span>
        </div>

        <div className="mb-10">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            My Cart
          </h1>
          <p className="text-white/60 mt-3">
            Review your picks before checkout.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[1.6fr_0.9fr] gap-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6">
            <div className="hidden md:grid grid-cols-[2.2fr_0.8fr_0.9fr_0.9fr_0.5fr] gap-4 border-b border-white/10 pb-4 mb-6 text-sm uppercase tracking-wide text-white/60">
              <p>Product</p>
              <p>Price</p>
              <p>Quantity</p>
              <p>Subtotal</p>
              <p></p>
            </div>

            {cartItems.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-white/10 bg-black/20 px-6 py-16 text-center">
                <p className="text-3xl font-semibold text-white/70">Your cart is empty</p>
                <p className="text-white/40 mt-3">
                  Add something from the store to see it here.
                </p>
                <Link
                  to="/"
                  className="inline-block mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-medium hover:opacity-90"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-5">
                {cartItems.map((item) => {
                  const price = Number(item.price) || 0;
                  const quantity = Number(item.quantity) || 1;
                  const itemSubtotal = price * quantity;

                  return (
                    <div
                      key={item.id}
                      className="grid grid-cols-1 md:grid-cols-[2.2fr_0.8fr_0.9fr_0.9fr_0.5fr] gap-4 items-center rounded-2xl border border-white/10 bg-black/20 p-4"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={
                            item.image ||
                            `https://placehold.co/140x160?text=${encodeURIComponent(item.name)}`
                          }
                          alt={item.name}
                          className="w-24 h-28 object-cover rounded-xl border border-white/10"
                        />
                        <div>
                          <h2 className="font-semibold text-xl text-white">{item.name}</h2>
                          <p className="text-sm text-white/50 mt-1">
                            {item.description || "Ravesona item"}
                          </p>
                        </div>
                      </div>

                      <div className="text-white/80 text-lg">
                        ${price.toFixed(2)}
                      </div>

                      <div>
                        <div className="inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                          <button
                            onClick={() => changeQuantity(item.id, -1)}
                            className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/10 transition"
                          >
                            -
                          </button>
                          <span className="min-w-[20px] text-center">{quantity}</span>
                          <button
                            onClick={() => changeQuantity(item.id, 1)}
                            className="w-8 h-8 rounded-lg border border-white/10 hover:bg-white/10 transition"
                          >
                            +
                          </button>
                        </div>
                      </div>

                      <div className="font-semibold text-lg text-cyan-300">
                        ${itemSubtotal.toFixed(2)}
                      </div>

                      <div className="text-right">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-red-400 hover:text-red-300 transition"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            <div className="mt-10">
              <h2 className="text-2xl font-semibold mb-4 text-white">
                Promo Code
              </h2>
              <div className="flex max-w-xl overflow-hidden rounded-2xl border border-white/10 bg-white/5">
                <input
                  type="text"
                  placeholder="Enter promo code"
                  className="flex-1 px-5 py-4 bg-transparent text-white placeholder:text-white/35 outline-none"
                />
                <button className="px-6 font-semibold text-cyan-300 hover:bg-white/10 transition">
                  Apply
                </button>
              </div>
            </div>
          </div>

          <div className="h-fit rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 sticky top-6">
            <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              Order Summary
            </h2>

            <div className="space-y-5 border-t border-white/10 pt-6">
              <div className="flex justify-between text-lg text-white/75">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-lg text-white/75">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-2xl font-semibold text-white pt-3 border-t border-white/10">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={loadingCheckout || cartItems.length === 0}
              className="w-full mt-8 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 py-4 text-lg font-semibold text-white hover:opacity-90 disabled:opacity-50 transition"
            >
              {loadingCheckout ? "Redirecting..." : "Place Order"}
            </button>

            <Link
              to="/"
              className="block w-full mt-4 rounded-2xl border border-white/15 py-4 text-center text-lg font-medium text-white hover:bg-white/10 transition"
            >
              Continue Shopping
            </Link>

            <p className="text-white/35 text-sm mt-5 text-center">
              Secure checkout will be added next.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyCart;