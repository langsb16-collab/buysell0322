import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Package, Tag, DollarSign, Activity } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Product {
  id: string;
  name: string;
  sku: string;
  price: number;
  stock: number;
  status: 'active' | 'draft';
  category: string;
  image: string;
}

const MOCK_PRODUCTS: Product[] = [
  { id: '1', name: 'AI Smart Watch Pro', sku: 'SW-001', price: 299.99, stock: 150, status: 'active', category: 'Electronics', image: 'https://picsum.photos/seed/watch/100/100' },
  { id: '2', name: 'Wireless Earbuds X', sku: 'EB-002', price: 129.50, stock: 45, status: 'active', category: 'Audio', image: 'https://picsum.photos/seed/earbuds/100/100' },
  { id: '3', name: 'Ergonomic Keyboard', sku: 'KB-003', price: 89.00, stock: 12, status: 'draft', category: 'Peripherals', image: 'https://picsum.photos/seed/keyboard/100/100' },
  { id: '4', name: '4K Ultra Monitor', sku: 'MN-004', price: 450.00, stock: 8, status: 'active', category: 'Electronics', image: 'https://picsum.photos/seed/monitor/100/100' },
];

export default function PIM() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = MOCK_PRODUCTS.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t('nav_pim')}</h1>
          <p className="text-white/60 mt-1">Manage your global product catalog and inventory.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
          <Plus size={20} />
          <span>{t('pim_add_product')}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative flex-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            placeholder={t('pim_search')}
            className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-xl hover:bg-white/10 transition-all">
          <Filter size={20} />
          <span>Filters</span>
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-bottom border-white/10 bg-white/5">
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Product</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">SKU</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('pim_stock')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('pim_price')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('pim_status')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredProducts.map((product) => (
                <motion.tr
                  key={product.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-cover border border-white/10" referrerPolicy="no-referrer" />
                      <div>
                        <div className="font-medium text-white">{product.name}</div>
                        <div className="text-xs text-white/40">{product.category}</div>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/60 font-mono">{product.sku}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Package size={14} className="text-white/40" />
                      <span className={`text-sm font-medium ${product.stock < 20 ? 'text-amber-400' : 'text-white/80'}`}>
                        {product.stock}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-white/80">
                      <DollarSign size={14} className="text-white/40" />
                      {product.price.toFixed(2)}
                    </div>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      product.status === 'active' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' 
                        : 'bg-white/10 text-white/40 border border-white/10'
                    }`}>
                      {product.status === 'active' ? t('pim_active') : t('pim_draft')}
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="p-2 text-white/40 hover:text-white transition-colors">
                      <MoreVertical size={20} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
