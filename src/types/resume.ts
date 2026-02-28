export interface PersonalInfo {
    fullName: string;
    email: string;
    phone: string;
    github: string;
    linkedin: string;
    portfolio: string;
}

export interface Experience {
    id: string;
    title: string;
    company: string;
    location: string;
    startDate: string;
    endDate: string;
    isCurrent: boolean;
    description: string; // Bullet points separated by newlines
}

export interface Education {
    id: string;
    degree: string;
    institution: string;
    location: string;
    startDate: string;
    endDate: string;
    score: string;
}

export interface SkillGroup {
    id: string;
    category: string; // e.g., "Frontend", "Backend"
    skills: string; // Comma-separated or general string
}

export interface Project {
    id: string;
    name: string;
    technologies: string;
    link: string;
    description: string;
}

export interface Certification {
    id: string;
    title: string;
    issuer: string;
    date: string;
    description: string;
}

export interface ResumeData {
    personalInfo: PersonalInfo;
    summary: string;
    experience: Experience[];
    projects: Project[];
    education: Education[];
    skills: SkillGroup[];
    certifications: Certification[];
}

export type TemplateId = 'classic' | 'modern';

export interface ResumeState {
    id: string;
    name: string; // Name of the profile/resume
    lastModified: number;
    template: TemplateId;
    data: ResumeData;
}
