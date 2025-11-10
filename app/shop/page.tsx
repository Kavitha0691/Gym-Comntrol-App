'use client';

import Card from '@/components/Card';
import { useLanguage } from '@/contexts/LanguageContext';
import { shopProducts } from '@/lib/data/memberData';
import { useState } from 'react';

export default function ShopPage() {
  const { t } = useLanguage();
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  const categories = ['all', 'apparel', 'equipment', 'supplements', 'accessories'];

  const filteredProducts = shopProducts.filter(
    (product) => categoryFilter === 'all' || product.category === categoryFilter
  );

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
      <div className="fixed bottom-6 right-6">
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2">
          <span>🛒</span>
          {t.webShop.viewCart} (0)
        </button>
      </div>
    </div>
  );
}
