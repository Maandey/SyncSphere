import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { Trophy, Target, Zap, Star, Shield, Flame, Award, Medal } from "lucide-react";
import { motion } from "motion/react";
import { useAuth } from "../hooks/useAuth";
import { cn } from "../lib/utils";

export default function Gamification() {
  const { profile } = useAuth();

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Level & Achievements</h2>
          <p className="text-slate-500 text-sm italic">Unlock rewards by maintaining your elite productivity.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-1 bg-gradient-to-br from-indigo-900/20 to-slate-950">
          <CardContent className="p-8 flex flex-col items-center text-center">
             <div className="relative mb-6">
                <div className="w-32 h-32 rounded-full bg-slate-900 border-4 border-indigo-600 flex items-center justify-center shadow-2xl shadow-indigo-600/20">
                    <Trophy className="w-16 h-16 text-indigo-500" />
                </div>
                <div className="absolute -bottom-2 -right-2 bg-indigo-600 text-white rounded-full w-10 h-10 flex items-center justify-center font-black text-sm">
                   {Math.floor((profile?.xp || 0) / 100) + 1}
                </div>
             </div>
             
             <h3 className="text-2xl font-black italic uppercase tracking-tighter text-white mb-1">
                {profile?.displayName}
             </h3>
             <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Elite Contributor</p>

             <div className="w-full space-y-2 mb-8">
                <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    <span>Progress to Level {Math.floor((profile?.xp || 0) / 100) + 2}</span>
                    <span>{(profile?.xp || 0) % 100}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                    <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(profile?.xp || 0) % 100}%` }}
                        className="h-full bg-indigo-600" 
                    />
                </div>
             </div>

             <div className="grid grid-cols-2 gap-4 w-full">
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <p className="text-xl font-black text-white">{profile?.xp || 0}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Total XP</p>
                </div>
                <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
                    <p className="text-xl font-black text-emerald-400">{profile?.streak || 0}</p>
                    <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Streak</p>
                </div>
             </div>
          </CardContent>
        </Card>

        <div className="lg:col-span-2 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                    { icon: Zap, title: "Speed Demon", desc: "Complete 10 tasks in under 24 hours.", status: "earned" },
                    { icon: Shield, title: "Bug Crusher", desc: "Close 5 high-priority security issues.", status: "earned" },
                    { icon: Target, title: "Sniper", desc: "Hit 100% of your sprint estimates.", status: "locked" },
                    { icon: Flame, title: "Survivor", desc: "Maintain a 14-day productivity streak.", status: "locked" },
                ].map((b, i) => (
                    <Card key={i} className={cn("border-slate-900", b.status === 'locked' && "opacity-50 grayscale")}>
                        <CardContent className="p-6 flex items-start gap-4">
                            <div className={cn(
                                "w-12 h-12 rounded-xl flex items-center justify-center shrink-0",
                                b.status === 'earned' ? "bg-indigo-600/20 text-indigo-400" : "bg-slate-800 text-slate-600"
                            )}>
                                <b.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="flex items-center gap-2 mb-1">
                                    <h4 className="font-bold text-white italic uppercase tracking-tighter">{b.title}</h4>
                                    {b.status === 'earned' && <Badge variant="indigo">Unlocked</Badge>}
                                </div>
                                <p className="text-xs text-slate-500">{b.desc}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <div className="p-6 border-b border-slate-800">
                    <h3 className="font-bold text-white flex items-center gap-2">
                        <Award className="w-5 h-5 text-amber-500" />
                        Global Leaderboard
                    </h3>
                </div>
                <CardContent className="p-0">
                    {[
                        { name: "Alex Chen", xp: 12450, rank: 1 },
                        { name: "Sarah Miller", xp: 11200, rank: 2 },
                        { name: "Mark Wilson", xp: 10800, rank: 3 },
                        { name: "You", xp: profile?.xp || 0, rank: 42, active: true },
                    ].map((u, i) => (
                        <div key={i} className={cn(
                            "flex items-center justify-between p-4 border-b border-slate-900",
                            u.active && "bg-indigo-600/10"
                        )}>
                            <div className="flex items-center gap-4">
                                <span className={cn(
                                    "text-lg font-black italic w-6 text-center",
                                    u.rank === 1 ? "text-amber-500" : u.rank === 2 ? "text-slate-400" : u.rank === 3 ? "text-amber-700" : "text-slate-600"
                                )}>{u.rank}</span>
                                <div className="w-8 h-8 rounded-full bg-slate-800" />
                                <span className="text-sm font-bold text-slate-200">{u.name}</span>
                            </div>
                            <span className="text-sm font-black text-slate-400">{u.xp} <span className="text-[10px] uppercase tracking-widest text-slate-600">XP</span></span>
                        </div>
                    ))}
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
