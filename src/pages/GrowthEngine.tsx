import React, { useState, useEffect } from 'react';
import { Rocket, Zap, TrendingUp, BarChart3, Loader2, CheckCircle, AlertCircle, Play, Pause, RefreshCw, Video, MessageSquare, Sparkles, Calculator, ArrowRight, PlayCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { useLanguage } from '../LanguageContext';

const automationTasks = (t: any) => [
  { id: 'trend', name: t('nav_growth'), description: 'Analyze global search volume and growth rates to find hot products.', icon: TrendingUp, color: 'blue' },
  { id: 'source', name: 'Auto Sourcing (1688)', description: 'Automatically find and import products from 1688 based on trends.', icon: Zap, color: 'purple' },
  { id: 'listing', name: 'Amazon/TikTok Listing', description: 'Generate AI descriptions and upload listings to marketplaces.', icon: Rocket, color: 'emerald' },
  { id: 'ads', name: 'PPC Ad Optimization', description: 'Auto-adjust bids and budgets based on ROAS performance.', icon: BarChart3, color: 'orange' },
];

const aiEngineFeatures = (t: any) => [
  { id: 'video', name: 'TikTok Video Gen', icon: Video, color: 'pink' },
  { id: 'review', name: 'Review Analysis', icon: MessageSquare, color: 'blue' },
  { id: 'branding', name: 'White Label AI', icon: Sparkles, color: 'purple' },
  { id: 'sim', name: 'Revenue Sim', icon: Calculator, color: 'emerald' },
];

export default function GrowthEngine() {
  const { t } = useLanguage();
  const [runningTask, setRunningTask] = useState<string | null>(null);
  const [completedTasks, setCompletedTasks] = useState<Record<string, any>>({});
  const [trends, setTrends] = useState<any[]>([]);
  const [activeAIFeature, setActiveAIFeature] = useState('video');
  const [aiResult, setAiResult] = useState<any>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const tasks = automationTasks(t);
  const features = aiEngineFeatures(t);

  useEffect(() => {
    fetch('/api/trends')
      .then(res => res.json())
      .then(setTrends);
  }, []);

  const runTask = async (taskId: string) => {
    setRunningTask(taskId);
    try {
      const res = await fetch('/api/automation/run', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskId }),
      });
      const data = await res.json();
      setCompletedTasks(prev => ({ ...prev, [taskId]: data.results }));
    } catch (error) {
      console.error('Task failed:', error);
    } finally {
      setRunningTask(null);
    }
  };

  const runAIEngine = async (featureId: string) => {
    setIsAiLoading(true);
    setAiResult(null);
    setActiveAIFeature(featureId);

    const endpoints: Record<string, string> = {
      video: '/api/ai/generate-video',
      review: '/api/ai/analyze-reviews',
      branding: '/api/ai/branding',
      sim: '/api/ai/simulate',
    };

    const payloads: Record<string, any> = {
      video: { productId: 'P-001' },
      review: { productId: 'P-001' },
      branding: { productName: 'Premium Wireless Earbuds' },
      sim: { price: 49.99, cost: 15.00, traffic: 5000, conversionRate: 2.5 },
    };

    try {
      const res = await fetch(endpoints[featureId], {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloads[featureId]),
      });
      const data = await res.json();
      setAiResult(data);
    } catch (error) {
      console.error('AI Engine failed:', error);
    } finally {
      setIsAiLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <header className="flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">{t('growth_title')}</h1>
          <p className="text-gray-400 mt-2">{t('growth_desc')}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => runTask('all')}
            disabled={!!runningTask}
            className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl transition-all text-sm font-bold shadow-lg shadow-blue-600/20 flex items-center gap-2"
          >
            {runningTask === 'all' ? <Loader2 size={18} className="animate-spin" /> : <Rocket size={18} />}
            {t('growth_run_all')}
          </button>
        </div>
      </header>

      {/* Automation Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tasks.map((task) => (
          <div key={task.id} className="bg-[#0a0a0a] border border-white/5 p-6 rounded-3xl relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-24 h-24 bg-${task.color}-500/5 blur-2xl -z-10`} />
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-xl bg-${task.color}-500/10 text-${task.color}-400`}>
                <task.icon size={24} />
              </div>
              {completedTasks[task.id] ? (
                <div className="flex items-center gap-1 text-emerald-400 text-[10px] font-bold uppercase">
                  <CheckCircle size={12} />
                  Synced
                </div>
              ) : (
                <div className="flex items-center gap-1 text-gray-500 text-[10px] font-bold uppercase">
                  <RefreshCw size={12} />
                  Ready
                </div>
              )}
            </div>
            <h3 className="font-bold text-lg">{task.name}</h3>
            <p className="text-xs text-gray-500 mt-2 leading-relaxed">{task.description}</p>
            
            <button
              onClick={() => runTask(task.id)}
              disabled={!!runningTask}
              className="w-full mt-6 py-2.5 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
            >
              {runningTask === task.id ? <Loader2 size={14} className="animate-spin" /> : <Play size={14} />}
              {runningTask === task.id ? t('growth_running') : t('growth_execute')}
            </button>
          </div>
        ))}
      </div>

      {/* AI Business Engine Section */}
      <div className="bg-[#0a0a0a] border border-white/5 rounded-[40px] p-10 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/5 to-purple-500/5 -z-10" />
        <div className="flex flex-col lg:flex-row gap-12">
          <div className="lg:w-1/3 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 text-blue-400 rounded-full text-[10px] font-bold uppercase tracking-wider mb-4">
                <Sparkles size={12} />
                {t('growth_ai_engine')}
              </div>
              <h2 className="text-3xl font-bold tracking-tight">{t('growth_ai_driven')}</h2>
              <p className="text-gray-400 mt-4 leading-relaxed">
                {t('growth_ai_desc')}
              </p>
            </div>

            <div className="space-y-2">
              {features.map((feature) => (
                <button
                  key={feature.id}
                  onClick={() => runAIEngine(feature.id)}
                  className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                    activeAIFeature === feature.id 
                      ? `bg-${feature.color}-500/10 border-${feature.color}-500/30 text-${feature.color}-400` 
                      : 'bg-white/5 border-transparent text-gray-400 hover:bg-white/10'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <feature.icon size={20} />
                    <span className="font-bold text-sm">{feature.name}</span>
                  </div>
                  <ArrowRight size={16} />
                </button>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 bg-black/40 border border-white/5 rounded-3xl p-8 min-h-[400px] flex flex-col">
            <AnimatePresence mode="wait">
              {isAiLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex-1 flex flex-col items-center justify-center space-y-4"
                >
                  <Loader2 size={48} className="animate-spin text-blue-500" />
                  <p className="text-gray-500 font-medium animate-pulse">AI is processing data...</p>
                </motion.div>
              ) : aiResult ? (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex-1 space-y-6"
                >
                  {activeAIFeature === 'video' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="aspect-[9/16] bg-white/5 rounded-2xl overflow-hidden relative group">
                        <img src={aiResult.thumbnail} alt="Video Thumbnail" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                          <PlayCircle size={64} className="text-white" />
                        </div>
                        <div className="absolute bottom-4 left-4 right-4 p-3 bg-black/60 backdrop-blur-md rounded-xl text-xs">
                          <p className="font-bold">TikTok_Ad_001.mp4</p>
                          <p className="text-gray-400 mt-1">Duration: {aiResult.duration} • {aiResult.platform}</p>
                        </div>
                      </div>
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold">TikTok Video Generated</h3>
                        <p className="text-sm text-gray-400">AI has analyzed the product features and generated a 15-second viral-style short video optimized for TikTok algorithms.</p>
                        <div className="space-y-3">
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                            <span className="text-gray-500 block mb-1">AI Hook</span>
                            "You won't believe how this changed my daily routine..."
                          </div>
                          <div className="p-3 bg-white/5 rounded-xl border border-white/5 text-xs">
                            <span className="text-gray-500 block mb-1">Call to Action</span>
                            "Link in bio! 50% off for the next 24 hours."
                          </div>
                        </div>
                        <button className="w-full py-4 bg-pink-600 hover:bg-pink-500 rounded-2xl font-bold transition-all shadow-lg shadow-pink-600/20">
                          Upload to TikTok
                        </button>
                      </div>
                    </div>
                  )}

                  {activeAIFeature === 'review' && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold">Amazon Review Analysis</h3>
                        <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-xs font-bold">
                          {aiResult.sentiment}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                          <h4 className="text-emerald-400 font-bold text-sm mb-4">Key Strengths</h4>
                          <ul className="space-y-2">
                            {aiResult.pros.map((pro: string) => (
                              <li key={pro} className="text-xs flex items-center gap-2">
                                <CheckCircle size={14} className="text-emerald-500" />
                                {pro}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-6 bg-red-500/5 border border-red-500/10 rounded-2xl">
                          <h4 className="text-red-400 font-bold text-sm mb-4">Pain Points</h4>
                          <ul className="space-y-2">
                            {aiResult.cons.map((con: string) => (
                              <li key={con} className="text-xs flex items-center gap-2">
                                <AlertCircle size={14} className="text-red-500" />
                                {con}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="p-6 bg-blue-500/5 border border-blue-500/10 rounded-2xl">
                        <h4 className="text-blue-400 font-bold text-sm mb-2">AI Recommendation</h4>
                        <p className="text-sm text-gray-300 leading-relaxed">{aiResult.recommendation}</p>
                      </div>
                    </div>
                  )}

                  {activeAIFeature === 'branding' && (
                    <div className="space-y-8">
                      <div className="text-center">
                        <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                          {aiResult.brandName}
                        </h3>
                        <p className="text-gray-500 italic mt-2">"{aiResult.tagline}"</p>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                        <div className="aspect-video bg-white/5 rounded-2xl border border-white/10 flex items-center justify-center p-8">
                          <div className="w-full h-full border-2 border-dashed border-gray-700 rounded-xl flex items-center justify-center text-gray-700 font-bold text-2xl">
                            LOGO PREVIEW
                          </div>
                        </div>
                        <div className="space-y-4">
                          <h4 className="font-bold text-sm uppercase tracking-widest text-purple-400">Packaging Concept</h4>
                          <p className="text-sm text-gray-400 leading-relaxed">{aiResult.concept}</p>
                          <div className="flex gap-2">
                            <div className="w-8 h-8 rounded-full bg-[#1a1a1a] border border-white/10" />
                            <div className="w-8 h-8 rounded-full bg-[#f5f5f5] border border-white/10" />
                            <div className="w-8 h-8 rounded-full bg-[#d4af37] border border-white/10" />
                          </div>
                        </div>
                      </div>
                      <button className="w-full py-4 bg-purple-600 hover:bg-purple-500 rounded-2xl font-bold transition-all">
                        Apply Branding to PIM
                      </button>
                    </div>
                  )}

                  {activeAIFeature === 'sim' && (
                    <div className="space-y-8">
                      <h3 className="text-xl font-bold">Monthly Revenue Simulation</h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-xs text-gray-500 uppercase font-bold">Estimated Sales</p>
                          <p className="text-3xl font-bold mt-2">{aiResult.sales.toLocaleString()}</p>
                          <p className="text-[10px] text-gray-600 mt-1">Units per month</p>
                        </div>
                        <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
                          <p className="text-xs text-gray-500 uppercase font-bold">Gross Revenue</p>
                          <p className="text-3xl font-bold mt-2">${aiResult.revenue.toLocaleString()}</p>
                          <p className="text-[10px] text-emerald-500 mt-1">Target: $50k+</p>
                        </div>
                        <div className="p-6 bg-blue-600/10 rounded-2xl border border-blue-600/20">
                          <p className="text-xs text-blue-400 uppercase font-bold">Net Profit</p>
                          <p className="text-3xl font-bold mt-2 text-blue-400">${aiResult.profit.toLocaleString()}</p>
                          <p className="text-[10px] text-blue-500 mt-1">Margin: 70%</p>
                        </div>
                      </div>
                      <div className="bg-white/5 p-6 rounded-2xl border border-white/5">
                        <h4 className="text-sm font-bold mb-4">Simulation Parameters</h4>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                          <div>
                            <span className="text-gray-500 block">Traffic</span>
                            <span className="font-bold">5,000 / mo</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Conv. Rate</span>
                            <span className="font-bold">2.5%</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Unit Price</span>
                            <span className="font-bold">$49.99</span>
                          </div>
                          <div>
                            <span className="text-gray-500 block">Unit Cost</span>
                            <span className="font-bold">$15.00</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-700">
                    <Sparkles size={32} />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-400">Select an AI Feature</h3>
                    <p className="text-sm text-gray-600 mt-1">Click on a feature to run the AI Business Engine.</p>
                  </div>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* AI Trends Table */}
        <div className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-8 rounded-[40px]">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">AI Trend Discovery</h2>
            <button className="text-sm text-blue-400 font-medium hover:underline">View All Trends</button>
          </div>
          <div className="space-y-4">
            {trends.map((trend, i) => (
              <motion.div
                key={trend.keyword}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center justify-between p-4 bg-white/[0.02] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-all"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-bold">{trend.keyword}</p>
                    <p className="text-xs text-gray-500">Search Vol: {trend.demand.toLocaleString()}</p>
                  </div>
                </div>
                <div className="flex items-center gap-8">
                  <div className="text-right">
                    <p className="text-emerald-400 font-bold">+{trend.growth}%</p>
                    <p className="text-[10px] text-gray-500 uppercase font-bold">Growth</p>
                  </div>
                  <div className="w-12 h-12 rounded-full border-2 border-blue-500/20 flex items-center justify-center relative">
                    <span className="text-xs font-bold">{trend.score}</span>
                    <svg className="absolute inset-0 w-full h-full -rotate-90">
                      <circle
                        cx="24"
                        cy="24"
                        r="22"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeDasharray={138}
                        strokeDashoffset={138 - (138 * trend.score) / 100}
                        className="text-blue-500"
                      />
                    </svg>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Automation Logs */}
        <div className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[40px]">
          <h2 className="text-xl font-bold mb-6">Automation Logs</h2>
          <div className="space-y-6">
            {Object.entries(completedTasks).length === 0 ? (
              <div className="text-center py-12">
                <AlertCircle size={32} className="mx-auto text-gray-700 mb-4" />
                <p className="text-sm text-gray-500">No tasks executed yet.</p>
              </div>
            ) : (
              Object.entries(completedTasks).map(([id, results]: [string, any]) => (
                <div key={id} className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-emerald-400">
                    <CheckCircle size={14} />
                    Task {id} Completed
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-2">
                    {Object.entries(results).map(([key, val]: [string, any]) => (
                      <div key={key} className="flex justify-between text-xs">
                        <span className="text-gray-500 capitalize">{key.replace('_', ' ')}</span>
                        <span className="font-bold text-white">{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
