import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, ShoppingCart, Globe, Settings, Menu, X, Rocket, ChevronDown, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useLanguage } from '../LanguageContext';
import { languages } from '../i18n';
import Chat from './Chat';
import FAQ from './FAQ';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const location = useLocation();
  const { language, setLanguage, t } = useLanguage();

  const navItems = [
    { name: t('nav_dashboard'), icon: LayoutDashboard, path: '/' },
    { name: t('nav_growth'), icon: Rocket, path: '/growth' },
    { name: t('nav_pim'), icon: Package, path: '/pim' },
    { name: t('nav_oms'), icon: ShoppingCart, path: '/oms' },
    { name: t('nav_marketplace'), icon: Globe, path: '/marketplace' },
    { name: t('nav_sourcing'), icon: Globe, path: '/sourcing' },
    { name: t('nav_b2b'), icon: Settings, path: '/b2b' },
  ];

  const currentLang = languages.find(l => l.code === language);

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col overflow-hidden font-sans">
      {/* Header */}
      <header className="h-20 bg-[#0a0a0a]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40 flex items-center justify-between px-4 md:px-8">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="md:hidden p-2 text-gray-400 hover:text-white"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#1428A0] to-purple-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/20">
              <Sparkles className="text-white" size={20} />
            </div>
            <h1 className="text-lg md:text-xl font-bold tracking-tight text-white hidden sm:block">
              {t('header_title')}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {/* Language Switcher */}
          <div className="relative">
            <button 
              onClick={() => setIsLangOpen(!isLangOpen)}
              className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-sm font-medium"
            >
              <span className="text-lg">{currentLang?.flag}</span>
              <span className="hidden sm:inline">{currentLang?.name}</span>
              <ChevronDown size={14} className={`transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {isLangOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute top-full right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 p-2 grid grid-cols-1 gap-1"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setIsLangOpen(false);
                      }}
                      className={`flex items-center gap-3 px-3 py-2 rounded-xl text-sm transition-all ${
                        language === lang.code ? 'bg-blue-600 text-white' : 'hover:bg-white/5 text-gray-400'
                      }`}
                    >
                      <span className="text-lg">{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 text-emerald-400 rounded-2xl text-xs font-bold uppercase tracking-widest border border-emerald-500/20">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            {t('header_live')}
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar (Desktop) */}
        <aside className="hidden md:flex w-72 bg-[#0a0a0a] border-r border-white/5 flex-col p-6">
          <nav className="space-y-2 flex-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all group ${
                  location.pathname === item.path
                    ? 'bg-[#1428A0] text-white shadow-lg shadow-blue-600/20'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
              >
                <item.icon size={20} className={location.pathname === item.path ? 'text-white' : 'text-gray-500 group-hover:text-blue-400'} />
                <span className="font-bold text-sm">{item.name}</span>
              </Link>
            ))}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-10 scrollbar-hide">
          <div className="max-w-7xl mx-auto">
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>
      </div>

      {/* Floating Components */}
      <Chat />
      <FAQ />

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/90 backdrop-blur-xl border-t border-white/5 px-6 py-3 flex justify-between items-center z-40">
        {navItems.slice(0, 4).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center gap-1 ${
              location.pathname === item.path ? 'text-blue-500' : 'text-gray-500'
            }`}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold">{item.name}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
