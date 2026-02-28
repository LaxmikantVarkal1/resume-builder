import { useResume } from "@/context/ResumeContext";
import { ClassicTemplate } from "./templates/ClassicTemplate";
import { Button } from "@/components/ui/button";
import { Printer, ZoomIn, ZoomOut, Maximize } from "lucide-react";
import { ModernTemplate } from "./templates/ModernTemplate";
import { useEffect, useRef, useState, useCallback } from "react";

export function ResumePreview() {
    const { resumeParams } = useResume();
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [scale, setScale] = useState(1);
    const [isAutoFit, setIsAutoFit] = useState(true);

    const fitToScreen = useCallback(() => {
        if (containerRef.current) {
            // Use 32px padding instead of 64px to make it slightly larger on small screens
            const availableWidth = containerRef.current.clientWidth - 32;
            const A4_WIDTH_PX = 794;

            if (availableWidth < A4_WIDTH_PX) {
                setScale(availableWidth / A4_WIDTH_PX);
            } else {
                setScale(1);
            }
        }
    }, []);

    useEffect(() => {
        if (isAutoFit) {
            fitToScreen();
        }

        const resizeObserver = new ResizeObserver(() => {
            if (isAutoFit) fitToScreen();
        });

        if (containerRef.current) {
            resizeObserver.observe(containerRef.current);
        }

        return () => {
            resizeObserver.disconnect();
        };
    }, [isAutoFit, fitToScreen]);

    const handlePrint = () => {
        window.print();
    };

    const zoomIn = () => {
        setIsAutoFit(false);
        setScale(prev => Math.min(prev + 0.1, 2)); // Max 200%
    };

    const zoomOut = () => {
        setIsAutoFit(false);
        setScale(prev => Math.max(prev - 0.1, 0.3)); // Min 30%
    };

    const enableAutoFit = () => {
        setIsAutoFit(true);
        fitToScreen();
    };

    return (
        <main className="flex-1 bg-gray-200 h-screen overflow-hidden relative print:bg-white print:h-auto print:overflow-visible flex flex-col min-w-0 w-full">
            {/* Top Bar - Hidden when printing */}
            <div className="sticky top-0 z-10 w-full bg-white border-b border-border p-4 flex justify-between items-center print:hidden shadow-sm shrink-0 flex-nowrap gap-2 overflow-x-auto custom-scrollbar">
                <h2 className="text-lg font-semibold text-primary-navy hidden sm:block shrink-0">Preview</h2>

                {/* Zoom Controls */}
                <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-md shrink-0 mx-auto">
                    <Button variant="ghost" size="icon" onClick={zoomOut} className="h-8 w-8 rounded-md shrink-0" title="Zoom Out">
                        <ZoomOut className="w-4 h-4 text-gray-700" />
                    </Button>
                    <span className="text-sm font-medium w-12 text-center text-gray-700 shrink-0">
                        {Math.round(scale * 100)}%
                    </span>
                    <Button variant="ghost" size="icon" onClick={zoomIn} className="h-8 w-8 rounded-md shrink-0" title="Zoom In">
                        <ZoomIn className="w-4 h-4 text-gray-700" />
                    </Button>
                    <div className="w-px h-4 bg-gray-300 mx-1 shrink-0"></div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={enableAutoFit}
                        className={`h-8 px-2 text-xs rounded-md shrink-0 ${isAutoFit ? 'bg-white shadow-sm font-medium text-primary-navy' : 'text-gray-600'}`}
                        title="Fit to Screen"
                    >
                        <Maximize className="w-3.5 h-3.5 mr-1" /> Fit
                    </Button>
                </div>

                <Button onClick={handlePrint} className="gap-2 bg-primary text-black hover:bg-primary/90 shrink-0">
                    <Printer className="w-4 h-4" />
                    <span className="hidden sm:inline">Print</span>
                </Button>
            </div>

            {/* A4 Wrapper Scrollable Area */}
            <div
                ref={containerRef}
                className="flex-1 w-full h-full overflow-auto custom-scrollbar print:overflow-visible print:h-auto print:p-0 print:m-0 print:block p-4 sm:p-8 relative"
            >
                <div
                    className="flex justify-center print:block print:!min-w-0 print:!min-h-0"
                    // Container needs to artificially hold the size of the *scaled* content so scrollbars are accurate
                    style={{
                        minWidth: `${794 * scale}px`,
                        minHeight: contentRef.current ? `${contentRef.current.offsetHeight * scale}px` : `${1122 * scale}px`
                    }}
                >
                    <div
                        style={{
                            transform: `scale(${scale})`,
                            transformOrigin: 'top center',
                        }}
                        className="transition-transform duration-200 ease-out origin-top block"
                    >
                        <div ref={contentRef} className="w-[210mm] min-h-[297mm] bg-white shadow-xl content-wrapper print:shadow-none print:w-[210mm] print:min-h-[297mm] print:mx-auto print:!transform-none">
                            {resumeParams.template === 'classic' ? <ClassicTemplate /> : <ModernTemplate />}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}
