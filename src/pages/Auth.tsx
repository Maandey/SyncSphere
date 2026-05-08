import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../lib/firebase";
import { Button } from "../components/ui/Button";
import { Zap, Github, Hexagon } from "lucide-react";
import { motion } from "motion/react";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError("");
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to sign in with Google");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-zinc-500/5 blur-3xl opacity-20" />
      
      <div className="hidden lg:flex flex-col justify-between p-12 w-1/2 border-r border-zinc-900 relative z-10 bg-zinc-900/10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-zinc-100 rounded flex items-center justify-center">
            <Zap className="w-6 h-6 text-zinc-950" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-zinc-100">SyncSphere</span>
        </div>

        <div>
          <h2 className="text-5xl font-black text-zinc-100 leading-[1] mb-10 tracking-tighter uppercase">
            Operational <br /> Excellence <br /> 
            <span className="text-zinc-500 line-through decoration-zinc-800">Simplified.</span>
          </h2>
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-zinc-500">
              <Hexagon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Advanced Priority Architecture</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <Hexagon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Real-time Node Synchronization</span>
            </div>
            <div className="flex items-center gap-4 text-zinc-500">
              <Hexagon className="w-4 h-4" />
              <span className="text-xs font-bold uppercase tracking-widest">Precision Integrity Metrics</span>
            </div>
          </div>
        </div>

        <p className="text-[10px] text-zinc-700 font-bold uppercase tracking-[0.3em]">
          &copy; 2026 SyncSphere Protocol
        </p>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-xs w-full"
        >
          <div className="text-center mb-12">
            <h1 className="text-2xl font-black mb-2 uppercase tracking-tighter text-zinc-100">Authentication</h1>
            <p className="text-xs text-zinc-600 font-bold uppercase tracking-widest leading-loose">Access your protected workspace</p>
          </div>

          <div className="space-y-3">
            <Button 
              variant="outline" 
              className="w-full h-10 gap-3 border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900 text-zinc-300 rounded-sm"
              onClick={handleGoogleSignIn}
              loading={loading}
            >
              <img src="https://www.google.com/favicon.ico" className="w-4 h-4 grayscale" alt="Google" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Connect Google</span>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full h-10 gap-3 border-zinc-900 bg-zinc-900/20 hover:bg-zinc-900 text-zinc-300 rounded-sm"
              disabled
            >
              <Github className="w-4 h-4 grayscale" />
              <span className="text-[10px] font-bold uppercase tracking-widest">Connect GitHub</span>
            </Button>

            {error && (
              <p className="text-[10px] font-bold text-center text-red-500 mt-4 uppercase tracking-widest">{error}</p>
            )}
          </div>

          <div className="mt-12 pt-12 border-t border-zinc-900 text-center">
            <p className="text-[9px] font-bold text-zinc-700 uppercase tracking-widest leading-relaxed">
              Secure protocol initialization agreement <br />
              <button className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4">Legal</button> & <button className="text-zinc-500 hover:text-zinc-300 transition-colors underline underline-offset-4">Privacy</button>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
