import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Sparkles, TrendingUp, Globe, Box, ArrowRight, Loader2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SourcingResult {
  id: string;
  title: string;
  price: string;
  moq: string;
  supplier: string;
  rating: number;
  image: string;
  source: '1688' | 'Alibaba' | 'Global Sources';
}

const MOCK_RESULTS: SourcingResult[] = [
  { id: 's1', title: 'Smart Home Hub v3', price: '$12.50', moq: '100 units', supplier: 'Shenzhen Tech Co.', rating: 4.8, image: 'https://picsum.photos/seed/hub/200/200', source: '1688' },
  { id: 's2', title: 'Portable Solar Charger', price: '$8.90', moq: '500 units', supplier: 'Guangzhou Energy Ltd.', rating: 4.5, image: 'https://picsum.photos/seed/solar/200/200', source: 'Alibaba' },
  { id: 's3', title: 'Noise Cancelling Headphones', price: '$22.00', moq: '50 units', supplier: 'Dongguan Audio Tech', rating: 4.9, image: 'https://picsum.photos/seed/headphones/200/200', source: 'Global Sources' },
];

export default function Sourcing() {
  const { t } = useLanguage();
  const [query, setQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [results, setResults] = useState<SourcingResult[]>([]);

  const handleSearch = () => {
    if (!query) return;
    setIsSearching(true);
    // Simulate AI Sourcing search
    setTimeout(() => {
      setResults(MOCK_RESULTS);
      setIsSearching(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <h1 className="text-4xl font-bold tracking-tight text-white flex items-center justify-center gap-3">
          <Sparkles className="text-indigo-400" />
          {t('nav_sourcing')}
        </h1>
        <p className="text-white/60 text-lg">
          Find the best suppliers and products globally using our AI-powered sourcing engine.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative flex items-center bg-black/40 backdrop-blur-xl border border-white/10 rounded-2xl p-2">
            <Search className="ml-4 text-white/40" size={24} />
            <input
              type="text"
              placeholder="Describe the product you want to source..."
              className="flex-1 bg-transparent border-none focus:ring-0 text-white text-lg px-4 py-3 placeholder:text-white/20"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button
              onClick={handleSearch}
              disabled={isSearching}
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSearching ? <Loader2 className="animate-spin" size={20} /> : <ArrowRight size={20} />}
              <span>{isSearching ? 'Analyzing...' : 'Source Now'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {results.length > 0 ? (
          results.map((result, idx) => (
            <motion.div
              key={result.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all group"
            >
              <div className="aspect-square relative overflow-hidden">
                <img src={result.image} alt={result.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" referrerPolicy="no-referrer" />
                <div className="absolute top-3 left-3 px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/10">
                  {result.source}
                </div>
              </div>
              <div className="p-4 space-y-3">
                <h3 className="font-semibold text-white line-clamp-1">{result.title}</h3>
                <div className="flex items-center justify-between">
                  <div className="text-xl font-bold text-indigo-400">{result.price}</div>
                  <div className="text-xs text-white/40">MOQ: {result.moq}</div>
                </div>
                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/60">
                  <div className="flex items-center gap-1">
                    <Globe size={12} />
                    {result.supplier}
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    ★ {result.rating}
                  </div>
                </div>
                <button className="w-full mt-2 py-2 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-medium transition-colors border border-white/10">
                  View Details
                </button>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center space-y-4 opacity-40">
            <Box size={48} className="mx-auto" />
            <p>Enter a product description above to start sourcing.</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-indigo-400">
            <TrendingUp size={24} />
            <h2 className="text-xl font-bold">Market Trends</h2>
          </div>
          <p className="text-white/60 text-sm">
            AI analysis shows a 15% increase in demand for eco-friendly electronics this quarter.
          </p>
          <div className="h-2 bg-white/5 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 w-[75%]"></div>
          </div>
        </div>
        <div className="bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-white/10 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-3 text-emerald-400">
            <Globe size={24} />
            <h2 className="text-xl font-bold">Global Logistics</h2>
          </div>
          <p className="text-white/60 text-sm">
            Shipping rates from Ningbo to Los Angeles have stabilized. Recommended route: Sea Freight.
          </p>
          <div className="flex gap-2">
            <span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded text-[10px] font-bold uppercase">Sea</span>
            <span className="px-2 py-1 bg-white/5 text-white/40 rounded text-[10px] font-bold uppercase">Air</span>
          </div>
        </div>
      </div>
    </div>
  );
}
