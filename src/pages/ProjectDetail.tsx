import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, onSnapshot, collection, query, where, orderBy, updateDoc, serverTimestamp, addDoc } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { Project, Task, TaskStatus } from "../types";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { cn, getStatusColor, getPriorityColor } from "../lib/utils";
import { GeminiService } from "../services/geminiService";
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Zap, 
  Clock, 
  MessageSquare, 
  User, 
  Paperclip,
  BrainCircuit,
  Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const COLUMNS: { id: TaskStatus; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'in_progress', label: 'In Progress' },
  { id: 'review', label: 'In Review' },
  { id: 'completed', label: 'Completed' },
];

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [suggestions, setSuggestions] = useState<any[]>([]);

  useEffect(() => {
    if (!id || !user) return;

    const projUnsub = onSnapshot(doc(db, "projects", id), (doc) => {
      if (doc.exists()) {
        setProject({ id: doc.id, ...doc.data() } as Project);
      } else {
        navigate("/projects");
      }
    });

    const tasksUnsub = onSnapshot(
      query(collection(db, "projects", id, "tasks"), orderBy("sequence", "asc")),
      (snapshot) => {
        setTasks(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Task[]);
        setLoading(false);
      }
    );

    return () => {
      projUnsub();
      tasksUnsub();
    };
  }, [id, user, navigate]);

  const handleUpdateStatus = async (taskId: string, newStatus: TaskStatus) => {
    if (!id) return;
    const taskRef = doc(db, "projects", id, "tasks", taskId);
    await updateDoc(taskRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });
  };

  const handleAISuggestions = async () => {
    if (!project) return;
    setIsSuggesting(true);
    const results = await GeminiService.suggestTasks(project, tasks);
    setSuggestions(results);
    setIsSuggesting(false);
  };

  const addSuggestedTask = async (suggestion: any) => {
    if (!id) return;
    await addDoc(collection(db, "projects", id, "tasks"), {
      ...suggestion,
      projectId: id,
      status: 'todo',
      sequence: tasks.length,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    setSuggestions(prev => prev.filter(s => s.title !== suggestion.title));
  };

  if (loading) return (
     <div className="flex h-96 items-center justify-center">
        <Loader2 className="w-12 h-12 text-indigo-600 animate-spin" />
     </div>
  );

  return (
    <div className="space-y-8 h-full flex flex-col">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white">
                <BrainCircuit className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-white">{project?.name}</h2>
                <Badge variant={project?.status === 'active' ? 'emerald' : 'slate'}>{project?.status}</Badge>
              </div>
              <p className="text-sm text-slate-500 font-medium italic">{project?.description}</p>
            </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            className="gap-2 border border-indigo-500/30"
            onClick={handleAISuggestions}
            loading={isSuggesting}
          >
            <Zap className={cn("w-4 h-4 text-indigo-400", isSuggesting && "animate-pulse")} />
            AI Suggest
          </Button>
          <Button className="gap-2">
            <Plus className="w-4 h-4" /> New Task
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-6"
          >
            <div className="bg-indigo-950/20 border border-indigo-500/20 rounded-xl p-4">
              <div className="flex items-center gap-2 mb-4">
                <Zap className="w-4 h-4 text-indigo-400" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-indigo-300">Intelligent Insights</span>
              </div>
              <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-none">
                {suggestions.map((s, i) => (
                  <Card key={i} className="min-w-[280px] bg-slate-900/80 border-indigo-500/10">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-sm font-bold text-white leading-tight">{s.title}</h4>
                        <Badge variant={s.priority === 'urgent' ? 'rose' : 'indigo'}>{s.priority}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-4 line-clamp-2">{s.description}</p>
                      <Button size="sm" variant="ghost" className="w-full text-indigo-400 hover:text-indigo-300 h-8" onClick={() => addSuggestedTask(s)}>
                        + Add to Todo
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 min-h-0">
        {COLUMNS.map((col) => {
          const colTasks = tasks.filter(t => t.status === col.id);
          return (
            <div key={col.id} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-slate-500 italic">{col.label}</h3>
                  <div className="w-5 h-5 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-[10px] font-bold text-slate-500">
                    {colTasks.length}
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-6 w-6"><Plus className="w-3.5 h-3.5" /></Button>
              </div>

              <div className="flex-1 space-y-4 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-800">
                <AnimatePresence mode="popLayout">
                  {colTasks.map((task) => (
                    <motion.div
                      key={task.id}
                      layout
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      whileHover={{ scale: 1.02 }}
                      className="group"
                    >
                      <Card className="hover:border-slate-700 hover:bg-slate-900/80 transition-all border-slate-900 cursor-grab active:cursor-grabbing">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-2 mb-2">
                            {task.labels.map(l => (
                              <Badge key={l} variant="slate" className="text-[8px] px-1 py-0">{l}</Badge>
                            ))}
                          </div>
                          
                          <h4 className="text-sm font-bold text-white mb-2 leading-tight group-hover:text-indigo-400 transition-colors">
                            {task.title}
                          </h4>
                          
                          <p className="text-xs text-slate-500 line-clamp-2 mb-4 italic">
                            {task.description}
                          </p>

                          <div className="flex items-center justify-between pt-4 border-t border-slate-900">
                            <div className="flex items-center gap-3">
                              <div className={cn("text-[10px] font-bold uppercase", getPriorityColor(task.priority))}>
                                {task.priority}
                              </div>
                              <div className="flex items-center gap-1 text-[10px] text-slate-600 uppercase font-black italic">
                                <Clock className="w-3 h-3" />
                                {task.dueDate ? "Soon" : "ASAP"}
                              </div>
                            </div>
                            <div className="flex -space-x-1.5 leading-none">
                              <div className="w-5 h-5 rounded-full bg-slate-800 border-2 border-slate-950 flex items-center justify-center text-[8px] font-bold">
                                {task.assigneeId ? "A" : "?"}
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {colTasks.length === 0 && (
                   <div className="h-24 border-2 border-dashed border-slate-900 rounded-xl flex items-center justify-center text-slate-800 text-[10px] font-bold uppercase tracking-widest italic">
                      Empty Segment
                   </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
