import { useState, useRef, useCallback, useEffect } from "react";
// import { useResume } from "@/context/ResumeContext";
import { ChevronDown } from "lucide-react";

import { SummaryForm } from "./forms/SummaryForm";
import { PersonalInfoForm } from "./forms/PersonalInfoForm";
import { ExperienceForm } from "./forms/ExperienceForm";
import { ProjectsForm } from "./forms/ProjectsForm";
import { EducationForm } from "./forms/EducationForm";
import { SkillsForm } from "./forms/SkillsForm";
import { CertificationsForm } from "./forms/CertificationsForm";

function AccordionSection({ title, defaultOpen = false, children }: { title: string, defaultOpen?: boolean, children: React.ReactNode }) {
    const [isOpen, setIsOpen] = useState(defaultOpen);
    return (
        <div className="border border-border rounded-md overflow-hidden bg-white shadow-sm">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-50 hover:bg-gray-100 transition-colors pointer"
            >
                <span className="font-semibold text-primary-navy text-sm uppercase tracking-wider">{title}</span>
                <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}
            >
                <div className="p-4 border-t border-border">
                    {children}
                </div>
            </div>
        </div>
    );
}

export function BuilderSidebar() {
    // const { updateTemplate, resumeParams } = useResume();
    const [width, setWidth] = useState(500);
    const [isResizing, setIsResizing] = useState(false);
    const sidebarRef = useRef<HTMLElement>(null);

    const startResizing = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        setIsResizing(true);
    }, []);

    const stopResizing = useCallback(() => {
        setIsResizing(false);
    }, []);

    const resize = useCallback((e: MouseEvent) => {
        if (isResizing && sidebarRef.current) {
            let newWidth = e.clientX;
            if (newWidth < 320) newWidth = 320; // Min width
            if (newWidth > 800) newWidth = 800; // Max width
            setWidth(newWidth);
        }
    }, [isResizing]);

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', resize);
            window.addEventListener('mouseup', stopResizing);
            document.body.style.cursor = 'col-resize';
            document.body.style.userSelect = 'none';
        } else {
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        }

        return () => {
            window.removeEventListener('mousemove', resize);
            window.removeEventListener('mouseup', stopResizing);
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };
    }, [isResizing, resize, stopResizing]);

    return (
        <aside
            ref={sidebarRef}
            style={{ width: `${width}px` }}
            className={`w-full flex-shrink-0 bg-white border-none h-screen print:hidden relative flex flex-col ${isResizing ? 'transition-none' : 'transition-all duration-300 ease-in-out max-md:!w-full max-md:transition-none'}`}
        >
            <div className="overflow-y-auto w-full h-full custom-scrollbar">
                <div className="sticky top-0 z-10 backdrop-blur-md bg-white/90 border-b border-border/50 px-6 py-4 mb-6 flex flex-col gap-3">
                    <h1 className="text-2xl font-bold text-primary-navy">Resume Builder</h1>
                    {/* <div className="flex items-center gap-4 bg-gray-50 p-2 rounded-md border border-gray-100 shrink-0">
                        <span className="text-sm font-medium text-muted-foreground">Template:</span>
                        <label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
                            <input
                                type="radio"
                                name="template"
                                value="classic"
                                checked={resumeParams.template === 'classic'}
                                onChange={() => updateTemplate('classic')}
                                className="w-4 h-4 text-primary accent-primary"
                            />
                            Classic
                        </label>
                        <label className="flex items-center gap-1.5 cursor-pointer text-sm font-medium">
                            <input
                                type="radio"
                                name="template"
                                value="modern"
                                checked={resumeParams.template === 'modern'}
                                onChange={() => updateTemplate('modern')}
                                className="w-4 h-4 text-primary accent-primary"
                            />
                            Modern
                        </label>
                    </div> */}
                </div>

                <div className="px-6 pb-6">
                    <div className="space-y-4">
                        <AccordionSection title="Personal Information" defaultOpen={true}>
                            <PersonalInfoForm />
                        </AccordionSection>

                        <AccordionSection title="Professional Summary">
                            <SummaryForm />
                        </AccordionSection>

                        <AccordionSection title="Experience">
                            <ExperienceForm />
                        </AccordionSection>

                        <AccordionSection title="Projects">
                            <ProjectsForm />
                        </AccordionSection>

                        <AccordionSection title="Education">
                            <EducationForm />
                        </AccordionSection>

                        <AccordionSection title="Skills">
                            <SkillsForm />
                        </AccordionSection>

                        <AccordionSection title="Certifications">
                            <CertificationsForm />
                        </AccordionSection>
                    </div>
                </div>
            </div>

            {/* Resize Handle */}
            <div
                className="absolute bg-gray-200 right-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-primary/50 flex flex-col justify-center items-center z-20 group hidden md:flex"
                onMouseDown={startResizing}
            >
                <div className="h-8 w-1 rounded-full bg-border group-hover:bg-primary transition-colors duration-200" />
            </div>
        </aside>
    );
}
