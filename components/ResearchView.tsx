"use client";
import React, { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, AnimatePresence } from "motion/react";
import { Search, Globe, ShieldAlert, Zap, Terminal, Database, Cpu, Activity, Info, ChevronRight, Lock } from "lucide-react";
import { cn } from "../lib/utils";
import { CanvasText } from "./ui/canvas-text";

type ResearchMode = "WEB_SEARCH" | "OSINT_KALI" | "DORKING" | "WEB_USE";

interface ModeConfig {
  id: ResearchMode;
  label: string;
  icon: any;
  color: string;
  glow: string;
  description: string;
  intensity: number;
}

const MODES: ModeConfig[] = [
  { 
    id: "WEB_SEARCH", 
    label: "WEB_SEARCH", 
    icon: Search, 
    color: "#3b82f6", 
    glow: "rgba(59, 130, 246, 0.5)",
    description: "Deep crawling of indexed surface web metadata.",
    intensity: 1.0
  },
  { 
    id: "OSINT_KALI", 
    label: "OSINT_KALI", 
    icon: ShieldAlert, 
    color: "#ef4444", 
    glow: "rgba(239, 68, 68, 0.5)",
    description: "Offensive-source intelligence & vulnerability mapping.",
    intensity: 1.5
  },
  { 
    id: "DORKING", 
    label: "DORKING", 
    icon: Terminal, 
    color: "#10b981", 
    glow: "rgba(16, 185, 129, 0.5)",
    description: "Advanced operator filtering for unprotected endpoints.",
    intensity: 1.2
  },
  { 
    id: "WEB_USE", 
    label: "WEB_USE", 
    icon: Globe, 
    color: "#a855f7", 
    glow: "rgba(168, 85, 247, 0.5)",
    description: "Active agent browsing via headless virtualization.",
    intensity: 1.0
  },
];

export const ResearchView = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentMode, setCurrentMode] = useState<ResearchMode>("WEB_SEARCH");
  const [query, setQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  
  const activeMode = MODES.find(m => m.id === currentMode)!;

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 1],
      glowColor: [1, 1, 1],
      markers: [
        { location: [37.7595, -122.4367], size: 0.03 },
        { location: [40.7128, -74.006], size: 0.1 },
        { location: [51.5074, -0.1278], size: 0.05 },
        { location: [35.6762, 139.6503], size: 0.07 },
        { location: [59.3293, 18.0686], size: 0.05 }, // Stockholm
      ],
      onRender: (state) => {
        state.phi = phi;
        phi += 0.005;
        
        // Dynamic color based on mode
        const color = activeMode.color;
        const r = parseInt(color.slice(1, 3), 16) / 255;
        const g = parseInt(color.slice(3, 5), 16) / 255;
        const b = parseInt(color.slice(5, 7), 16) / 255;
        
        state.glowColor = [r, g, b];
        state.markerColor = [r, g, b];
      },
    });

    return () => globe.destroy();
  }, [currentMode, activeMode.color]);

  const handleStartResearch = () => {
    if (!query) return;
    setIsSearching(true);
    setLogs([]);
    
    const steps = [
      `[INIT] Handshaking with ${currentMode} modules...`,
      `[AUTH] Accessing encrypted neural relays...`,
      `[SCAN] Query: "${query}"`,
      `[FILTER] Applying ${currentMode.toLowerCase()} dorks...`,
      `[PROCESS] Extracting high-confidence vectors...`,
      `[FINAL] Consolidating results for swarm consumption.`,
    ];

    steps.forEach((step, i) => {
      setTimeout(() => {
        setLogs(prev => [...prev, step]);
        if (i === steps.length - 1) setIsSearching(false);
      }, i * 800);
    });
  };

  return (
    <div className="h-full w-full bg-zinc-950 flex overflow-hidden font-mono selection:bg-purple-500/30">
      {/* Left Sidebar - Controls */}
      <div className="w-96 border-r border-zinc-900 bg-zinc-950/50 backdrop-blur-xl p-8 flex flex-col gap-8 shrink-0 z-10 relative">
        <div className="space-y-2">
            <h2 className="text-2xl font-black italic tracking-tighter flex items-center gap-3 text-white">
                <Beaker className="w-6 h-6 text-blue-500" />
                <CanvasText text="AUTORESEARCH" backgroundClassName="bg-zinc-950" colors={["#3b82f6", "#ef4444", "#10b981"]} />
            </h2>
            <p className="text-[10px] text-zinc-600 uppercase tracking-widest leading-relaxed">
               Neural recursive search engine. Powered by Arkitekt High-Bandwidth Relays.
            </p>
        </div>

        <div className="space-y-4">
            <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Select Mode</label>
            <div className="grid grid-cols-2 gap-2">
                {MODES.map(mode => (
                    <button
                        key={mode.id}
                        onClick={() => setCurrentMode(mode.id)}
                        className={cn(
                            "flex flex-col items-start p-3 rounded-xl border transition-all relative overflow-hidden group",
                            currentMode === mode.id 
                                ? "bg-zinc-900 border-zinc-700 shadow-[0_0_20px_rgba(255,255,255,0.05)]" 
                                : "bg-zinc-950/30 border-zinc-800/50 hover:border-zinc-700 hover:bg-zinc-900/50"
                        )}
                    >
                        <mode.icon className={cn(
                            "w-4 h-4 mb-2 transition-colors",
                            currentMode === mode.id ? "text-white" : "text-zinc-500 group-hover:text-zinc-300"
                        )} style={{ color: currentMode === mode.id ? mode.color : undefined }} />
                        <span className={cn(
                            "text-[10px] font-bold uppercase tracking-tighter",
                            currentMode === mode.id ? "text-white" : "text-zinc-500"
                        )}>{mode.label}</span>
                        
                        {currentMode === mode.id && (
                            <motion.div 
                                layoutId="mode-accent"
                                className="absolute bottom-0 left-0 w-full h-[2px]"
                                style={{ backgroundColor: mode.color }}
                            />
                        )}
                    </button>
                ))}
            </div>
        </div>

        <div className="flex-1 flex flex-col gap-6">
            <div className="space-y-4">
                <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Research Query</label>
                <div className="relative">
                    <input 
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Define research objective..."
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-xs placeholder:text-zinc-700 focus:outline-none focus:border-zinc-600 transition-colors"
                    />
                    <Zap className={cn(
                        "absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-all",
                        query ? "text-yellow-500 animate-pulse" : "text-zinc-800"
                    )} />
                </div>
                <button 
                    onClick={handleStartResearch}
                    disabled={!query || isSearching}
                    className="w-full py-4 bg-zinc-100 text-zinc-950 rounded-xl font-black italic tracking-tighter text-sm hover:bg-white transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                    {isSearching ? <Activity className="w-4 h-4 animate-spin" /> : <ChevronRight className="w-4 h-4" />}
                    {isSearching ? 'SCANNING...' : 'EXEC_RESEARCH'}
                </button>
            </div>

            <div className="flex-1 border border-zinc-900 rounded-2xl bg-black/40 p-4 font-mono overflow-auto scrollbar-hide">
                <h4 className="text-[9px] font-bold text-zinc-700 uppercase tracking-[0.2em] mb-3 flex items-center justify-between">
                    <span>Terminal Output</span>
                    <span className="animate-pulse">_</span>
                </h4>
                <div className="space-y-2">
                    {logs.map((log, i) => (
                        <div key={i} className="text-[10px] text-zinc-400 break-all border-l border-zinc-800 pl-4 py-1 leading-relaxed">
                            {log}
                        </div>
                    ))}
                    {isSearching && (
                        <div className="text-[10px] text-zinc-600 flex items-center gap-2 mt-2">
                             <div className="w-1 h-1 bg-zinc-700 rounded-full animate-ping" />
                             Processing...
                        </div>
                    )}
                    {logs.length === 0 && !isSearching && (
                        <div className="text-[10px] text-zinc-800 italic uppercase">Waiting for input...</div>
                    )}
                </div>
            </div>
        </div>

        <div className="p-4 border border-zinc-900 rounded-xl bg-zinc-900/20">
            <h4 className="text-[10px] font-bold text-zinc-400 mb-2 flex items-center gap-2 uppercase tracking-tight">
                <Info className="w-3 h-3 text-blue-400" /> Mode Insight
            </h4>
            <p className="text-[10px] text-zinc-600 leading-relaxed italic">
                {activeMode.description}
            </p>
        </div>
      </div>

      {/* Right Content - Visualizations */}
      <div className="flex-1 relative flex items-center justify-center overflow-hidden">
        {/* The Globe */}
        <div className="w-[800px] h-[800px] relative">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_80%)] pointer-events-none z-10" />
            <canvas
                ref={canvasRef}
                style={{
                    width: 600,
                    height: 600,
                    maxWidth: "100%",
                    aspectRatio: 1,
                    filter: "drop-shadow(0 0 100px rgba(0,0,0,0.5))"
                }}
                className={cn(
                    "transition-all duration-1000",
                    isSearching ? "scale-110 opacity-100" : "scale-100 opacity-90"
                )}
            />
            
            {/* HUD Elements around globe */}
            <div className="absolute inset-0 pointer-events-none border border-zinc-900/50 rounded-full scale-125 opacity-20" />
            <div className="absolute inset-0 pointer-events-none border border-zinc-900/30 rounded-full scale-110" />
            
            <AnimatePresence>
                {isSearching && (
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute inset-0 flex items-center justify-center z-20"
                    >
                         <div className="relative w-full h-full flex items-center justify-center">
                            <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[700px] h-[700px] border border-dashed border-zinc-800/40 rounded-full"
                            />
                            <motion.div 
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                                className="absolute w-[750px] h-[750px] border border-dotted border-zinc-800/30 rounded-full"
                            />
                         </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Floating Stat Cards */}
        <div className="absolute bottom-8 right-8 flex flex-col gap-4 z-20">
             <div className="bg-zinc-950/80 border border-zinc-800/50 backdrop-blur-md p-4 rounded-2xl w-56 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Relay Integrity</span>
                    <span className="text-[10px] text-zinc-200 font-mono">99.8%</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ width: "99.8%" }}
                        className="h-full bg-green-500"
                    />
                </div>
             </div>
             <div className="bg-zinc-950/80 border border-zinc-800/50 backdrop-blur-md p-4 rounded-2xl w-56 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold">Latency</span>
                    <span className="text-[10px] text-zinc-200 font-mono">14ms</span>
                </div>
                <div className="h-1 bg-zinc-900 rounded-full overflow-hidden">
                    <motion.div 
                        animate={{ width: "12%" }}
                        className="h-full bg-blue-500"
                    />
                </div>
             </div>
        </div>

        {/* Global Markers Overlay */}
        <div className="absolute top-8 right-8 flex flex-col gap-2 z-20 text-right">
             <span className="text-[9px] text-zinc-600 font-bold uppercase tracking-widest">[ACTIVE_NODES]</span>
             {['SF_SHORE', 'LON_TOWER', 'TYO_VALLEY', 'STO_BASE'].map((node, i) => (
                 <div key={node} className="flex items-center justify-end gap-2 group cursor-crosshair">
                     <span className="text-[10px] text-zinc-500 group-hover:text-zinc-200 transition-colors uppercase tracking-tight">{node}</span>
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-800 group-hover:bg-blue-500 group-hover:animate-pulse transition-all shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
                 </div>
             ))}
        </div>
      </div>
    </div>
  );
};
