import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import useFetch from "../../hooks/usefetch";

const Product = () => {
  const { id } = useParams();
  const { data } = useFetch(`/products/${id}?populate=*`);
  const [quantity, setQuantity] = useState(1);

  if (!data) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a] text-white px-6 md:px-10 py-10">
        <p className="text-white/70 text-lg">Loading product...</p>
      </div>
    );
  }

  const product = data;

  const rawImageUrl =
    product?.image?.[0]?.url ||
    product?.image?.url ||
    null;

  const imageUrl = rawImageUrl
    ? `http://localhost:1338${rawImageUrl}`
    : `https://placehold.co/700x820?text=${encodeURIComponent(product.name || "Product")}`;

  const handleAddToCart = () => {
    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];

    const existingItem = existingCart.find((item) => item.id === product.id);

    let updatedCart;

    if (existingItem) {
      updatedCart = existingCart.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item
      );
    } else {
      updatedCart = [
        ...existingCart,
        {
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          quantity,
          image: imageUrl,
        },
      ];
    }

    localStorage.setItem("cart", JSON.stringify(updatedCart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#05010a] via-[#0b0320] to-[#001a1a] text-white px-6 md:px-10 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-6 text-sm text-white/50">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>
          <span className="mx-2">›</span>
          <span className="text-purple-300">{product.name}</span>
        </div>

        <div className="grid lg:grid-cols-[1fr_1fr] gap-10 items-start">
          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-4 md:p-6">
            <img
              src={imageUrl}
              alt={product.name}
              className="w-full rounded-2xl border border-white/10"
            />

            <div className="grid grid-cols-4 gap-3 mt-4">
              {[1, 2, 3, 4].map((thumb) => (
                <div
                  key={thumb}
                  className="rounded-2xl border border-white/10 bg-black/20 p-2"
                >
                  <img
                    src={imageUrl}
                    alt={`${product.name} thumbnail ${thumb}`}
                    className="w-full rounded-xl"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 md:p-8">
            <p className="uppercase tracking-[0.2em] text-sm text-cyan-300 mb-3">
              Ravesona Product
            </p>

            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
              {product.name}
            </h1>

            <p className="text-white/65 text-lg leading-8 mb-6">
              {product.description || "No description available."}
            </p>

            <div className="flex items-center gap-4 mb-8">
              <span className="text-3xl font-semibold text-white">
                ${Number(product.price || 0).toFixed(2)}
              </span>
              <span className="px-3 py-1 rounded-full border border-purple-400/30 bg-purple-500/10 text-sm text-purple-200">
                Available Now
              </span>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5 mb-8">
              <h2 className="text-xl font-semibold mb-4">Quantity</h2>

              <div className="inline-flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <button
                  onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  -
                </button>

                <span className="min-w-[30px] text-center text-lg">{quantity}</span>

                <button
                  onClick={() => setQuantity((prev) => prev + 1)}
                  className="w-10 h-10 rounded-xl border border-white/10 hover:bg-white/10 transition"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                className="px-6 py-4 rounded-2xl bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold hover:opacity-90 transition"
              >
                Add to Cart
              </button>

              <button className="px-6 py-4 rounded-2xl border border-white/15 text-white hover:bg-white/10 transition">
                Add to Wishlist
              </button>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/20 p-5">
              <h2 className="text-xl font-semibold mb-3">Product Details</h2>
              <ul className="space-y-2 text-white/65">
                <li>• Physical collectible product</li>
                <li>• Designed for the Ravesona experience</li>
                <li>• Great for gifting, collecting, and display</li>
                <li>• Stored in your cart until checkout</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-md shadow-xl p-6 md:p-8">
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-400 text-transparent bg-clip-text">
            Description
          </h2>
          <p className="text-white/70 leading-8">
            {product.description ||
              "This product is part of the Ravesona store experience. More details can be added here later."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Product;