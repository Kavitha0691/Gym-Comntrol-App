'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { useCart } from '@/contexts/CartContext';
import { shopProducts } from '@/lib/data/memberData';
import { useState } from 'react';

export default function ShopPage() {
  const { t } = useLanguage();
  const { cart, addToCart, removeFromCart, updateQuantity, getCartTotal, getCartItemCount } = useCart();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showCart, setShowCart] = useState(false);

  const categories = ['all', 'apparel', 'equipment', 'supplements', 'accessories'];

  const filteredProducts = shopProducts.filter(
    (product) => categoryFilter === 'all' || product.category === categoryFilter
  );

  const handleAddToCart = (product: typeof shopProducts[0]) => {
    addToCart(product);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t.webShop.title}</h1>
        <p className="text-gray-600 mt-2">{t.webShop.subtitle}</p>
      </div>

      {/* Category Filter */}
      <Card className="mb-6">
        <div className="flex gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setCategoryFilter(category)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                categoryFilter === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category === 'all'
                ? t.webShop.categories.all
                : t.webShop.categories[category as keyof typeof t.webShop.categories]}
            </button>
          ))}
        </div>
      </Card>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="hover:shadow-lg transition-shadow">
            {/* Product Image Placeholder */}
            <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-48 flex items-center justify-center mb-4">
              <span className="text-6xl">
                {product.category === 'apparel' && '👕'}
                {product.category === 'equipment' && '🏋️'}
                {product.category === 'supplements' && '💊'}
                {product.category === 'accessories' && '🎒'}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>

            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-blue-600">{product.price} kr</span>
              <span
                className={`text-xs font-semibold px-2 py-1 rounded-full ${
                  product.inStock
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}
              >
                {product.inStock ? t.webShop.inStock : t.webShop.outOfStock}
              </span>
            </div>

            {product.inStock && (
              <p className="text-xs text-gray-500 mb-4">
                {product.stock} {t.webShop.inStock.toLowerCase()}
              </p>
            )}

            <button
              onClick={() => handleAddToCart(product)}
              disabled={!product.inStock}
              className={`w-full px-4 py-2 rounded-lg font-medium transition-colors ${
                product.inStock
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {t.webShop.addToCart}
            </button>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">{t.common.noResults}</p>
          </div>
        </Card>
      )}

      {/* Cart Button */}
      {getCartItemCount() > 0 && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setShowCart(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
          >
            <span>🛒</span>
            {t.webShop.viewCart} ({getCartItemCount()})
          </button>
        </div>
      )}

      {/* Cart Modal */}
      {showCart && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900">{t.webShop.cart}</h2>
              <button
                onClick={() => setShowCart(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">{t.common.noResults}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.product.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-3xl">
                        {item.product.category === 'apparel' && '👕'}
                        {item.product.category === 'equipment' && '🏋️'}
                        {item.product.category === 'supplements' && '💊'}
                        {item.product.category === 'accessories' && '🎒'}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{item.product.name}</h3>
                        <p className="text-sm text-gray-600">{item.product.price} kr</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-gray-900">{item.product.price * item.quantity} kr</p>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-sm text-red-600 hover:text-red-700"
                        >
                          {t.common.delete}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-gray-200">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold">{t.webShop.total}:</span>
                  <span className="text-2xl font-bold text-blue-600">{getCartTotal()} kr</span>
                </div>
                <button className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  {t.webShop.checkout}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
