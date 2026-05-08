import React, { useState } from "react";
import { Search, Bell, Plus, Layout, ListChecks, ChevronDown } from "lucide-react";
import { Button } from "../ui/Button";
import { CreateProjectModal } from "../CreateProjectModal";
import { CreateTaskModal } from "../CreateTaskModal";
import { motion, AnimatePresence } from "motion/react";
import { cn } from "../../lib/utils";

export const Header = ({ title }: { title: string }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);

  return (
    <header className="h-16 border-b border-zinc-900 bg-zinc-950/50 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-40">
      <div>
        <h1 className="text-sm font-bold text-zinc-100 uppercase tracking-wider">{title}</h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative group hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="bg-zinc-900 border border-zinc-800 rounded pl-10 pr-4 py-1.5 text-xs text-zinc-300 w-48 focus:outline-none focus:border-zinc-600 transition-all placeholder:text-zinc-600"
          />
        </div>

        <button className="p-2 text-zinc-400 hover:text-zinc-100 transition-colors relative">
          <Bell className="w-4 h-4" />
          <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-zinc-400 rounded-full border border-zinc-950" />
        </button>

        <div className="relative">
          <Button 
            variant="primary" 
            size="sm" 
            className="gap-2 bg-zinc-100 text-zinc-950 hover:bg-zinc-200 border-none h-8 px-3 rounded"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-[11px] font-bold uppercase tracking-tight">Action</span>
            <ChevronDown className={cn("w-3 h-3 transition-transform opacity-50", isDropdownOpen && "rotate-180")} />
          </Button>

          <AnimatePresence>
            {isDropdownOpen && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setIsDropdownOpen(false)} />
                <motion.div
                  initial={{ opacity: 0, y: 4, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 4, scale: 0.98 }}
                  className="absolute right-0 mt-2 w-48 bg-zinc-900 border border-zinc-800 rounded shadow-xl overflow-hidden z-20 p-1"
                >
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsProjectModalOpen(true);
                    }}
                    className="flex items-center gap-3 w-full p-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-all text-left"
                  >
                    <Layout className="w-3.5 h-3.5" />
                    <span className="font-medium">New Project</span>
                  </button>
                  
                  <button 
                    onClick={() => {
                      setIsDropdownOpen(false);
                      setIsTaskModalOpen(true);
                    }}
                    className="flex items-center gap-3 w-full p-2 text-xs text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 rounded transition-all text-left"
                  >
                    <ListChecks className="w-3.5 h-3.5" />
                    <span className="font-medium">New Task</span>
                  </button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>

      <CreateProjectModal 
        isOpen={isProjectModalOpen} 
        onClose={() => setIsProjectModalOpen(false)} 
      />

      <CreateTaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
      />
    </header>
  );
};
