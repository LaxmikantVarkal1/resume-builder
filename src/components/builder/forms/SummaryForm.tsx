import { useResume } from "@/context/ResumeContext";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export function SummaryForm() {
    const { resumeParams, updateResumeData } = useResume();
    const { summary } = resumeParams.data;

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        updateResumeData({ summary: e.target.value });
    };

    return (
        <section className="space-y-4">
            <div className="space-y-1">
                <Label htmlFor="summary">Summary</Label>
                <Textarea
                    id="summary"
                    name="summary"
                    value={summary}
                    onChange={handleChange}
                    placeholder="Results-driven software engineer with 5+ years of experience..."
                    rows={4}
                />
            </div>
        </section>
    );
}
