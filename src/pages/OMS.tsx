import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, MoreVertical, ShoppingCart, User, Calendar, CreditCard, Ship, CheckCircle, XCircle } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Order {
  id: string;
  customer: string;
  total: number;
  status: 'paid' | 'shipped' | 'cancelled';
  date: string;
  items: number;
  market: string;
}

const MOCK_ORDERS: Order[] = [
  { id: 'ORD-2024-001', customer: 'John Doe', total: 299.99, status: 'shipped', date: '2024-03-20', items: 1, market: 'Amazon' },
  { id: 'ORD-2024-002', customer: 'Jane Smith', total: 129.50, status: 'paid', date: '2024-03-21', items: 2, market: 'Shopee' },
  { id: 'ORD-2024-003', customer: 'Robert Brown', total: 89.00, status: 'cancelled', date: '2024-03-19', items: 1, market: 'TikTok Shop' },
  { id: 'ORD-2024-004', customer: 'Emily White', total: 450.00, status: 'paid', date: '2024-03-21', items: 1, market: 'Amazon' },
];

export default function OMS() {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredOrders = MOCK_ORDERS.filter(o => 
    o.id.toLowerCase().includes(searchTerm.toLowerCase()) || 
    o.customer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle size={14} className="text-emerald-400" />;
      case 'shipped': return <Ship size={14} className="text-indigo-400" />;
      case 'cancelled': return <XCircle size={14} className="text-rose-400" />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'paid': return t('dash_paid');
      case 'shipped': return t('dash_shipped');
      case 'cancelled': return t('dash_cancelled');
      default: return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t('nav_oms')}</h1>
          <p className="text-white/60 mt-1">Track and manage global orders across all marketplaces.</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white rounded-lg hover:bg-white/10 transition-all">
            <Calendar size={20} />
            <span>Last 30 Days</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="relative flex-1 md:col-span-2">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={20} />
          <input
            type="text"
            placeholder={t('oms_search')}
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
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('oms_order_id')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('oms_customer')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">Market</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('oms_total')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('pim_status')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider">{t('oms_date')}</th>
                <th className="p-4 text-xs font-semibold text-white/40 uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredOrders.map((order) => (
                <motion.tr
                  key={order.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="p-4 text-sm text-white font-mono">{order.id}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <User size={14} className="text-white/40" />
                      <span className="text-sm text-white/80">{order.customer}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="text-xs text-white/60">{order.market}</span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-1 text-sm font-medium text-white/80">
                      <CreditCard size={14} className="text-white/40" />
                      ${order.total.toFixed(2)}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(order.status)}
                      <span className="text-sm text-white/80">{getStatusLabel(order.status)}</span>
                    </div>
                  </td>
                  <td className="p-4 text-sm text-white/40">{order.date}</td>
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
