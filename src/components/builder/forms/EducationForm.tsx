import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { Education } from "@/types/resume";

export function EducationForm() {
    const { resumeParams, updateResumeData } = useResume();
    const { education } = resumeParams.data;

    const addEducation = () => {
        const newEdu: Education = {
            id: Date.now().toString(),
            degree: '',
            institution: '',
            location: '',
            startDate: '',
            endDate: '',
            score: ''
        };
        updateResumeData({ education: [...education, newEdu] });
    };

    const removeEducation = (id: string) => {
        updateResumeData({ education: education.filter(e => e.id !== id) });
    };

    const handleChange = (id: string, field: keyof Education, value: string) => {
        updateResumeData({
            education: education.map(edu =>
                edu.id === id ? { ...edu, [field]: value } : edu
            )
        });
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <Button onClick={addEducation} variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </div>

            <div className="space-y-6">
                {education.map((edu, index) => (
                    <div key={edu.id} className="p-4 border rounded-md space-y-4 relative bg-gray-50/50">
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => removeEducation(edu.id)} className="text-destructive h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Education {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 md:col-span-2">
                                <Label>Degree or Certification</Label>
                                <Input value={edu.degree} onChange={e => handleChange(edu.id, 'degree', e.target.value)} placeholder="B.Tech in Computer Science" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Institution / School</Label>
                                <Input value={edu.institution} onChange={e => handleChange(edu.id, 'institution', e.target.value)} placeholder="University Name" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Location</Label>
                                <Input value={edu.location} onChange={e => handleChange(edu.id, 'location', e.target.value)} placeholder="City, State" />
                            </div>
                            <div className="space-y-1">
                                <Label>Start Date</Label>
                                <Input value={edu.startDate} onChange={e => handleChange(edu.id, 'startDate', e.target.value)} placeholder="2018" />
                            </div>
                            <div className="space-y-1">
                                <Label>End Date</Label>
                                <Input value={edu.endDate} onChange={e => handleChange(edu.id, 'endDate', e.target.value)} placeholder="2022" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Score / GPA (Optional)</Label>
                                <Input value={edu.score} onChange={e => handleChange(edu.id, 'score', e.target.value)} placeholder="3.8/4.0 or 90%" />
                            </div>
                        </div>
                    </div>
                ))}
                {education.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No education added yet.</p>
                )}
            </div>
        </section>
    );
}
