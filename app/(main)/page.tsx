import { Metadata } from "next";
import { TestimonialSection } from "@/components/testimonial";
import { HeroSection } from "@/components/hero";
import { TechnologyStack } from "@/components/stack";
import { ServicesSection } from "@/components/services";
import { ProjectsSection } from "@/components/projects-section";
import { WhyChooseUsSection } from "@/components/why-choose-us";
import { CTASection } from "@/components/cta";

export const metadata: Metadata = {
  title: "Transform Your Business with Custom Software Solutions | CyberWizDev",
  description:
    "Leading software development company specializing in web development, mobile apps, cloud solutions, and digital transformation. 500+ successful projects delivered worldwide.",
  keywords: [
    "custom software development",
    "web development",
    "mobile app development",
    "cloud solutions",
    "digital transformation",
    "enterprise software",
    "startup solutions",
    "tech consulting",
  ],
};

const technologies = [
  { name: "React", color: "bg-blue-500" },
  { name: "Next.js", color: "bg-black" },
  { name: "Node.js", color: "bg-green-600" },
  { name: "Python", color: "bg-yellow-500" },
  { name: "AWS", color: "bg-orange-500" },
  { name: "Docker", color: "bg-blue-600" },
  { name: "MongoDB", color: "bg-green-500" },
  { name: "TypeScript", color: "bg-blue-700" },
];

const caseStudies = [
  {
    title: "Groove Music Studios - Creative Digital Experience",
    description:
      "Designed and developed an immersive portfolio website showcasing music production services with interactive audio elements and modern aesthetics",
    results: "300% increase in client inquiries",
    category: "Creative Portfolio",
    duration: "2 months",
    icon: "🎵",
    href: "https://groovemusic.ca",
  },
  {
    title: "Dipo Resort - Luxury Hospitality Platform",
    description: "Created a comprehensive digital presence for a premium resort featuring booking systems, virtual tours, and guest experience management",
    results: "450% boost in direct bookings",
    category: "Hospitality & Tourism",
    duration: "4 months", 
    icon: "🏖️",
    href: "https://diporesort.com",
  },
  {
    title: "Jemai Interiors - Sophisticated Design Showcase",
    description: "Crafted an elegant portfolio platform highlighting interior design projects with dynamic galleries and client testimonial integration",
    results: "250% growth in project requests",
    category: "Interior Design",
    duration: "3 months",
    icon: "🏡",
    href: "https://www.jemai.xyz",
  },
];

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CyberWizDev",
    url: "https://cyberwizdev.com.ng",
    logo: "https://cyberwizdev.com.ng/logo.png",
    description:
      "Leading software development company specializing in web development, mobile apps, cloud solutions, and digital transformation.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+234-703-312-8149",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://www.facebook.com/cyberwizdev",
      "https://www.twitter.com/cyberwizdev",
      "https://www.linkedin.com/company/cyberwizdev",
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "150",
    },
  };

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <HeroSection />

      <TechnologyStack technologies={technologies} />

      <ServicesSection />

      <ProjectsSection />

      <CaseStudiesSection caseStudies={caseStudies} />

      <WhyChooseUsSection />

      <TestimonialSection />

      <CTASection />
    </div>
  );
}
