'use client'

import { ArrowDown, Github, Linkedin, Mail } from 'lucide-react'

export default function Hero() {
    const scrollToSection = (id: string) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden px-4">
            {/* Animated background gradient orbs */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            <div className="relative z-10 text-center max-w-4xl mx-auto fade-in">
                {/* Profile Image */}
                <div className="mb-8 inline-block">
                    <div className="w-32 h-32 rounded-full glass p-1 mx-auto">
                        <div className="w-full h-full rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-4xl font-bold">
                            YN
                        </div>
                    </div>
                </div>

                {/* Greeting */}
                <h2 className="text-lg md:text-xl text-text-secondary mb-4">
                    Hi, I&apos;m
                </h2>

                {/* Name */}
                <h1 className="text-5xl md:text-7xl font-bold mb-4">
                    <span className="gradient-text">Your Name</span>
                </h1>

                {/* Title */}
                <p className="text-2xl md:text-4xl font-semibold mb-6 text-text-primary">
                    Full Stack Developer
                </p>

                {/* Tagline */}
                <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
                    I build innovative web applications with modern technologies.
                    Passionate about creating seamless user experiences and scalable solutions.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                    <button
                        onClick={() => scrollToSection('projects')}
                        className="px-8 py-4 gradient-bg text-white font-semibold rounded-full hover:scale-105 transition-smooth shadow-lg shadow-primary/50"
                    >
                        View Projects
                    </button>
                    <button
                        onClick={() => scrollToSection('contact')}
                        className="px-8 py-4 glass hover:bg-hover-bg font-semibold rounded-full transition-smooth"
                    >
                        Contact Me
                    </button>
                </div>

                {/* Social Links */}
                <div className="flex gap-6 justify-center mb-12">
                    <a
                        href="https://github.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-hover-bg hover:scale-110 transition-smooth"
                        aria-label="GitHub"
                    >
                        <Github className="w-5 h-5" />
                    </a>
                    <a
                        href="https://linkedin.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-hover-bg hover:scale-110 transition-smooth"
                        aria-label="LinkedIn"
                    >
                        <Linkedin className="w-5 h-5" />
                    </a>
                    <a
                        href="mailto:your.email@example.com"
                        className="w-12 h-12 glass rounded-full flex items-center justify-center hover:bg-hover-bg hover:scale-110 transition-smooth"
                        aria-label="Email"
                    >
                        <Mail className="w-5 h-5" />
                    </a>
                </div>

                {/* Scroll Indicator */}
                <button
                    onClick={() => scrollToSection('about')}
                    className="animate-bounce inline-block p-2 rounded-full hover:bg-hover-bg transition-smooth"
                    aria-label="Scroll to about section"
                >
                    <ArrowDown className="w-6 h-6" />
                </button>
            </div>
        </section>
    )
}
