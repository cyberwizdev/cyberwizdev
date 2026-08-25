"use client";

import Link from "@/components/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export function HeroSection({ className = "" }: HeroSectionProps) {
  return (
    <section
      className={`relative min-h-screen py-20 flex items-center justify-center overflow-hidden bg-black ${className}`}
    >
      {/* Cinematic Background Grid */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
          <div
            className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse"
          /></div>
          <div
            className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-3xl animate-pulse delay-2000"
          /></div>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur animate-spin-slow"
          /></div>
        </div>

        {/* Cinematic Vector Lines */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-cyan-500"></div>
          <div className="absolute top-0 right-0 w-px h-full bg-magenta-500"></div>
          <div className="absolute bottom-0 left-0 w-full h-px bg-cyan-500"></div>
          <div className="absolute bottom-0 right-0 w-px h-full bg-magenta-500"></div>
          <div className="absolute left-0 top-1/2 h-px w-full bg-cyan-500"></div>
          <div className="absolute right-0 top-1/2 h-px w-full bg-magenta-500"></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-6">
          {Array.from({ length: 36 }, (_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const delay = i * 0.1;
            const size = Math.random() * 4 + 2;
            return (
              <div
                key={i}
                className={`absolute bg-cyan-500/5 rounded-md opacity-0 hover:opacity-100 transition-opacity duration-300 ${
                  row % 2 === 0 ? "animate-pulse-slow" : "animate-pulse-slow delay-100"
                }`}
                style={{ width: size, height: size, top: row * 30, left: col * 20 }}
              />
            );
          })}
        </div>
      </div>

      {/* Floating Tech Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -left-4 w-32 h-32 rounded-full blur-2xl animate-float"></div>
        <div className="absolute -bottom-4 -right-4 w-24 h-24 rounded-full blur-2xl animate-float-delayed"></div>
        <div className="absolute top-1/3 left-1/4 w-16 h-16 rounded-full blur-2xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-16 h-16 rounded-full blur-2xl"></div>
        <div className="absolute -top-1/2 -left-1/2 w-32 h-32 rounded-full blur-2xl animate-spin-slow"></div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-7xl mx-auto">
        <p className="mb-8 text-lg text-gray-400">
          {"/* Transforming businesses with cutting-edge software solutions since 2016 */"}
        </p>

        <h1 className="text-5xl md:text-7xl lg:text-9xl font-bold text-white mb-6 leading-tight tracking-tight">
          Build{" "}
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500 from-20% via-40% to-80%">
            Future-Ready Software
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
          We craft custom software solutions that drive business growth. From web
          applications to enterprise systems, we turn your vision into reality.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg transform hover:scale-105 transition-all duration-300"
            asChild
          >
            <Link href="/contact">
              Start Your Project
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="group bg-white/10 backdrop-blur-sm border-cyan/30 text-white hover:bg-white/20 px-8 py-4 text-lg font-semibold rounded-xl"
            asChild
          >
            <Link href="#case-studies">
              View Success Stories
              <ArrowRight className="mr-2 h-5 w-5" />
            </Link>
          </Button>
        </div>

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
          <div className="text-center group">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M13 2L3 14h6l-1 9L23 2" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">500+</div>
            <div className="text-sm text-gray-400">Projects Delivered</div>
          </div>

          <div className="text-center group">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M22 21l-4-4" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">200+</div>
            <div className="text-sm text-gray-400">Happy Clients</div>
          </div>

          <div className="text-center group">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="20" x2="18" y2="10" />
                  <line x1="12" y1="20" x2="12" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="14" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">25+</div>
            <div className="text-sm text-gray-400">Countries</div>
          </div>

          <div className="text-center group">
            <div className="flex justify-center mb-2">
              <div className="p-3 bg-cyan-500/10 rounded-full group-hover:scale-110 transition-transform duration-300">
                <svg
                  className="w-6 h-6 text-cyan-400"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
            </div>
            <div className="text-3xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">8+</div>
            <div className="text-sm text-gray-400">Years Experience</div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-25px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes spin-slow {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        .animate-float { animation: float 8s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 10s ease-in-out infinite; }
        .animate-spin-slow { animation: spin-slow 25s linear infinite; }
        .bg-black {
          background: linear-gradient(180deg, #0a0a0f 0%, #0f0f1a 100%);
        }
      `}</style>
    </section>
  );
}