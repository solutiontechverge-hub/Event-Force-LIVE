"use client";

import dynamic from "next/dynamic";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageContentSkeleton } from "./LoadingSkeleton";

const FleetSection = dynamic(() => import("./FleetSection"), {
  loading: () => <PageContentSkeleton />,
});

const TestimonialsSection = dynamic(() => import("./TestimonialsSection"), {
  loading: () => <PageContentSkeleton />,
});

const BenefitsSection = dynamic(() => import("./BenefitsSection"), {
  loading: () => <PageContentSkeleton />,
});

const ContactSection = dynamic(() => import("./ContactSection"), {
  loading: () => <PageContentSkeleton />,
});

export function SuspenseFleetSection() {
  const { language } = useLanguage();
  return <FleetSection key={`fleet-${language}`} />;
}

export function SuspenseTestimonialsSection() {
  const { language } = useLanguage();
  return <TestimonialsSection key={`testimonials-${language}`} />;
}

export function SuspenseBenefitsSection() {
  const { language } = useLanguage();
  return <BenefitsSection key={`benefits-${language}`} />;
}

export function SuspenseContactSection() {
  const { language } = useLanguage();
  return <ContactSection key={`contact-${language}`} />;
}
