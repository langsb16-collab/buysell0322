import React, { useState } from 'react';
import { auth } from '../firebase';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { motion } from 'motion/react';
import { ShieldCheck, Globe, Package, ShoppingCart, Loader2 } from 'lucide-react';

export default function Login() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white flex items-center justify-center p-6 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/10 blur-[150px] -z-10" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/10 blur-[150px] -z-10" />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-[#0a0a0a] border border-white/5 p-10 rounded-[40px] shadow-2xl relative"
      >
        <div className="flex justify-center mb-8">
          <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <ShieldCheck size={40} />
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold tracking-tight">OMS ENGINE</h1>
          <p className="text-gray-400 mt-2">Global Seller Automation Platform</p>
        </div>

        <div className="space-y-4 mb-10">
          {[
            { icon: Globe, text: 'Marketplace Integration' },
            { icon: Package, text: 'Real-time Stock Sync' },
            { icon: ShoppingCart, text: 'B2B Private Mall' },
          ].map((feature, i) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + i * 0.1 }}
              className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5"
            >
              <feature.icon size={20} className="text-blue-400" />
              <span className="text-sm font-medium text-gray-300">{feature.text}</span>
            </motion.div>
          ))}
        </div>

        <button
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-4 bg-white text-black hover:bg-gray-200 rounded-2xl transition-all font-bold flex items-center justify-center gap-3 shadow-lg shadow-white/5"
        >
          {loading ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
          )}
          {loading ? 'Signing in...' : 'Sign in with Google'}
        </button>

        <p className="text-center text-xs text-gray-500 mt-8">
          By signing in, you agree to our Terms of Service and Privacy Policy.
        </p>
      </motion.div>
    </div>
  );
}
