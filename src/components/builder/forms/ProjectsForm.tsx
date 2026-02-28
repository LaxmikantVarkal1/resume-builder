import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Project } from "@/types/resume";

export function ProjectsForm() {
    const { resumeParams, updateResumeData } = useResume();
    const projects = resumeParams.data.projects || [];

    const addProject = () => {
        const newProject: Project = {
            id: Date.now().toString(),
            name: '',
            technologies: '',
            link: '',
            description: ''
        };
        updateResumeData({ projects: [...projects, newProject] });
    };

    const removeProject = (id: string) => {
        updateResumeData({ projects: projects.filter(p => p.id !== id) });
    };

    const handleChange = (id: string, field: keyof Project, value: string) => {
        updateResumeData({
            projects: projects.map(proj =>
                proj.id === id ? { ...proj, [field]: value } : proj
            )
        });
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <Button onClick={addProject} variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </div>

            <div className="space-y-6">
                {projects.map((proj, index) => (
                    <div key={proj.id} className="p-4 border rounded-md space-y-4 relative bg-gray-50/50">
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => removeProject(proj.id)} className="text-destructive h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Project {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 md:col-span-2">
                                <Label>Project Name</Label>
                                <Input value={proj.name} onChange={e => handleChange(proj.id, 'name', e.target.value)} placeholder="Garment Management System" />
                            </div>
                            <div className="space-y-1">
                                <Label>Technologies</Label>
                                <Input value={proj.technologies} onChange={e => handleChange(proj.id, 'technologies', e.target.value)} placeholder="React, Node.js" />
                            </div>
                            <div className="space-y-1">
                                <Label>Link (Optional)</Label>
                                <Input value={proj.link} onChange={e => handleChange(proj.id, 'link', e.target.value)} placeholder="github.com/project" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Description (Bullets separated by newlines)</Label>
                                <Textarea
                                    value={proj.description}
                                    onChange={e => handleChange(proj.id, 'description', e.target.value)}
                                    rows={4}
                                    placeholder="• Built authentication flow...&#10;• Reduced load times by 20%..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No projects added yet.</p>
                )}
            </div>
        </section>
    );
}
