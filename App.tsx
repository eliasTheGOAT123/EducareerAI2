import React, { useState } from 'react';
import { LayoutDashboard, BookOpen, BrainCircuit, FileText, Briefcase, GraduationCap, Globe, ArrowLeft, ArrowRight } from 'lucide-react';
import Dashboard from './components/Dashboard';
import StudyBuddy from './components/Tools/StudyBuddy';
import QuizMaster from './components/Tools/QuizMaster';
import ResumeReview from './components/Tools/ResumeReview';
import MockInterview from './components/Tools/MockInterview';
import { ToolType } from './types';
import { LanguageProvider, useLanguage } from './contexts/LanguageContext';
import { aiService } from './services/aiService';

const AppContent: React.FC = () => {
  const [currentTool, setCurrentTool] = useState<ToolType>(ToolType.DASHBOARD);
  const { language, setLanguage, t, dir } = useLanguage();
  const isLiveMode = aiService.hasApiKey();

  const renderContent = () => {
    switch (currentTool) {
      case ToolType.DASHBOARD: return <Dashboard onNavigate={setCurrentTool} />;
      case ToolType.STUDY_BUDDY: return <StudyBuddy />;
      case ToolType.QUIZ_MASTER: return <QuizMaster />;
      case ToolType.RESUME_REVIEW: return <ResumeReview />;
      case ToolType.MOCK_INTERVIEW: return <MockInterview />;
      default: return <Dashboard onNavigate={setCurrentTool} />;
    }
  };

  const NavItem = ({ tool, icon: Icon, label }: { tool: ToolType; icon: any; label: string }) => (
    <button
      onClick={() => setCurrentTool(tool)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${
        currentTool === tool
          ? 'bg-primary-50 text-primary-700'
          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
      }`}
    >
      <Icon size={20} />
      <span>{label}</span>
    </button>
  );

  return (
    <div className="flex h-screen bg-slate-50" dir={dir}>
      {/* Sidebar (Desktop) */}
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col hidden md:flex flex-shrink-0">
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center gap-2 text-primary-600 font-bold text-xl">
            <GraduationCap size={28} />
            <span>EduCareer</span>
          </div>
        </div>
        
        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          <NavItem tool={ToolType.DASHBOARD} icon={LayoutDashboard} label={t.nav.dashboard} />
          
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.nav.studyTools}</div>
          <NavItem tool={ToolType.STUDY_BUDDY} icon={BookOpen} label={t.nav.studyBuddy} />
          <NavItem tool={ToolType.QUIZ_MASTER} icon={BrainCircuit} label={t.nav.quizMaster} />
          
          <div className="pt-4 pb-2 px-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">{t.nav.careerTools}</div>
          <NavItem tool={ToolType.RESUME_REVIEW} icon={FileText} label={t.nav.resumeReview} />
          <NavItem tool={ToolType.MOCK_INTERVIEW} icon={Briefcase} label={t.nav.mockInterview} />
        </nav>

        <div className="p-4 border-t border-slate-100 space-y-4">
          {/* Settings Area */}
          <div className="bg-slate-50 rounded-lg p-3 space-y-3">
             {/* Mode Indicator */}
             <div className="flex items-center justify-between text-sm border-b border-slate-200 pb-3 mb-2">
                <span className="text-slate-600 font-medium">{t.common.status}</span>
                <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold ${isLiveMode ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                   <div className={`w-2 h-2 rounded-full ${isLiveMode ? 'bg-emerald-500' : 'bg-amber-500'} ${isLiveMode && 'animate-pulse'}`}></div>
                   <span>{isLiveMode ? t.common.liveMode : t.common.demoMode}</span>
                </div>
             </div>

             {/* Language Toggle */}
             <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-slate-600">
                  <Globe size={16} />
                  <span>Language</span>
                </div>
                <div className="flex bg-slate-200 rounded p-1">
                  <button 
                    onClick={() => setLanguage('en')}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${language === 'en' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500'}`}
                  >
                    EN
                  </button>
                  <button 
                    onClick={() => setLanguage('ar')}
                    className={`px-2 py-0.5 rounded text-xs font-bold transition-all ${language === 'ar' ? 'bg-white shadow-sm text-primary-600' : 'text-slate-500'}`}
                  >
                    عربي
                  </button>
                </div>
             </div>
          </div>

          <div className="text-xs text-slate-400 text-center">
             {t.common.poweredBy}
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:hidden flex-shrink-0 z-20 relative">
           <div className="flex items-center gap-3">
             {currentTool !== ToolType.DASHBOARD ? (
               <button 
                 onClick={() => setCurrentTool(ToolType.DASHBOARD)}
                 className="p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
                 aria-label="Back"
               >
                 {dir === 'rtl' ? <ArrowRight size={24} /> : <ArrowLeft size={24} />}
               </button>
             ) : (
                <GraduationCap size={24} className="text-primary-600" />
             )}
             <span className="text-primary-600 font-bold text-lg truncate">EduCareer AI</span>
          </div>
          <div className="flex gap-3 items-center">
             <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold ${isLiveMode ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                <div className={`w-1.5 h-1.5 rounded-full ${isLiveMode ? 'bg-emerald-500' : 'bg-amber-500'}`}></div>
                <span className="hidden sm:inline">{isLiveMode ? 'LIVE' : 'DEMO'}</span>
             </div>

             <button onClick={() => setLanguage(language === 'en' ? 'ar' : 'en')} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs font-bold text-slate-700 border border-slate-200">
               {language === 'en' ? 'AR' : 'EN'}
             </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden p-4 md:p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;