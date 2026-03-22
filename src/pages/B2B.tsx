import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, 
  Truck, 
  CreditCard, 
  Package, 
  ArrowUpRight, 
  CheckCircle2,
  Building2,
  Globe,
  Zap
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const B2B = () => {
  const { t } = useLanguage();

  const tiers = [
    { name: 'Silver', discount: '5%', threshold: '$1,000', active: true },
    { name: 'Gold', discount: '12%', threshold: '$5,000', active: false },
    { name: 'Platinum', discount: '20%', threshold: '$20,000', active: false },
  ];

  const products = [
    {
      id: 1,
      name: 'Smart Watch Ultra',
      sku: 'SW-001',
      moq: 50,
      price: 45.00,
      image: 'https://picsum.photos/seed/watch/400/400'
    },
    {
      id: 2,
      name: 'Wireless Earbuds Pro',
      sku: 'WE-002',
      moq: 100,
      price: 28.50,
      image: 'https://picsum.photos/seed/audio/400/400'
    },
    {
      id: 3,
      name: 'Portable Power Bank',
      sku: 'PB-003',
      moq: 30,
      price: 15.75,
      image: 'https://picsum.photos/seed/power/400/400'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white mb-2">{t('nav_b2b')}</h1>
          <p className="text-zinc-400">{t('b2b_welcome')}</p>
        </div>
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-md">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Shield className="w-5 h-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">{t('b2b_tier')}</p>
            <p className="text-white font-bold">Silver Partner</p>
          </div>
          <button className="ml-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
            {t('b2b_upgrade')}
          </button>
        </div>
      </div>

      {/* Tier Progress */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiers.map((tier) => (
          <motion.div
            key={tier.name}
            whileHover={{ y: -5 }}
            className={`p-6 rounded-2xl border backdrop-blur-xl transition-all ${
              tier.active 
                ? 'bg-blue-600/10 border-blue-500/50 shadow-lg shadow-blue-500/10' 
                : 'bg-white/5 border-white/10 hover:border-white/20'
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-bold text-white">{tier.name}</h3>
              {tier.active && (
                <span className="px-2 py-1 bg-blue-500 text-[10px] font-bold uppercase tracking-widest rounded-md text-white">
                  Active
                </span>
              )}
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Discount</span>
                <span className="text-white font-bold">{tier.discount}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-zinc-400">Threshold</span>
                <span className="text-white font-bold">{tier.threshold}</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bulk Products */}
      <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden backdrop-blur-xl">
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">B2B Inventory</h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 transition-all">
              Export CSV
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-white/5 text-zinc-500 text-xs uppercase tracking-wider font-semibold">
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">SKU</th>
                <th className="px-6 py-4">{t('b2b_moq')}</th>
                <th className="px-6 py-4">B2B Price</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {products.map((product) => (
                <tr key={product.id} className="hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-10 h-10 rounded-lg object-cover border border-white/10"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-white font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-zinc-400 font-mono text-sm">{product.sku}</td>
                  <td className="px-6 py-4 text-white">{product.moq} units</td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-white font-bold">${product.price.toFixed(2)}</span>
                      <span className="text-[10px] text-zinc-500 line-through">${(product.price * 1.2).toFixed(2)}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-2 px-4 py-2 bg-white text-black text-sm font-bold rounded-lg hover:bg-zinc-200 transition-all">
                      <Package className="w-4 h-4" />
                      {t('b2b_bulk_order')}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* B2B Services */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-8 rounded-3xl bg-gradient-to-br from-blue-600/20 to-purple-600/20 border border-white/10 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/20 flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{t('b2b_reseller_api')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {t('b2b_reseller_api_desc')}
          </p>
          <button className="flex items-center gap-2 text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors group">
            Documentation <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-white/10 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 flex items-center justify-center mb-6">
            <CreditCard className="w-6 h-6 text-purple-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{t('b2b_credit_line')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {t('b2b_credit_line_desc')}
          </p>
          <button className="flex items-center gap-2 text-purple-400 text-sm font-bold hover:text-purple-300 transition-colors group">
            Apply Now <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>

        <div className="p-8 rounded-3xl bg-gradient-to-br from-emerald-600/20 to-teal-600/20 border border-white/10 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 flex items-center justify-center mb-6">
            <Zap className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="text-xl font-bold text-white mb-3">{t('b2b_white_label')}</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            {t('b2b_white_label_desc')}
          </p>
          <button className="flex items-center gap-2 text-emerald-400 text-sm font-bold hover:text-emerald-300 transition-colors group">
            Learn More <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default B2B;
