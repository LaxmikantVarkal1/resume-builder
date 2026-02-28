import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Trash2 } from "lucide-react";
import type { Certification } from "@/types/resume";

export function CertificationsForm() {
    const { resumeParams, updateResumeData } = useResume();
    const certifications = resumeParams.data.certifications || [];

    const addCertification = () => {
        const newCert: Certification = {
            id: Date.now().toString(),
            title: '',
            issuer: '',
            date: '',
            description: ''
        };
        updateResumeData({ certifications: [...certifications, newCert] });
    };

    const removeCertification = (id: string) => {
        updateResumeData({ certifications: certifications.filter(c => c.id !== id) });
    };

    const handleChange = (id: string, field: keyof Certification, value: string) => {
        updateResumeData({
            certifications: certifications.map(cert =>
                cert.id === id ? { ...cert, [field]: value } : cert
            )
        });
    };

    return (
        <section className="space-y-4">
            <div className="flex justify-between items-center border-b pb-2">
                <Button onClick={addCertification} variant="outline" size="sm" className="h-8 gap-1">
                    <Plus className="w-4 h-4" /> Add
                </Button>
            </div>

            <div className="space-y-6">
                {certifications.map((cert, index) => (
                    <div key={cert.id} className="p-4 border rounded-md space-y-4 relative bg-gray-50/50">
                        <div className="absolute top-2 right-2">
                            <Button variant="ghost" size="sm" onClick={() => removeCertification(cert.id)} className="text-destructive h-8 w-8 p-0">
                                <Trash2 className="w-4 h-4" />
                            </Button>
                        </div>
                        <h3 className="font-medium text-sm text-muted-foreground uppercase">Certification {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-1 md:col-span-2">
                                <Label>Title</Label>
                                <Input value={cert.title} onChange={e => handleChange(cert.id, 'title', e.target.value)} placeholder="AWS Certified Solutions Architect" />
                            </div>
                            <div className="space-y-1">
                                <Label>Issuer</Label>
                                <Input value={cert.issuer} onChange={e => handleChange(cert.id, 'issuer', e.target.value)} placeholder="Amazon Web Services" />
                            </div>
                            <div className="space-y-1">
                                <Label>Date / Year</Label>
                                <Input value={cert.date} onChange={e => handleChange(cert.id, 'date', e.target.value)} placeholder="2023" />
                            </div>
                            <div className="space-y-1 md:col-span-2">
                                <Label>Description (Optional)</Label>
                                <Textarea
                                    value={cert.description}
                                    onChange={e => handleChange(cert.id, 'description', e.target.value)}
                                    rows={3}
                                    placeholder="Brief description of the certification..."
                                />
                            </div>
                        </div>
                    </div>
                ))}
                {certifications.length === 0 && (
                    <p className="text-sm text-muted-foreground text-center py-4 border border-dashed rounded-md">No certifications added yet.</p>
                )}
            </div>
        </section>
    );
}
