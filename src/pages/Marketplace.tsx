import React from 'react';
import { motion } from 'framer-motion';
import { Globe, ShoppingBag, Zap, ShieldCheck, ArrowUpRight, BarChart3, RefreshCw } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface Marketplace {
  id: string;
  name: string;
  status: 'connected' | 'disconnected';
  region: string;
  products: number;
  orders: number;
  revenue: string;
  logo: string;
}

const MARKETPLACES: Marketplace[] = [
  { id: 'm1', name: 'Amazon US', status: 'connected', region: 'North America', products: 124, orders: 1540, revenue: '$45,200', logo: 'https://picsum.photos/seed/amazon/100/100' },
  { id: 'm2', name: 'Shopee SG', status: 'connected', region: 'Southeast Asia', products: 85, orders: 890, revenue: '$12,400', logo: 'https://picsum.photos/seed/shopee/100/100' },
  { id: 'm3', name: 'TikTok Shop UK', status: 'connected', region: 'Europe', products: 45, orders: 320, revenue: '£8,900', logo: 'https://picsum.photos/seed/tiktok/100/100' },
  { id: 'm4', name: 'Lazada MY', status: 'disconnected', region: 'Southeast Asia', products: 0, orders: 0, revenue: '$0', logo: 'https://picsum.photos/seed/lazada/100/100' },
];

export default function Marketplace() {
  const { t } = useLanguage();

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">{t('nav_marketplace')}</h1>
          <p className="text-white/60 mt-1">Connect and manage your global sales channels.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors shadow-lg shadow-indigo-500/20">
          <Zap size={20} />
          <span>Connect New Channel</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">Total Reach</div>
          <div className="text-3xl font-bold text-white">1.2B+</div>
          <div className="text-emerald-400 text-xs flex items-center gap-1">
            <ArrowUpRight size={12} />
            <span>+12% Potential</span>
          </div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">Active Channels</div>
          <div className="text-3xl font-bold text-white">3 / 12</div>
          <div className="text-white/40 text-xs">Global coverage</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">Sync Status</div>
          <div className="text-3xl font-bold text-emerald-400 flex items-center gap-2">
            <RefreshCw size={24} className="animate-spin-slow" />
            <span>Healthy</span>
          </div>
          <div className="text-white/40 text-xs">Last sync: 2m ago</div>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 space-y-2">
          <div className="text-white/40 text-xs font-semibold uppercase tracking-wider">AI Optimization</div>
          <div className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
            <ShieldCheck size={24} />
            <span>Active</span>
          </div>
          <div className="text-white/40 text-xs">Price & Stock auto-sync</div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {MARKETPLACES.map((market, idx) => (
          <motion.div
            key={market.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-white/5 border rounded-2xl p-6 flex items-center gap-6 group transition-all hover:bg-white/10 ${
              market.status === 'connected' ? 'border-white/10' : 'border-white/5 opacity-50 grayscale'
            }`}
          >
            <div className="w-16 h-16 rounded-2xl overflow-hidden border border-white/10 bg-white/5 p-2 flex items-center justify-center">
              <img src={market.logo} alt={market.name} className="w-full h-full object-contain" referrerPolicy="no-referrer" />
            </div>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-white">{market.name}</h3>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  market.status === 'connected' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-white/10 text-white/40'
                }`}>
                  {market.status}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-white/40">
                <Globe size={12} />
                {market.region}
              </div>
              <div className="grid grid-cols-3 gap-4 pt-4">
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Products</div>
                  <div className="text-sm font-bold text-white/80">{market.products}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Orders</div>
                  <div className="text-sm font-bold text-white/80">{market.orders}</div>
                </div>
                <div>
                  <div className="text-[10px] text-white/40 uppercase font-semibold">Revenue</div>
                  <div className="text-sm font-bold text-indigo-400">{market.revenue}</div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <button className="p-2 bg-white/5 hover:bg-indigo-600 text-white/40 hover:text-white rounded-lg transition-all">
                <BarChart3 size={18} />
              </button>
              <button className="p-2 bg-white/5 hover:bg-white/10 text-white/40 hover:text-white rounded-lg transition-all">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="bg-indigo-600/10 border border-indigo-500/20 rounded-2xl p-8 flex flex-col md:flex-row items-center gap-8">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold text-white">Expand Your Reach with AI</h2>
          <p className="text-white/60">
            Our AI engine can automatically translate your listings and optimize them for local search algorithms in over 50 countries.
          </p>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-indigo-400">
              <ShieldCheck size={16} />
              <span>Auto-Translation</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-400">
              <ShieldCheck size={16} />
              <span>Local SEO Optimization</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-indigo-400">
              <ShieldCheck size={16} />
              <span>Currency Conversion</span>
            </div>
          </div>
        </div>
        <button className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold transition-all shadow-xl shadow-indigo-500/20 whitespace-nowrap">
          Start AI Expansion
        </button>
      </div>
    </div>
  );
}
