import React, { useState, useEffect } from 'react';
import { Language, CalendarTask } from '../types';
import { translations } from '../translations';
import { CROPS_DATA } from '../data/cropData';
import { 
  CalendarDays, 
  Plus, 
  Trash2, 
  CheckCircle, 
  Circle, 
  Clock, 
  Sparkles,
  Tag
} from 'lucide-react';

interface FarmingCalendarProps {
  lang: Language;
}

const STORAGE_KEY = 'farm_friend_calendar_tasks_v1';

export const FarmingCalendar: React.FC<FarmingCalendarProps> = ({ lang }) => {
  const t = translations[lang];

  const [tasks, setTasks] = useState<CalendarTask[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    // Default initial sample tasks
    const today = new Date().toISOString().split('T')[0];
    return [
      {
        id: 'initial-1',
        titleEn: 'Basal fertilizer application (DAP + Potash)',
        titleTe: 'ఆఖరి దుక్కిలో ఎరువులు వేయడం (డి.ఎ.పి + పొటాష్)',
        cropNameEn: 'Paddy',
        cropNameTe: 'వరి',
        date: today,
        category: 'fertilizer',
        isCompleted: false,
      },
      {
        id: 'initial-2',
        titleEn: 'Check blue & yellow sticky traps for pests',
        titleTe: 'పసుపు, నీలి జిగురు అట్టలను పరిశీలించడం',
        cropNameEn: 'Chilli',
        cropNameTe: 'మిరప',
        date: today,
        category: 'pesticide',
        isCompleted: true,
      }
    ];
  });

  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [selectedCropId, setSelectedCropId] = useState<string>('paddy');
  const [sowingDate, setSowingDate] = useState<string>(new Date().toISOString().split('T')[0]);

  // Form for custom task
  const [customTitle, setCustomTitle] = useState<string>('');
  const [customDate, setCustomDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [customCategory, setCustomCategory] = useState<CalendarTask['category']>('fertilizer');

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch (e) {
      console.error(e);
    }
  }, [tasks]);

  const handleToggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    const newTask: CalendarTask = {
      id: `task-${Date.now()}`,
      titleEn: customTitle,
      titleTe: customTitle,
      date: customDate,
      category: customCategory,
      isCompleted: false,
    };

    setTasks((prev) => [newTask, ...prev]);
    setCustomTitle('');
  };

  const handleAutoGenerate = () => {
    const crop = CROPS_DATA.find((c) => c.id === selectedCropId);
    if (!crop) return;

    const baseDate = new Date(sowingDate);

    const addDays = (days: number) => {
      const d = new Date(baseDate);
      d.setDate(d.getDate() + days);
      return d.toISOString().split('T')[0];
    };

    const generated: CalendarTask[] = [
      {
        id: `auto-${Date.now()}-1`,
        titleEn: `Sowing & Basal Fertilizer for ${crop.nameEn}`,
        titleTe: `${crop.nameTe} విత్తుకోవడం మరియు ప్రాథమిక దుక్కి ఎరువులు`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(0),
        category: 'sowing',
        isCompleted: true,
      },
      {
        id: `auto-${Date.now()}-2`,
        titleEn: `First Weeding & Thinning operation`,
        titleTe: `మొదటి కలుపు తీత మరియు మొక్కల సాంద్రత సవరణ`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(20),
        category: 'weeding',
        isCompleted: false,
      },
      {
        id: `auto-${Date.now()}-3`,
        titleEn: `1st Top Dressing with Urea & Weed inspection`,
        titleTe: `మొదటి దఫా యూరియా ఎరువు వేయడం & పైరు పరిశీలన`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(35),
        category: 'fertilizer',
        isCompleted: false,
      },
      {
        id: `auto-${Date.now()}-4`,
        titleEn: `Pheromone Traps & Neem oil spray for pest prevention`,
        titleTe: `లింగాకర్షక బుట్టలు ఏర్పాటు & వేపనూనె నివారణ పిచికారీ`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(50),
        category: 'pesticide',
        isCompleted: false,
      },
      {
        id: `auto-${Date.now()}-5`,
        titleEn: `Critical stage irrigation & Boron micronutrient spray`,
        titleTe: `పూత దశలో ప్రాణరక్షక తడి & బోరాన్ సూక్ష్మపోషకం పిచికారీ`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(70),
        category: 'irrigation',
        isCompleted: false,
      },
      {
        id: `auto-${Date.now()}-6`,
        titleEn: `Harvest preparation & Stop irrigation`,
        titleTe: `పంట కోత సన్నాహాలు & తడులు నిలిపివేయడం`,
        cropNameEn: crop.nameEn,
        cropNameTe: crop.nameTe,
        date: addDays(115),
        category: 'harvest',
        isCompleted: false,
      },
    ];

    setTasks((prev) => [...generated, ...prev]);
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === 'pending') return !t.isCompleted;
    if (filter === 'completed') return t.isCompleted;
    return true;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl p-5 sm:p-6 shadow-sm border border-farm-200">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-farm-950 flex items-center gap-2">
            <CalendarDays className="w-6 h-6 text-farm-600" />
            <span>{t.calendar.title}</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            {t.calendar.subtitle}
          </p>
        </div>

        {/* Auto-generator card */}
        <div className="mt-6 bg-farm-50/70 border border-farm-200 rounded-2xl p-5">
          <h3 className="text-sm font-bold text-farm-950 flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-farm-600" />
            <span>{t.calendar.autoGenerateTitle}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                {t.calendar.selectCrop}
              </label>
              <select
                value={selectedCropId}
                onChange={(e) => setSelectedCropId(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium"
              >
                {CROPS_DATA.map((c) => (
                  <option key={c.id} value={c.id}>
                    {lang === 'te' ? c.nameTe : c.nameEn}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                {t.calendar.sowingDate}
              </label>
              <input
                type="date"
                value={sowingDate}
                onChange={(e) => setSowingDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-medium"
              >
              </input>
            </div>

            <div className="flex items-end">
              <button
                onClick={handleAutoGenerate}
                className="w-full py-2.5 px-4 bg-farm-600 hover:bg-farm-700 active:scale-95 text-white font-bold text-xs sm:text-sm rounded-xl transition"
              >
                {t.calendar.generateBtn}
              </button>
            </div>
          </div>
        </div>

        {/* Add custom task */}
        <form onSubmit={handleAddTask} className="mt-6 bg-slate-50 rounded-2xl p-4 sm:p-5 border border-slate-200">
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-3">
            {t.calendar.addNewTask}
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="sm:col-span-2">
              <input
                type="text"
                placeholder={t.calendar.taskTitle}
                value={customTitle}
                onChange={(e) => setCustomTitle(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium"
              />
            </div>

            <div>
              <input
                type="date"
                value={customDate}
                onChange={(e) => setCustomDate(e.target.value)}
                className="w-full bg-white border border-slate-300 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-medium"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-slate-800 hover:bg-slate-900 text-white font-bold text-xs sm:text-sm rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>{t.calendar.addTaskBtn}</span>
              </button>
            </div>
          </div>
        </form>

        {/* Task List Header & Filter */}
        <div className="mt-8">
          <div className="flex items-center justify-between border-b border-slate-200 pb-3">
            <h3 className="font-bold text-base text-slate-900">
              {t.calendar.upcomingTasks} ({filteredTasks.length})
            </h3>

            <div className="flex items-center space-x-1.5 text-xs">
              {(['all', 'pending', 'completed'] as const).map((mode) => (
                <button
                  key={mode}
                  onClick={() => setFilter(mode)}
                  className={`px-3 py-1 rounded-lg font-semibold transition ${
                    filter === mode
                      ? 'bg-farm-600 text-white'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
                  }`}
                >
                  {mode === 'all'
                    ? t.calendar.filterAll
                    : mode === 'pending'
                    ? t.calendar.filterPending
                    : t.calendar.filterCompleted}
                </button>
              ))}
            </div>
          </div>

          {/* Task Items */}
          <div className="mt-4 space-y-2.5">
            {filteredTasks.length === 0 ? (
              <p className="text-center py-8 text-xs sm:text-sm text-slate-500">
                {t.calendar.noTasks}
              </p>
            ) : (
              filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className={`flex items-center justify-between p-3.5 sm:p-4 rounded-2xl border transition ${
                    task.isCompleted
                      ? 'bg-slate-50/80 border-slate-200 text-slate-400 line-through'
                      : 'bg-white border-slate-200 hover:border-farm-300 shadow-xs'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleToggleTask(task.id)}
                      className="text-farm-600 hover:scale-110 transition"
                    >
                      {task.isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-farm-600" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400" />
                      )}
                    </button>

                    <div>
                      <span className="block text-xs sm:text-sm font-bold text-slate-800">
                        {lang === 'te' ? task.titleTe : task.titleEn}
                      </span>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          <span>{task.date}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold uppercase text-[10px]">
                          {task.category}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleDeleteTask(task.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete task"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
