export default function About() {
    return (
        <section id="about" className="min-h-screen flex items-center justify-center px-4 py-20">
            <div className="max-w-6xl mx-auto w-full">
                <div className="glass p-8 md:p-12">
                    {/* Section Header */}
                    <div className="text-center mb-12">
                        <h2 className="text-4xl md:text-5xl font-bold mb-4">
                            About <span className="gradient-text">Me</span>
                        </h2>
                        <div className="w-20 h-1 gradient-bg mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Image Side */}
                        <div className="order-2 md:order-1">
                            <div className="relative">
                                <div className="w-full aspect-square rounded-2xl bg-gradient-to-br from-primary to-accent p-1">
                                    <div className="w-full h-full rounded-2xl bg-background flex items-center justify-center">
                                        <div className="text-8xl font-bold gradient-text">YN</div>
                                    </div>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary/20 rounded-full blur-2xl"></div>
                                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-accent/20 rounded-full blur-2xl"></div>
                            </div>
                        </div>

                        {/* Content Side */}
                        <div className="order-1 md:order-2 space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-text-primary">
                                Hi! I&apos;m a Full Stack Developer
                            </h3>

                            <p className="text-text-secondary leading-relaxed">
                                With a passion for creating innovative web applications, I specialize in building
                                scalable and user-friendly solutions using modern technologies.
                            </p>

                            <p className="text-text-secondary leading-relaxed">
                                I have experience working with various frameworks and tools, from frontend development
                                with React and Next.js to backend systems with Node.js and databases like PostgreSQL.
                            </p>

                            <p className="text-text-secondary leading-relaxed">
                                When I&apos;m not coding, you can find me exploring new technologies, contributing to
                                open-source projects, or sharing my knowledge with the developer community.
                            </p>

                            {/* Key Stats */}
                            <div className="grid grid-cols-3 gap-4 pt-6">
                                <div className="text-center p-4 glass rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">10+</div>
                                    <div className="text-sm text-text-muted">Projects</div>
                                </div>
                                <div className="text-center p-4 glass rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">3+</div>
                                    <div className="text-sm text-text-muted">Years Exp</div>
                                </div>
                                <div className="text-center p-4 glass rounded-lg">
                                    <div className="text-3xl font-bold gradient-text mb-1">50+</div>
                                    <div className="text-sm text-text-muted">Technologies</div>
                                </div>
                            </div>

                            {/* Download Resume */}
                            <div className="pt-6">
                                <a
                                    href="/resume.pdf"
                                    download
                                    className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white font-semibold rounded-full hover:scale-105 transition-smooth shadow-lg shadow-primary/30"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
