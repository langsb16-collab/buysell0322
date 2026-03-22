import React from 'react';
import { TrendingUp, ShoppingBag, Package, DollarSign, ArrowUpRight, ArrowDownRight, Rocket, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useLanguage } from '../LanguageContext';

const data = [
  { name: 'Mon', sales: 4000 },
  { name: 'Tue', sales: 3000 },
  { name: 'Wed', sales: 2000 },
  { name: 'Thu', sales: 2780 },
  { name: 'Fri', sales: 1890 },
  { name: 'Sat', sales: 2390 },
  { name: 'Sun', sales: 3490 },
];

export default function Dashboard() {
  const { t } = useLanguage();

  const stats = [
    { title: t('dash_total_sales'), value: '$12,340', change: '+12.5%', icon: DollarSign, color: 'blue' },
    { title: t('dash_new_orders'), value: '320', change: '+8.2%', icon: ShoppingBag, color: 'purple' },
    { title: t('dash_total_stock'), value: '1,200', change: '-2.4%', icon: Package, color: 'emerald' },
    { title: t('dash_automation_rate'), value: '92%', change: '+1.5%', icon: Rocket, color: 'orange' },
  ];

  return (
    <div className="space-y-4 md:space-y-6">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-none">
            {t('nav_dashboard')}
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">{t('dash_welcome')}</p>
        </div>
        <div className="flex gap-2 md:gap-3 w-full md:w-auto">
          <button className="flex-1 md:flex-none px-4 py-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all text-xs font-bold uppercase tracking-widest">
            {t('dash_download')}
          </button>
          <button className="flex-1 md:flex-none px-4 py-2 bg-[#1428A0] hover:bg-blue-700 rounded-xl transition-all text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2">
            <Sparkles size={14} />
            {t('dash_sync')}
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 p-4 md:p-6 rounded-2xl relative overflow-hidden group hover:border-white/10 transition-all"
          >
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${stat.color}-500/5 blur-2xl -z-10 group-hover:bg-${stat.color}-500/10 transition-all`} />
            <div className="flex justify-between items-start">
              <div className={`p-2.5 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-400`}>
                <stat.icon size={20} />
              </div>
              <div className={`flex items-center text-[10px] font-bold uppercase tracking-wider ${stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'}`}>
                {stat.change}
                {stat.change.startsWith('+') ? <ArrowUpRight size={12} className="ml-1" /> : <ArrowDownRight size={12} className="ml-1" />}
              </div>
            </div>
            <div className="mt-4">
              <h3 className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{stat.title}</h3>
              <p className="text-2xl md:text-3xl font-bold mt-1">{stat.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-8">
        <div className="lg:col-span-2 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[32px]">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <h2 className="text-lg md:text-xl font-bold">{t('dash_sales_overview')}</h2>
            <select className="bg-white/5 border border-white/10 rounded-xl px-3 py-1.5 text-xs outline-none focus:border-blue-500/50 transition-all font-bold">
              <option>{t('dash_last_7_days')}</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[250px] md:h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1428A0" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1428A0" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                <XAxis dataKey="name" stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} dy={10} />
                <YAxis stroke="#ffffff40" fontSize={10} tickLine={false} axisLine={false} dx={-10} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0a0a0a', border: '1px solid #ffffff10', borderRadius: '16px', fontSize: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="sales" stroke="#1428A0" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 p-6 md:p-8 rounded-[32px]">
          <h2 className="text-lg md:text-xl font-bold mb-6">{t('dash_recent_orders')}</h2>
          <div className="space-y-4 md:space-y-6">
            {[
              { id: '#ORD-001', market: 'Amazon', status: 'Paid', amount: '$120.50', time: '2m ago' },
              { id: '#ORD-002', market: 'Shopee', status: 'Shipped', amount: '$45.00', time: '15m ago' },
              { id: '#ORD-003', market: 'Coupang', status: 'Paid', amount: '$89.90', time: '1h ago' },
              { id: '#ORD-004', market: 'Amazon', status: 'Cancelled', amount: '$210.00', time: '3h ago' },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between group cursor-pointer">
                <div className="flex items-center gap-3 md:gap-4">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-white/10 transition-all">
                    <ShoppingBag size={16} className="text-gray-400" />
                  </div>
                  <div>
                    <p className="font-bold text-xs md:text-sm">{order.id}</p>
                    <p className="text-[10px] text-gray-500 font-medium">{order.market} • {order.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-xs md:text-sm">{order.amount}</p>
                  <p className={`text-[9px] font-bold uppercase tracking-wider ${
                    order.status === 'Paid' ? 'text-emerald-400' : 
                    order.status === 'Shipped' ? 'text-blue-400' : 'text-red-400'
                  }`}>{
                    order.status === 'Paid' ? t('dash_paid') : 
                    order.status === 'Shipped' ? t('dash_shipped') : t('dash_cancelled')
                  }</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 md:mt-8 py-3 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-all text-gray-500 hover:text-white">
            {t('dash_view_all')}
          </button>
        </div>
      </div>
    </div>
  );
}
