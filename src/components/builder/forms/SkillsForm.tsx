import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import type { SkillGroup } from "@/types/resume";

export function SkillsForm() {
    const { resumeParams, updateResumeData } = useResume();
    const { skills } = resumeParams.data;

    const addSkillGroup = () => {
        const newGroup: SkillGroup = {
            id: Date.now().toString(),
            category: '',
            skills: ''
        };
        updateResumeData({ skills: [...skills, newGroup] });
    };

    const removeSkillGroup = (id: string) => {
        updateResumeData({ skills: skills.filter(s => s.id !== id) });
    };

    const handleChange = (id: string, field: keyof SkillGroup, value: string) => {
        updateResumeData({
            skills: skills.map(skill =>
                skill.id === id ? { ...skill, [field]: value } : skill
            )
        });
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <Button onClick={addSkillGroup} variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </div>

            <div className="space-y-4">
                {skills.map((skillGroup, index) => (
                    <div key={skillGroup.id} className="p-4 border rounded-md space-y-4 relative bg-gray-50/50">
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => removeSkillGroup(skillGroup.id)} className="text-destructive h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Skill Group {index + 1}</h3>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-1">
                                <Label>Category (e.g., Frontend, Backend)</Label>
                                <Input value={skillGroup.category} onChange={e => handleChange(skillGroup.id, 'category', e.target.value)} placeholder="Frontend" />
                            </div>
                            <div className="space-y-1">
                                <Label>Skills (Comma-separated)</Label>
                                <Input value={skillGroup.skills} onChange={e => handleChange(skillGroup.id, 'skills', e.target.value)} placeholder="React, TypeScript, Tailwind" />
                            </div>
                        </div>
                    </div>
                ))}
                {skills.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No skills added yet.</p>
                )}
            </div>
        </section>
    );
}
