'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Search, Sparkles, Calendar, Database, Anchor, FlaskConical, FileText, Settings, PanelLeftClose, PanelLeftOpen, Cpu, BookOpen } from 'lucide-react';

export default function Sidebar() {
  const router = useRouter();
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={`${isCollapsed ? 'w-20 items-center' : 'w-60'} transition-all duration-300 bg-black/40 backdrop-blur-3xl text-white/60 h-screen flex flex-col px-4 py-6 flex-shrink-0 border-r border-white/5 relative z-50`}>
      
      {/* Header with Logo and Toggle */}
      <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'} mb-8 px-2`}>
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            {/* Golden Glowing Circle Logo */}
            <button onClick={() => setIsCollapsed(true)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse" />
            <span className="font-medium text-white/90 tracking-wide text-sm">Paradise OS</span>
          </div>
        )}
        {isCollapsed && (
           <button onClick={() => setIsCollapsed(false)} className="w-3 h-3 rounded-full bg-amber-400 shadow-[0_0_12px_3px_rgba(251,191,36,0.6)] animate-pulse mb-4 mt-2" />
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className={`text-white/40 hover:text-white transition-colors ${isCollapsed ? 'absolute bottom-8' : ''}`}
        >
          {isCollapsed ? <PanelLeftOpen size={18} /> : <PanelLeftClose size={18} />}
        </button>
      </div>

      <div className="flex flex-col space-y-1 flex-1 mt-4">
        
        <Link href="/" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <Sparkles size={16} className="text-fuchsia-500/70 group-hover:text-fuchsia-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Command Center</span>}
        </Link>

        <div className="h-6" /> {/* Spacer */}
        {!isCollapsed && <div className="px-3 mb-2 text-[10px] uppercase font-mono text-white/30 tracking-wider">Knowledge</div>}

        <Link href="/competitors" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <Database size={16} className="text-blue-500/70 group-hover:text-blue-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Competitors</span>}
        </Link>

        <Link href="/suppliers" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <Database size={16} className="text-emerald-500/70 group-hover:text-emerald-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Suppliers</span>}
        </Link>
        
        <Link href="/operations" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <Anchor size={16} className="text-amber-500/70 group-hover:text-amber-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Operations</span>}
        </Link>
        
        <Link href="/rd" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <FlaskConical size={16} className="text-purple-500/70 group-hover:text-purple-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Research</span>}
        </Link>

        <Link href="/requirements" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <BookOpen size={16} className="text-indigo-500/70 group-hover:text-indigo-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Requirements</span>}
        </Link>

        <Link href="/tools" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <Cpu size={16} className="text-fuchsia-500/70 group-hover:text-fuchsia-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Agritech Tools</span>}
        </Link>

        <Link href="/vault" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group border border-transparent hover:border-white/5`}>
          <FileText size={16} className="text-rose-500/70 group-hover:text-rose-400 transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors font-medium">Documents</span>}
        </Link>
      </div>

      <div className="mt-auto pt-6 border-t border-white/5">
        <Link href="/settings" className={`flex items-center gap-3 px-3 py-2 text-sm hover:bg-white/5 rounded-xl transition-all ${isCollapsed ? 'justify-center' : ''} group`}>
          <Settings size={16} className="text-white/40 group-hover:text-white transition-colors shrink-0" />
          {!isCollapsed && <span className="group-hover:text-white transition-colors">Settings</span>}
        </Link>
      </div>
      
    </div>
  );
}
