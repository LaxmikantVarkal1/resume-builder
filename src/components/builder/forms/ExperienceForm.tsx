import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Experience } from "@/types/resume";

export function ExperienceForm() {
    const { resumeParams, updateResumeData } = useResume();
    const { experience } = resumeParams.data;

    const addExperience = () => {
        const newExp: Experience = {
            id: Date.now().toString(),
            title: '',
            company: '',
            location: '',
            startDate: '',
            endDate: '',
            isCurrent: false,
            description: ''
        };
        updateResumeData({ experience: [...experience, newExp] });
    };

    const removeExperience = (id: string) => {
        updateResumeData({ experience: experience.filter(e => e.id !== id) });
    };

    const handleChange = (id: string, field: keyof Experience, value: string | boolean) => {
        updateResumeData({
            experience: experience.map(exp =>
                exp.id === id ? { ...exp, [field]: value } : exp
            )
        });
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <Button onClick={addExperience} variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </div>

            <div className="space-y-6">
                {experience.map((exp, index) => (
                    <div key={exp.id} className="p-4 border rounded-md space-y-4 relative bg-gray-50/50">
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => removeExperience(exp.id)} className="text-destructive h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Experience {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1">
                                <Label>Job Title</Label>
                                <Input value={exp.title} onChange={e => handleChange(exp.id, 'title', e.target.value)} placeholder="Software Engineer" />
                            </div>
                            <div className="space-y-1">
                                <Label>Company</Label>
                                <Input value={exp.company} onChange={e => handleChange(exp.id, 'company', e.target.value)} placeholder="Google" />
                            </div>
                            <div className="space-y-1">
                                <Label>Start Date</Label>
                                <Input value={exp.startDate} onChange={e => handleChange(exp.id, 'startDate', e.target.value)} placeholder="Jan 2020" />
                            </div>
                            <div className="space-y-1">
                                <Label>End Date</Label>
                                <Input value={exp.endDate} onChange={e => handleChange(exp.id, 'endDate', e.target.value)} placeholder="Present" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Location</Label>
                                <Input value={exp.location} onChange={e => handleChange(exp.id, 'location', e.target.value)} placeholder="San Francisco, CA" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Description (Bullets separated by newlines)</Label>
                                <Textarea
                                    value={exp.description}
                                    onChange={e => handleChange(exp.id, 'description', e.target.value)}
                                    rows={4}
                                    placeholder="• Developed full-stack features..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {experience.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No experience added yet.</p>
                )}
            </div>
        </section>
    );
}
