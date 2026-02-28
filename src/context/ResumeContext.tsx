import { createContext, useContext, type ReactNode } from 'react';
import type { ResumeState, ResumeData, TemplateId } from '@/types/resume';
import { useLocalStorage } from '@/hooks/use-local-storage';

const defaultResumeData: ResumeData = {
    personalInfo: {
        fullName: 'Laxmikant Varkal',
        email: 'laxmikant.varkal.jobs@gmail.com',
        phone: '+91 9325750978',
        github: 'https://github.com/LaxmikantVarkal1',
        linkedin: 'https://linkedin.com/in/laxmikant-varkal-489a8a1a5',
        portfolio: ''
    },
    summary: 'Frontend Engineer with 3.8 years of experience building scalable web applications using React. Experienced in developing industry-used SaaS solutions, implementing role-based access control, and improving operational efficiency through digitization. Seeking frontend opportunities in product-based companies.',
    experience: [
        {
            id: 'exp1',
            title: 'Software Engineer',
            company: 'Cumulus System',
            location: '',
            startDate: 'Feb 2022',
            endDate: 'Present',
            isCurrent: true,
            description: '• Developed scalable frontend features using React.\n• Built reusable and responsive UI components to improve maintainability.\n• Integrated REST APIs and handled data-driven UI updates.\n• Optimized application performance and resolved production issues.\n• Coordinated with QA and backend teams for smooth deployment cycles using Jenkins.'
        },
        {
            id: 'exp2',
            title: 'Web Developer Intern',
            company: 'Blueshelt Services LLP',
            location: '',
            startDate: 'Jun 2021',
            endDate: 'Sep 2021',
            isCurrent: false,
            description: '• Developed interactive web interfaces using React.js and modern HTML/CSS.\n• Improved user experience by implementing responsive design practices.'
        }
    ],
    projects: [
        {
            id: 'proj1',
            name: 'Garment Management System (Industry-Used Application)',
            technologies: 'React, Zustand, REST APIs, Netlify',
            link: 'https://laxmikantvarkal1.github.io/AVR-garment/',
            description: '• Developed and deployed a live garment management system used by a manufacturing business.\n• Implemented secure role-based access control (Admin, Manager, Staff).\n• Enabled real-time stock monitoring and order status updates.\n• Reduced manual errors and improved operational efficiency.\n• Deployed and maintained the application in a production environment.'
        }
    ],
    education: [
        {
            id: 'edu1',
            degree: 'B.Tech in Electronics Engineering',
            institution: 'Walchand Institute of Technology, Solapur',
            location: '',
            startDate: '2019',
            endDate: '2022',
            score: ''
        },
        {
            id: 'edu2',
            degree: 'Diploma in Electronics & Telecommunication',
            institution: 'Solapur Education Society Polytechnic',
            location: '',
            startDate: '2016',
            endDate: '2019',
            score: ''
        },
        {
            id: 'edu3',
            degree: 'SSC',
            institution: 'Ghodavari Prashala',
            location: '',
            startDate: '2015',
            endDate: '2016',
            score: ''
        }
    ],
    skills: [
        { id: 'skill1', category: 'Frontend', skills: 'ReactJS, Angular, JavaScript, TypeScript, HTML, CSS, SCSS' },
        { id: 'skill2', category: 'Tools', skills: 'Git, Jenkins, VS Code' },
        { id: 'skill3', category: 'AI Productivity Tools', skills: 'ChatGPT, GitHub Copilot, Antigravity IDE' },
        { id: 'skill4', category: 'Design', skills: 'Responsive Web Design, Figma' }
    ],
    certifications: [
        {
            id: 'cert1',
            title: 'Full Stack Web Development Bootcamp, Newton School',
            issuer: 'Newton School',
            date: '',
            description: 'Covered HTML, CSS, JavaScript, Java, React, and Bootstrap. Participated in coding contests and hands-on project development.'
        }
    ]
};

const defaultResumeState: ResumeState = {
    id: 'default',
    name: 'My Resume',
    lastModified: Date.now(),
    template: 'classic',
    data: defaultResumeData
};

interface ResumeContextType {
    resumeParams: ResumeState;
    updateResumeData: (data: Partial<ResumeData>) => void;
    updateTemplate: (template: TemplateId) => void;
}

const ResumeContext = createContext<ResumeContextType | undefined>(undefined);

export const ResumeProvider = ({ children }: { children: ReactNode }) => {
    const [resumeParams, setResumeParams] = useLocalStorage<ResumeState>('resume-data', defaultResumeState);

    const updateResumeData = (data: Partial<ResumeData>) => {
        setResumeParams((prev) => ({
            ...prev,
            lastModified: Date.now(),
            data: {
                ...prev.data,
                ...data
            }
        }));
    };

    const updateTemplate = (template: TemplateId) => {
        setResumeParams((prev) => ({
            ...prev,
            lastModified: Date.now(),
            template
        }));
    };

    return (
        <ResumeContext.Provider value={{ resumeParams, updateResumeData, updateTemplate }}>
            {children}
        </ResumeContext.Provider>
    );
};

export const useResume = () => {
    const context = useContext(ResumeContext);
    if (context === undefined) {
        throw new Error('useResume must be used within a ResumeProvider');
    }
    return context;
};
