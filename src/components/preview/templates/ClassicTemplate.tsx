import { useResume } from "@/context/ResumeContext";
import { Mail, Phone, ExternalLink, Github, Linkedin } from "lucide-react";

export function ClassicTemplate() {
    const { resumeParams } = useResume();
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeParams.data;

    return (
        <div className="font-serif p-10 bg-white min-h-[1056px] text-gray-900 border border-gray-100 shadow-sm leading-tight print:border-none print:shadow-none">
            {/* ------------ Header ------------ */}
            <header className="text-center mb-6 border-b border-gray-400 pb-4">
                <h1 className="text-3xl font-bold mb-2 uppercase tracking-wide">{personalInfo.fullName || 'YOUR NAME'}</h1>

                <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-sm text-gray-700">
                    {personalInfo.email && (
                        <div className="flex items-center gap-1">
                            <Mail className="w-3.5 h-3.5" />
                            <a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a>
                        </div>
                    )}
                    {personalInfo.phone && (
                        <div className="flex items-center gap-1">
                            <Phone className="w-3.5 h-3.5" />
                            <span>{personalInfo.phone}</span>
                        </div>
                    )}
                    {personalInfo.github && (
                        <div className="flex items-center gap-1">
                            <Github className="w-3.5 h-3.5" />
                            <a href={`https://${personalInfo.github}`} target="_blank" rel="noreferrer">{personalInfo.github.replace('https://', '')}</a>
                        </div>
                    )}
                    {personalInfo.linkedin && (
                        <div className="flex items-center gap-1">
                            <Linkedin className="w-3.5 h-3.5" />
                            <a href={`https://${personalInfo.linkedin}`} target="_blank" rel="noreferrer">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</a>
                        </div>
                    )}
                    {personalInfo.portfolio && (
                        <div className="flex items-center gap-1">
                            <ExternalLink className="w-3.5 h-3.5" />
                            <a href={`https://${personalInfo.portfolio}`} target="_blank" rel="noreferrer">{personalInfo.portfolio.replace('https://', '')}</a>
                        </div>
                    )}
                </div>
            </header>

            {/* ------------ Summary ------------ */}
            {summary && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Professional Summary</h2>
                    <p className="text-sm text-gray-800 text-justify leading-relaxed whitespace-pre-wrap">{summary}</p>
                </section>
            )}

            {/* ------------ Skills ------------ */}
            {skills.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Technical Skills</h2>
                    <div className="space-y-1">
                        {skills.map(group => (
                            <div key={group.id} className="text-sm">
                                <span className="font-bold">{group.category}:</span> <span className="text-gray-800">{group.skills}</span>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ------------ Experience ------------ */}
            {experience.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Professional Experience</h2>
                    <div className="space-y-4">
                        {experience.map(exp => (
                            <div key={exp.id}>
                                <div className="flex justify-between items-baseline mb-1 text-sm">
                                    <h3 className="font-bold">{exp.title}</h3>
                                    <span className="font-medium text-gray-700">{exp.startDate} – {exp.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline mb-2 text-sm italic text-gray-700">
                                    <span>{exp.company}</span>
                                    <span>{exp.location}</span>
                                </div>
                                {exp.description && (
                                    <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-1">
                                        {exp.description.split('\n').map((bullet, i) => (
                                            bullet.trim() ? <li key={i}>{bullet.replace('•', '').trim()}</li> : null
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ------------ Projects ------------ */}
            {projects && projects.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Projects</h2>
                    <div className="space-y-4">
                        {projects.map(proj => (
                            <div key={proj.id}>
                                <div className="flex justify-between items-baseline mb-1 text-sm">
                                    <h3 className="font-bold">{proj.name}</h3>
                                    {proj.link && (
                                        <a href={proj.link} target="_blank" rel="noreferrer" className="text-primary-navy hover:underline flex items-center gap-1">
                                            <ExternalLink className="w-3 h-3" /> Link
                                        </a>
                                    )}
                                </div>
                                {proj.technologies && (
                                    <div className="mb-2 text-sm italic text-gray-700">
                                        {proj.technologies}
                                    </div>
                                )}
                                {proj.description && (
                                    <ul className="list-disc list-outside ml-4 text-sm text-gray-800 space-y-1">
                                        {proj.description.split('\n').map((bullet, i) => (
                                            bullet.trim() ? <li key={i}>{bullet.replace('•', '').trim()}</li> : null
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ------------ Education ------------ */}
            {education.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Education</h2>
                    <div className="space-y-3">
                        {education.map(edu => (
                            <div key={edu.id}>
                                <div className="flex justify-between items-baseline text-sm mb-0.5">
                                    <h3 className="font-bold">{edu.degree}</h3>
                                    <span className="font-medium text-gray-700">{edu.startDate} – {edu.endDate}</span>
                                </div>
                                <div className="flex justify-between items-baseline text-sm text-gray-700">
                                    <span>{edu.institution}{edu.location ? `, ${edu.location}` : ''}</span>
                                    {edu.score && <span>{edu.score}</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* ------------ Certifications ------------ */}
            {certifications && certifications.length > 0 && (
                <section className="mb-5">
                    <h2 className="text-lg font-bold border-b border-gray-400 uppercase tracking-wider mb-2">Certifications</h2>
                    <div className="space-y-3">
                        {certifications.map(cert => (
                            <div key={cert.id} className="text-sm">
                                <div className="flex justify-between items-baseline mb-0.5">
                                    <h3 className="font-bold">{cert.title}</h3>
                                    {cert.date && <span className="font-medium text-gray-700">{cert.date}</span>}
                                </div>
                                <div className="text-gray-700 mb-1">{cert.issuer}</div>
                                {cert.description && <p className="text-gray-800 text-justify">{cert.description}</p>}
                            </div>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}
