import React, { useState } from 'react';
import { Bot, X, ChevronDown, ChevronUp, Search, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { faqs } from '../i18n';
import { useLanguage } from '../LanguageContext';

export default function FAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [search, setSearch] = useState('');
  const { language, t } = useLanguage();

  const filteredFaqs = faqs.filter(faq => 
    faq.question[language].toLowerCase().includes(search.toLowerCase()) ||
    faq.answer[language].toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Floating Button (Bottom Right) */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-orange-500 text-white rounded-2xl shadow-2xl flex items-center justify-center hover:scale-110 transition-all z-50 group"
      >
        <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-[10px] flex items-center justify-center font-bold border-2 border-black">30</div>
        {isOpen ? <X size={24} /> : <Bot size={24} className="group-hover:animate-bounce" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[400px] h-[60vh] bg-[#0a0a0a]/95 backdrop-blur-2xl border border-white/10 rounded-[40px] shadow-2xl flex flex-col overflow-hidden z-50"
          >
            {/* Header */}
            <div className="p-8 bg-gradient-to-br from-orange-500/20 to-purple-500/20 border-b border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-orange-500 rounded-2xl text-white shadow-lg shadow-orange-500/20">
                  <Bot size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold tracking-tight">{t('faq_title')}</h2>
                  <p className="text-xs text-gray-400">AI Assistant • {language.toUpperCase()}</p>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text"
                  placeholder={t('faq_search_placeholder')}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 pl-12 pr-4 text-sm focus:ring-2 focus:ring-orange-500/50 transition-all"
                />
              </div>
            </div>

            {/* FAQ List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-3 scrollbar-hide">
              {filteredFaqs.map((faq, i) => (
                <div 
                  key={i} 
                  className={`border border-white/5 rounded-2xl transition-all overflow-hidden ${openIndex === i ? 'bg-white/5 border-white/10' : 'hover:bg-white/[0.02]'}`}
                >
                  <button
                    onClick={() => setOpenIndex(openIndex === i ? null : i)}
                    className="w-full p-4 flex items-center justify-between text-left gap-4"
                  >
                    <span className="text-sm font-medium text-gray-200">{faq.question[language]}</span>
                    {openIndex === i ? <ChevronUp size={16} className="text-orange-400" /> : <ChevronDown size={16} className="text-gray-500" />}
                  </button>
                  <AnimatePresence>
                    {openIndex === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-4 pb-4"
                      >
                        <div className="pt-2 border-t border-white/5 text-xs text-gray-400 leading-relaxed">
                          {faq.answer[language]}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-white/5 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                <Sparkles size={12} className="text-orange-400" />
                {t('faq_powered_by')}
              </div>
              <button className="text-xs text-orange-400 font-bold hover:underline">{t('faq_contact_support')}</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
