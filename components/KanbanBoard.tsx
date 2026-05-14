import React from 'react';
import { Task, Agent } from '../types';

export const KanbanBoard = ({ tasks, agents }: { tasks: Task[], agents: Agent[] }) => {
  const columns = ['backlog', 'todo', 'doing', 'review', 'done'] as const;

  return (
    <div className="flex gap-4 h-full overflow-x-auto pb-4 snap-x text-sm">
      {columns.map(col => {
        const colTasks = tasks.filter(t => t.status === col);
        return (
          <div key={col} className="w-[280px] shrink-0 flex flex-col gap-3 snap-start bg-zinc-900/30 p-2 rounded-xl border border-zinc-800/50">
            <div className="flex items-center justify-between px-2 pt-1 uppercase text-[10px] font-bold tracking-wider text-zinc-500">
              {col}
              <span className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded-md">{colTasks.length}</span>
            </div>
            
            <div className="flex flex-col gap-2 flex-1 overflow-y-auto">
              {colTasks.map(task => (
                <div key={task.id} className="bg-zinc-900 border border-zinc-800 p-3 rounded-lg shadow-sm">
                  <h4 className="font-medium text-zinc-200 mb-2 leading-snug">{task.title}</h4>
                  {task.assigneeId && (
                    <div className="flex items-center gap-1.5 mt-2 text-[10px] font-mono text-zinc-400">
                      <span className="w-1.5 h-1.5 rounded-full border border-zinc-600 bg-transparent flex items-center justify-center overflow-hidden">
                         <span className="w-1 h-1 bg-green-500 rounded-full"></span>
                      </span>
                      {agents.find(a => a.id === task.assigneeId)?.name || 'Unknown'}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};
