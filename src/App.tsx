import { useState } from "react";
import { BuilderSidebar } from "./components/builder/BuilderSidebar";
import { ResumePreview } from "./components/preview/ResumePreview";
import { Button } from "./components/ui/button";
import { Eye, Edit2 } from "lucide-react";

export function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="flex w-full h-screen bg-background text-foreground overflow-hidden print:overflow-visible print:h-auto print:block print:bg-white relative">
            {/* Sidebar Container */}
            <div className={`md:block ${isSidebarOpen ? 'block' : 'hidden'} absolute md:relative z-40 w-full md:w-auto h-full print:hidden`}>
                <BuilderSidebar />
            </div>

            {/* Preview Container */}
            <div className={`flex-1 min-w-0 w-full md:flex ${!isSidebarOpen ? 'flex' : 'hidden'} h-full print:h-auto flex-col print:block`}>
                <ResumePreview />
            </div>

            {/* Mobile Toggle FAB (Floating Action Button) */}
            <div className="md:hidden fixed bottom-6 right-6 z-50 print:hidden">
                <Button
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    size="icon"
                    className="w-14 h-14 rounded-full shadow-2xl bg-primary text-black hover:bg-primary/90"
                >
                    {isSidebarOpen ? <Eye className="w-6 h-6" /> : <Edit2 className="w-6 h-6" />}
                </Button>
            </div>
        </div>
    );
}

export default App;