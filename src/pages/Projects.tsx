import { useEffect, useState } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../lib/firebase";
import { useAuth } from "../hooks/useAuth";
import { Project } from "../types";
import { Card, CardContent } from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { Badge } from "../components/ui/Badge";
import { CreateProjectModal } from "../components/CreateProjectModal";
import { Plus, Briefcase, Calendar, Search, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

export default function Projects() {
  const { user } = useAuth();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "projects"),
      where("members", "array-contains", user.uid),
      orderBy("updatedAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const projs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as Project[];
      setProjects(projs);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filteredProjects = projects.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 max-w-7xl">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-zinc-100 tracking-tight">Active Nodes</h2>
          <p className="text-zinc-600 text-[11px] font-bold uppercase tracking-widest leading-loose">Managed Initiatives and Shared Access Points.</p>
        </div>
        <Button onClick={() => setIsModalOpen(true)} className="gap-2 h-8 px-4 text-[10px] uppercase font-bold tracking-widest">
          <Plus className="w-3 h-3" /> Initialize Node
        </Button>
      </div>

      <div className="flex gap-4 p-2 bg-zinc-900/10 border border-zinc-900 rounded">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-600" />
          <input 
            type="text" 
            placeholder="Search index..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent border-none rounded pl-10 pr-4 py-1.5 text-xs focus:outline-none placeholder:text-zinc-700 font-medium text-zinc-300"
          />
        </div>
        <Button variant="outline" className="gap-2 border-zinc-900 h-8 text-[10px] font-bold uppercase py-0"><Filter className="w-3 h-3 text-zinc-500" /> Filter</Button>
      </div>

      {loading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <Card key={i} className="animate-pulse h-48 border-zinc-900 bg-zinc-950 shadow-none" />
          ))}
        </div>
      ) : filteredProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="w-16 h-16 bg-zinc-900 rounded flex items-center justify-center mb-6 border border-zinc-800">
                <Briefcase className="w-6 h-6 text-zinc-700" />
            </div>
            <h3 className="text-sm font-bold text-zinc-400 mb-2 uppercase tracking-tight">Index Null</h3>
            <p className="text-zinc-600 mb-8 max-w-xs uppercase text-[9px] tracking-[0.2em] font-black leading-relaxed">Initialize a new node to begin data tracking within this workspace.</p>
            <Button onClick={() => setIsModalOpen(true)} variant="outline" className="border-zinc-800 h-8 text-[10px] uppercase font-black">Initialize Node</Button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                <Link to={`/projects/${project.id}`}>
                  <Card className="group border-zinc-900 hover:border-zinc-700 bg-zinc-950 transition-all cursor-pointer h-full">
                    <div className="p-5">
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-10 h-10 bg-zinc-900 rounded border border-zinc-800 flex items-center justify-center group-hover:bg-zinc-100 transition-colors duration-300">
                          <Briefcase className="w-4 h-4 text-zinc-500 group-hover:text-zinc-950" />
                        </div>
                        <Badge variant={project.status === 'active' ? 'emerald' : 'slate'}>
                          {project.status}
                        </Badge>
                      </div>
                      
                      <h3 className="text-sm font-bold tracking-tight text-zinc-100 uppercase mb-2">
                        {project.name}
                      </h3>
                      <p className="text-[11px] text-zinc-600 line-clamp-2 mb-8 h-8 font-medium leading-relaxed">
                        {project.description}
                      </p>

                      <div className="flex items-center justify-between pt-5 border-t border-zinc-900/50">
                        <div className="flex -space-x-1">
                          {project.members.slice(0, 3).map((m, i) => (
                            <div key={i} className="w-6 h-6 rounded bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[8px] font-black text-zinc-500 uppercase">
                              ID
                            </div>
                          ))}
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-700">
                           <Calendar className="w-3 h-3" />
                           <span className="text-[9px] font-black uppercase tracking-[0.22em] leading-none">Updated</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      <CreateProjectModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
            // Firestore onSnapshot will update the list automatically
        }}
      />
    </div>
  );
}
