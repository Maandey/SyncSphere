import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell, PieChart, Pie
} from 'recharts';
import { Card, CardContent } from "../components/ui/Card";
import { Badge } from "../components/ui/Badge";
import { Button } from "../components/ui/Button";
import { TrendingUp, Clock, AlertCircle, Zap, Activity, Users, MousePointer2 } from "lucide-react";

const productivityTrends = [
  { day: 'W1', dev: 45, design: 32, ops: 20 },
  { day: 'W2', dev: 52, design: 38, ops: 25 },
  { day: 'W3', dev: 48, design: 45, ops: 22 },
  { day: 'W4', dev: 61, design: 41, ops: 30 },
];

const resourceData = [
  { name: 'Research', value: 400 },
  { name: 'Dev', value: 700 },
  { name: 'Review', value: 200 },
  { name: 'Bugs', value: 100 },
];

const COLORS = ['#27272a', '#3f3f46', '#52525b', '#71717a'];

export default function Analytics() {
  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Platform Metrics</h2>
          <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest leading-loose px-1">Derived Operational Intelligence.</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {[
          { label: "Cycle Time", value: "3.2d", change: "-0.5d", desc: "System latency" },
          { label: "Efficiency", value: "94%", change: "+2%", desc: "Load balance" },
          { label: "Integrity", value: "A+", change: "Stable", desc: "Focus index" },
          { label: "Nodes", value: "842", change: "+148", desc: "Active interactions" },
        ].map((s, i) => (
          <Card key={i} className="border-zinc-900 bg-zinc-950">
            <CardContent className="p-6 text-center">
              <p className="text-2xl font-black text-zinc-100 tracking-tighter mb-0.5">{s.value}</p>
              <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">{s.label}</p>
              <div className="text-[9px] font-black text-zinc-400 bg-zinc-900 px-2 py-1 rounded inline-block uppercase tracking-wider">
                {s.desc}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        <Card className="lg:col-span-2 border-zinc-900 bg-zinc-950">
          <div className="px-5 py-4 border-b border-zinc-900 flex justify-between items-center bg-zinc-900/10">
             <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Distribution Trends</h3>
             <div className="flex gap-4">
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-zinc-100" /> <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Main</span></div>
                <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-sm bg-zinc-500" /> <span className="text-[9px] font-medium text-zinc-500 uppercase tracking-widest">Secondary</span></div>
             </div>
          </div>
          <CardContent className="h-[380px] p-0 w-full relative overflow-hidden mt-4">
             <ResponsiveContainer width="99%" height="100%">
               <AreaChart data={productivityTrends}>
                 <XAxis dataKey="day" stroke="#27272a" fontSize={10} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '10px' }} />
                 <Area type="monotone" dataKey="dev" stackId="1" stroke="#d4d4d8" fill="#d4d4d8" fillOpacity={0.05} strokeWidth={1} />
                 <Area type="monotone" dataKey="design" stackId="1" stroke="#3f3f46" fill="#3f3f46" fillOpacity={0.05} strokeWidth={1} />
               </AreaChart>
             </ResponsiveContainer>
          </CardContent>
        </Card>

        <div className="space-y-8">
            <Card className="border-zinc-900 bg-zinc-950">
                <div className="px-5 py-4 border-b border-zinc-900 bg-zinc-900/10">
                    <h3 className="text-[11px] font-black text-zinc-400 uppercase tracking-[0.2em]">Resource Load</h3>
                </div>
                <CardContent className="h-[240px] p-0 w-full relative overflow-hidden">
                    <ResponsiveContainer width="99%" height="100%">
                        <PieChart>
                            <Pie
                                data={resourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={60}
                                outerRadius={80}
                                fill="#27272a"
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {resourceData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip contentStyle={{ backgroundColor: '#09090b', border: '1px solid #27272a', fontSize: '10px' }} />
                        </PieChart>
                    </ResponsiveContainer>
                </CardContent>
                <div className="flex flex-wrap justify-center gap-3 pb-6 px-4">
                    {resourceData.map((d, i) => (
                        <div key={i} className="flex items-center gap-2">
                            <div className="w-1.5 h-1.5 rounded-sm" style={{ backgroundColor: COLORS[i] }} />
                            <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest">{d.name}</span>
                        </div>
                    ))}
                </div>
            </Card>

            <Card className="bg-zinc-100 text-zinc-950 border-transparent rounded shadow-xl">
                <CardContent className="p-6">
                    <div className="flex items-center gap-3 mb-4">
                        <Activity className="w-5 h-5" />
                        <h4 className="text-[11px] font-black uppercase tracking-[0.2em]">Focus Strategic</h4>
                    </div>
                    <p className="text-xs font-semibold leading-relaxed mb-6 tracking-tight">
                      "Cross-functional synchronization improved by 42%. Load balance is optimal for current sprint. Prioritize node stability over additional expansion."
                    </p>
                    <Button variant="outline" size="sm" className="w-full bg-zinc-950 text-zinc-100 border-zinc-950 hover:bg-zinc-900 h-8 text-[10px] uppercase font-black tracking-widest">Execute Strategy</Button>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
