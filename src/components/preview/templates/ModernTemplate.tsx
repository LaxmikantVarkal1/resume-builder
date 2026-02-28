import { useResume } from "@/context/ResumeContext";
import { Mail, Phone, ExternalLink, Github, Linkedin, MapPin } from "lucide-react";

export function ModernTemplate() {
    const { resumeParams } = useResume();
    const { personalInfo, summary, experience, education, skills, projects, certifications } = resumeParams.data;

    return (
        <div className="font-sans flex min-h-[1056px] bg-white border border-gray-100 shadow-sm leading-relaxed text-gray-800 print:border-none print:shadow-none">
            {/* Left Sidebar */}
            <aside className="w-[30%] bg-primary-navy text-white p-8 space-y-8 h-full min-h-[1056px] print:h-auto">
                {/* Contact Info */}
                <section className="space-y-4">
                    <h2 className="text-xl font-bold tracking-wider uppercase border-b border-white/20 pb-2 text-primary">Contact</h2>
                    <ul className="space-y-3 text-sm text-gray-200">
                        {personalInfo.email && (
                            <li className="flex items-start gap-3">
                                <Mail className="w-4 h-4 mt-0.5 text-primary" />
                                <span className="break-all">{personalInfo.email}</span>
                            </li>
                        )}
                        {personalInfo.phone && (
                            <li className="flex items-start gap-3">
                                <Phone className="w-4 h-4 mt-0.5 text-primary" />
                                <span>{personalInfo.phone}</span>
                            </li>
                        )}
                        {personalInfo.github && (
                            <li className="flex items-start gap-3">
                                <Github className="w-4 h-4 mt-0.5 text-primary" />
                                <span className="break-all">{personalInfo.github.replace('https://', '')}</span>
                            </li>
                        )}
                        {personalInfo.linkedin && (
                            <li className="flex items-start gap-3">
                                <Linkedin className="w-4 h-4 mt-0.5 text-primary" />
                                <span className="break-all">{personalInfo.linkedin.replace('https://', '').replace('www.', '')}</span>
                            </li>
                        )}
                        {personalInfo.portfolio && (
                            <li className="flex items-start gap-3">
                                <ExternalLink className="w-4 h-4 mt-0.5 text-primary" />
                                <span className="break-all">{personalInfo.portfolio.replace('https://', '')}</span>
                            </li>
                        )}
                    </ul>
                </section>

                {/* Skills */}
                {skills.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold tracking-wider uppercase border-b border-white/20 pb-2 text-primary">Skills</h2>
                        <div className="space-y-4 text-sm">
                            {skills.map(group => (
                                <div key={group.id}>
                                    <h3 className="font-semibold text-white mb-1">{group.category}</h3>
                                    <p className="text-gray-300">{group.skills}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Education */}
                {education.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold tracking-wider uppercase border-b border-white/20 pb-2 text-primary">Education</h2>
                        <div className="space-y-5 text-sm">
                            {education.map(edu => (
                                <div key={edu.id}>
                                    <h3 className="font-semibold text-white">{edu.degree}</h3>
                                    <p className="text-primary mt-1 font-medium">{edu.institution}</p>
                                    <p className="text-gray-400 mt-1">{edu.startDate} – {edu.endDate}</p>
                                    {edu.location && <p className="text-gray-300 mt-1">{edu.location}</p>}
                                    {edu.score && <p className="text-gray-400 mt-0.5">Score: {edu.score}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Certifications */}
                {certifications && certifications.length > 0 && (
                    <section className="space-y-4">
                        <h2 className="text-xl font-bold tracking-wider uppercase border-b border-white/20 pb-2 text-primary">Certifications</h2>
                        <div className="space-y-5 text-sm">
                            {certifications.map(cert => (
                                <div key={cert.id}>
                                    <h3 className="font-semibold text-white">{cert.title}</h3>
                                    <p className="text-primary mt-1 font-medium">{cert.issuer}</p>
                                    {cert.date && <p className="text-gray-400 mt-1">{cert.date}</p>}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </aside>

            {/* Right Main Content */}
            <main className="w-[70%] p-10 bg-[#FAFAFA] h-full min-h-[1056px] print:bg-white print:h-auto">
                {/* Header */}
                <header className="mb-10">
                    <h1 className="text-5xl font-extrabold text-primary-navy tracking-tight uppercase mb-2">
                        {personalInfo.fullName || 'YOUR NAME'}
                    </h1>
                    {/* Add a generic subtitle if possible, or just a decorative bar */}
                    <div className="w-16 h-1.5 bg-primary mt-4"></div>
                </header>

                {/* Summary */}
                {summary && (
                    <section className="mb-10">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-primary-navy uppercase tracking-widest mb-4">
                            Profile
                        </h2>
                        <p className="text-gray-600 leading-relaxed text-justify whitespace-pre-wrap">
                            {summary}
                        </p>
                    </section>
                )}

                {/* Experience */}
                {experience.length > 0 && (
                    <section className="mb-6">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-primary-navy uppercase tracking-widest mb-4">
                            Experience
                        </h2>
                        <div className="space-y-6">
                            {experience.map(exp => (
                                <div key={exp.id} className="relative pl-6 border-l-2 border-gray-200">
                                    {/* Timeline dot */}
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 border-2 border-white"></div>

                                    <div className="mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{exp.title}</h3>
                                        <div className="flex flex-wrap items-center gap-x-2 text-primary-navy font-semibold text-sm mt-0.5">
                                            <span>{exp.company}</span>
                                            <span className="text-gray-400">•</span>
                                            <span className="text-gray-500 font-medium">{exp.startDate} – {exp.endDate}</span>
                                        </div>
                                        {exp.location && (
                                            <div className="flex items-center text-gray-500 text-sm mt-0.5">
                                                <MapPin className="w-3.5 h-3.5 mr-1" />
                                                {exp.location}
                                            </div>
                                        )}
                                    </div>
                                    {exp.description && (
                                        <ul className="list-none space-y-1.5 text-gray-600 mt-2">
                                            {exp.description.split('\n').map((bullet, i) => {
                                                const text = bullet.replace('•', '').trim();
                                                return text ? (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-primary mr-2 mt-0.5 font-bold">•</span>
                                                        <span>{text}</span>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Projects */}
                {projects && projects.length > 0 && (
                    <section className="mb-6">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-primary-navy uppercase tracking-widest mb-4">
                            Projects
                        </h2>
                        <div className="space-y-6">
                            {projects.map(proj => (
                                <div key={proj.id} className="relative pl-6 border-l-2 border-gray-200">
                                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1.5 border-2 border-white"></div>
                                    <div className="mb-2">
                                        <h3 className="text-xl font-bold text-gray-900">{proj.name}</h3>
                                        <div className="flex flex-wrap items-center gap-x-2 text-primary-navy font-semibold text-sm mt-0.5">
                                            {proj.technologies && <span>{proj.technologies}</span>}
                                            {proj.technologies && proj.link && <span className="text-gray-400">•</span>}
                                            {proj.link && (
                                                <a href={proj.link} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline text-primary-navy">
                                                    <ExternalLink className="w-3.5 h-3.5" /> Link
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                    {proj.description && (
                                        <ul className="list-none space-y-1.5 text-gray-600 mt-2">
                                            {proj.description.split('\n').map((bullet, i) => {
                                                const text = bullet.replace('•', '').trim();
                                                return text ? (
                                                    <li key={i} className="flex items-start">
                                                        <span className="text-primary mr-2 mt-0.5 font-bold">•</span>
                                                        <span>{text}</span>
                                                    </li>
                                                ) : null;
                                            })}
                                        </ul>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </div>
    );
}
