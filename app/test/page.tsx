"use client";

import { useState } from "react";
import { useCart } from "@/app/context/CartContext";

// TEST PRODUCT VARIANT ID - "test product" variant
// Product: https://admin.shopify.com/store/conka-6770/products/15528858517878
const TEST_VARIANT_ID = "gid://shopify/ProductVariant/57000920056182";

export default function TestPage() {
  const { addToCart, loading, error, cart } = useCart();
  const [status, setStatus] = useState<string>("");

  const handleAddToCart = async () => {
    setStatus("Adding to cart...");
    try {
      await addToCart(TEST_VARIANT_ID, 1);
      setStatus("✅ Added to cart successfully!");
    } catch (err) {
      setStatus(`❌ Error: ${err instanceof Error ? err.message : "Unknown error"}`);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">🧪 Checkout Test Page</h1>
        
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Test Product ($0.00)</h2>
          <p className="text-gray-400 mb-4">
            This is a test product to verify the Shopify checkout integration.
          </p>
          
          <div className="mb-4 p-3 bg-gray-700 rounded text-sm font-mono">
            <p className="text-gray-400">Variant ID:</p>
            <p className="text-yellow-400 break-all">{TEST_VARIANT_ID}</p>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={loading || TEST_VARIANT_ID.includes("PLACEHOLDER")}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white font-bold py-3 px-6 rounded-lg transition-colors"
          >
            {loading ? "Adding..." : "Add to Cart"}
          </button>

          {TEST_VARIANT_ID.includes("PLACEHOLDER") && (
            <p className="mt-3 text-yellow-500 text-sm">
              ⚠️ Please update TEST_VARIANT_ID with your Shopify variant ID
            </p>
          )}
        </div>

        {/* Status */}
        {status && (
          <div className={`p-4 rounded-lg mb-6 ${
            status.includes("✅") ? "bg-green-900/50" : 
            status.includes("❌") ? "bg-red-900/50" : 
            "bg-blue-900/50"
          }`}>
            <p>{status}</p>
          </div>
        )}

        {/* Error from context */}
        {error && (
          <div className="p-4 bg-red-900/50 rounded-lg mb-6">
            <p className="text-red-400">Cart Error: {error}</p>
          </div>
        )}

        {/* Cart info */}
        {cart && (
          <div className="bg-gray-800 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-3">Cart Contents</h3>
            <div className="space-y-2 text-sm">
              <p>Cart ID: <span className="text-gray-400 font-mono text-xs break-all">{cart.id}</span></p>
              <p>Total Items: <span className="text-green-400">{cart.totalQuantity}</span></p>
              <p>Total: <span className="text-green-400">£{cart.cost.totalAmount.amount}</span></p>
              
              {cart.lines.edges.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-700">
                  <p className="font-semibold mb-2">Items:</p>
                  {cart.lines.edges.map((edge) => (
                    <div key={edge.node.id} className="p-2 bg-gray-700 rounded mb-2">
                      <p className="font-medium">{edge.node.merchandise.product.title}</p>
                      <p className="text-gray-400 text-xs">{edge.node.merchandise.title}</p>
                      <p className="text-gray-400">Qty: {edge.node.quantity}</p>
                    </div>
                  ))}
                </div>
              )}

              <a
                href={cart.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 block w-full text-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors"
              >
                → Proceed to Checkout
              </a>
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg text-sm text-gray-400">
          <h4 className="font-semibold text-white mb-2">How to use:</h4>
          <ol className="list-decimal list-inside space-y-1">
            <li>Get the variant ID from Shopify Admin</li>
            <li>Update TEST_VARIANT_ID in this file</li>
            <li>Click &quot;Add to Cart&quot;</li>
            <li>Click &quot;Proceed to Checkout&quot;</li>
            <li>Complete the $0 test checkout</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

