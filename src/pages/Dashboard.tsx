import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { seedMockData } from "../lib/seed";
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  ArrowUpRight,
  Zap,
  Activity,
  Calendar,
  MoreVertical,
  Database
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { motion } from "motion/react";

const productivityData = [
  { name: 'Mon', tasks: 12, velocity: 85 },
  { name: 'Tue', tasks: 19, velocity: 92 },
  { name: 'Wed', tasks: 15, velocity: 88 },
  { name: 'Thu', tasks: 22, velocity: 95 },
  { name: 'Fri', tasks: 30, velocity: 98 },
  { name: 'Sat', tasks: 10, velocity: 80 },
  { name: 'Sun', tasks: 8, velocity: 75 },
];

const teamData = [
  { name: 'Core', value: 45, color: '#3f3f46' },
  { name: 'Service', value: 78, color: '#52525b' },
  { name: 'UI/UX', value: 92, color: '#2dd4bf' },
  { name: 'Ops', value: 64, color: '#d4d4d8' },
];

export default function Dashboard() {
  const { profile, user } = useAuth();
  const [seeding, setSeeding] = useState(false);

  const handleSeed = async () => {
    if (!user) return;
    setSeeding(true);
    await seedMockData(user.uid);
    setSeeding(false);
  };

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-zinc-500 font-bold text-[10px] uppercase tracking-[0.2em] mb-2 px-1">Workspace Control</p>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Active Pulse, {profile?.displayName}</h2>
        </div>
        <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" onClick={handleSeed} loading={seeding} className="gap-2 border-zinc-900 bg-zinc-900/20">
               <Database className="w-3 h-3" /> Sync Demo
            </Button>
            <div className="flex gap-2">
                <Badge variant="emerald" className="px-2 py-0.5 text-[9px] border-none bg-emerald-500/10 text-emerald-500">Project: Nebula</Badge>
            </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Active Nodes", value: "48", trend: "+12%", icon: CheckCircle2, color: "text-zinc-100" },
          { label: "Velocity Rate", value: "94.2", trend: "+5.4%", icon: TrendingUp, color: "text-emerald-400" },
          { label: "Current Load", value: "82%", trend: "-2.1%", icon: Activity, color: "text-zinc-400" },
          { label: "Est. Savings", value: "14h", trend: "+3h", icon: Zap, color: "text-zinc-300" },
        ].map((stat, i) => (
          <Card key={i} className="border-zinc-900 bg-zinc-950">
            <CardContent className="p-5">
              <div className="flex justify-between items-start mb-3">
                <div className={stat.color}>
                  <stat.icon className="w-4 h-4 opacity-70" />
                </div>
                <div className="text-[10px] font-bold text-zinc-500">
                  {stat.trend}
                </div>
              </div>
              <p className="text-xl font-bold text-zinc-100 mb-0.5">{stat.value}</p>
              <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-zinc-900 bg-zinc-950">
          <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-900 bg-zinc-900/10">
            <div>
              <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Network Distribution</h3>
            </div>
            <select className="bg-transparent border-none text-[10px] text-zinc-500 uppercase font-black outline-none cursor-pointer hover:text-zinc-300">
              <option>W1</option>
              <option>M1</option>
            </select>
          </div>
          <CardContent className="h-[280px] mt-2 w-full p-0 overflow-hidden relative">
            <ResponsiveContainer width="99%" height="100%">
              <AreaChart data={productivityData}>
                <defs>
                  <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#d4d4d8" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#d4d4d8" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#3f3f46" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', borderRadius: '4px', fontSize: '10px' }}
                />
                <Area type="monotone" dataKey="tasks" stroke="#71717a" strokeWidth={1.5} fillOpacity={1} fill="url(#colorTasks)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-zinc-900 bg-zinc-950">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-6">
                <Activity className="w-4 h-4 text-zinc-500" />
                <h3 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">System Integrity</h3>
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="relative w-28 h-28">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-zinc-900" />
                    <circle cx="56" cy="56" r="50" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={314} strokeDashoffset={314 - (314 * 0.92)} className="text-zinc-300" strokeLinecap="round" />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-zinc-100 italic tracking-tighter">92.0</span>
                    <span className="text-[9px] font-black text-zinc-500 tracking-tighter">NOMINAL</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3 px-2">
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-600 font-bold uppercase tracking-tighter">Anomaly Rate</span>
                  <span className="text-zinc-200 font-bold">4%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-zinc-600 font-bold uppercase tracking-tighter">Uptime</span>
                  <span className="text-zinc-200 font-bold tracking-widest">99.9%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-900 bg-zinc-950">
            <CardContent className="p-5">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-zinc-600 mb-3">Focus Brief</h3>
               <p className="text-xs text-zinc-400 leading-relaxed font-medium border-l-2 border-zinc-800 pl-4 py-1">
                 "Resource allocation shifted toward Core infrastructure. Velocity remains stable despite higher load. Monitor deployment cycles for anomalous latency."
               </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 lg:grid-rows-2 gap-8">
          <Card className="lg:col-span-1 lg:row-span-2 border-zinc-900 bg-zinc-950">
            <CardContent className="p-6">
                <h3 className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-6">Internal Velocity</h3>
                <div className="h-[250px] w-full p-0 overflow-hidden relative">
                    <ResponsiveContainer width="99%" height="100%">
                        <BarChart data={teamData} layout="vertical">
                            <XAxis type="number" hide />
                            <YAxis dataKey="name" type="category" stroke="#52525b" fontSize={10} width={60} tickLine={false} axisLine={false} />
                            <Bar dataKey="value" radius={[0, 2, 2, 0]} barSize={20}>
                                {teamData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill="#27272a" stroke="#3f3f46" strokeWidth={1} />
                                ))}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                </div>
                <div className="mt-8 pt-6 border-t border-zinc-900">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded bg-zinc-900 flex items-center justify-center border border-zinc-800">
                            <Clock className="w-4 h-4 text-zinc-500" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-zinc-200">8.4 hrs</p>
                            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Focus Peak</p>
                        </div>
                    </div>
                </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3 border-zinc-900 bg-zinc-950">
             <div className="px-5 py-4 flex items-center justify-between border-b border-zinc-900 bg-zinc-900/10">
                <h3 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Global Stream</h3>
                <button className="text-zinc-600 hover:text-zinc-400 transition-colors"><MoreVertical className="w-4 h-4" /></button>
             </div>
             <CardContent className="p-0">
                {[
                  { user: "Sarah K.", action: "assigned", target: "CORE-92", time: "2m", type: "assign" },
                  { user: "Mark R.", action: "noted", target: "UX-104", time: "15m", type: "comment" },
                  { user: "System", action: "indexed", target: "SEC-01", time: "1h", type: "ai" },
                  { user: "Julie S.", action: "resolved", target: "WEB-42", time: "3h", type: "complete" },
                ].map((act, i) => (
                  <div key={i} className="flex items-center gap-4 px-5 py-3 border-b border-zinc-900 hover:bg-zinc-900/20 transition-all cursor-pointer group">
                    <div className="w-7 h-7 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[10px] font-bold text-zinc-500 group-hover:text-zinc-300 transition-colors">
                      {act.user.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-zinc-400">
                        <span className="font-bold text-zinc-200">{act.user}</span> {act.action} <span className="text-zinc-300 font-medium">[{act.target}]</span>
                      </p>
                    </div>
                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">{act.time}</p>
                  </div>
                ))}
             </CardContent>
          </Card>

          <div className="lg:col-span-3 grid md:grid-cols-2 gap-6">
             <Card className="border-zinc-900 bg-zinc-950 border-t-zinc-600 border-t-2">
                <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h4 className="font-bold text-sm tracking-tight text-zinc-100 uppercase">Foundation Core</h4>
                            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">Q2 Segment</p>
                        </div>
                        <div className="text-[11px] font-bold text-zinc-500">84%</div>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex -space-x-1.5">
                             {[1,2,3].map(i => <div key={i} className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-[9px] flex items-center justify-center text-zinc-600">ID</div>)}
                         </div>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.1em]">12 Active Nodes</p>
                    </div>
                </CardContent>
             </Card>

             <Card className="border-zinc-900 bg-zinc-950 border-t-emerald-600 border-t-2">
                <CardContent className="p-5">
                    <div className="flex justify-between items-start mb-6">
                        <div>
                            <h4 className="font-bold text-sm tracking-tight text-zinc-100 uppercase">Data Pipeline</h4>
                            <p className="text-[10px] text-zinc-600 uppercase font-black tracking-widest">ML Segment</p>
                        </div>
                        <div className="text-[9px] font-black text-emerald-500 tracking-widest">DONE</div>
                    </div>
                    <div className="flex items-center gap-4">
                         <div className="flex -space-x-1.5">
                             {[1,2].map(i => <div key={i} className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 text-[9px] flex items-center justify-center text-zinc-600">ID</div>)}
                         </div>
                         <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.1em]">Closed yesterday</p>
                    </div>
                </CardContent>
             </Card>
          </div>
      </div>
    </div>
  );
}
