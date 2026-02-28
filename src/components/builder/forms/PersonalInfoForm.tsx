import { useResume } from "@/context/ResumeContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoForm() {
    const { resumeParams, updateResumeData } = useResume();
    const { personalInfo } = resumeParams.data;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateResumeData({
            personalInfo: {
                ...personalInfo,
                [name]: value
            }
        });
    };

    return (
        <section className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" name="fullName" value={personalInfo.fullName} onChange={handleChange} placeholder="John Doe" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={personalInfo.email} onChange={handleChange} placeholder="john@example.com" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" name="phone" value={personalInfo.phone} onChange={handleChange} placeholder="+1 234 567 8900" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="linkedin">LinkedIn</Label>
                    <Input id="linkedin" name="linkedin" value={personalInfo.linkedin} onChange={handleChange} placeholder="linkedin.com/in/johndoe" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="github">GitHub</Label>
                    <Input id="github" name="github" value={personalInfo.github} onChange={handleChange} placeholder="github.com/johndoe" />
                </div>
                <div className="space-y-1">
                    <Label htmlFor="portfolio">Portfolio (Optional)</Label>
                    <Input id="portfolio" name="portfolio" value={personalInfo.portfolio} onChange={handleChange} placeholder="johndoe.com" />
                </div>
            </div>
        </section>
    );
}
