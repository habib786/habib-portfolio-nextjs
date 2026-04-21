"use client";

import {
  Mail,
  Clock,
  Calendar,
  MessageSquare,
  Code,
  MapPin,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { motion } from "framer-motion";

const contactMethods = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@habibfarooq.com",
    href: "mailto:contact@habibfarooq.com",
    description: "Send me an email anytime",
    accent: "border-teal-500/20",
    iconBg: "bg-teal-500/10",
    iconColor: "text-teal-600",
  },
  {
    icon: MessageSquare,
    title: "LinkedIn",
    value: "linkedin.com/in/habibfarooq",
    href: "https://linkedin.com/in/habibfarooq",
    description: "Connect professionally",
    accent: "border-blue-500/20",
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-600",
  },
  {
    icon: Code,
    title: "GitHub",
    value: "github.com/habibfarooq",
    href: "https://github.com/habibfarooq",
    description: "View my projects",
    accent: "border-yellow-500/20",
    iconBg: "bg-yellow-500/10",
    iconColor: "text-yellow-600",
  },
];

const availability = [
  {
    icon: Clock,
    title: "Response Time",
    value: "Within 24 hours",
    description: "Typically respond within a day",
  },
  {
    icon: Calendar,
    title: "Working Hours",
    value: "Mon - Fri, 9AM - 6PM EST",
    description: "Available for meetings",
  },
  {
    icon: MapPin,
    title: "Location",
    value: "Remote - Worldwide",
    description: "Available for remote work",
  },
];

const projectTypes = [
  "Web Applications",
  "SaaS Products",
  "AI Solutions",
  "E-commerce Platforms",
  "API Development",
  "Performance Optimization",
  "Code Reviews",
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function ContactInfo() {
  const handleScheduleCall = () => {
    window.open("https://calendly.com/habibfarooq/30min", "_blank");
  };

  return (
    <motion.div
      className="space-y-10"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Contact Methods */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-8 bg-primary rounded-full" />
          <h2 className="text-2xl font-black tracking-tight uppercase">
            Contact <span className="text-primary">Details</span>
          </h2>
        </div>

        <div className="space-y-4">
          {contactMethods.map((method) => {
            const Icon = method.icon;
            return (
              <motion.a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={itemVariants}
                className={`flex items-start gap-5 p-5 rounded-2xl border ${method.accent} bg-white dark:bg-zinc-900/50 hover:bg-zinc-50 dark:hover:bg-zinc-900 transition-all group relative overflow-hidden`}
              >
                {/* Subtle gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                <div
                  className={`p-3.5 rounded-xl ${method.iconBg} ${method.iconColor} ring-1 ring-inset ring-white/10`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-lg mb-0.5">{method.title}</h3>
                    <ChevronRight className="h-4 w-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-primary" />
                  </div>
                  <p className="text-primary font-medium hover:underline decoration-2 underline-offset-4">
                    {method.value}
                  </p>
                  <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                    {method.description}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>

      {/* Availability Card */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl border border-primary/10 bg-gradient-to-br from-white to-zinc-50 dark:from-zinc-900/50 dark:to-zinc-900 shadow-sm"
      >
        <div className="flex items-center gap-2 mb-6">
          <div className="w-1.5 h-6 bg-yellow-400 rounded-full" />
          <h3 className="text-lg font-bold tracking-tight">Availability</h3>
        </div>
        <div className="space-y-6">
          {availability.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex items-start gap-4">
                  <div className="p-2.5 rounded-xl bg-primary/5 text-primary ring-1 ring-primary/10">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-zinc-900 dark:text-zinc-100">
                      {item.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {item.description}
                    </div>
                  </div>
                </div>
                <div className="font-medium text-sm text-primary bg-primary/5 px-3 py-1 rounded-full border border-primary/10 whitespace-nowrap">
                  {item.value}
                </div>
              </div>
            );
          })}
        </div>
      </motion.div>

      {/* Project Types */}
      <motion.div
        variants={itemVariants}
        className="p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/50 dark:bg-zinc-900/30 backdrop-blur-sm shadow-sm"
      >
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1.5 h-6 bg-teal-500 rounded-full" />
          <h3 className="text-lg font-bold tracking-tight uppercase">
            Core <span className="text-teal-600">Expertise</span>
          </h3>
        </div>
        <div className="flex flex-wrap gap-2">
          {projectTypes.map((type) => (
            <span
              key={type}
              className="px-3.5 py-1.5 rounded-xl bg-primary/5 text-primary text-xs font-semibold border border-primary/10 hover:bg-primary/10 transition-colors"
            >
              {type}
            </span>
          ))}
        </div>
      </motion.div>

      {/* Schedule Call CTA */}
      <motion.div
        variants={itemVariants}
        className="p-8 rounded-2xl bg-zinc-900 text-white relative overflow-hidden group shadow-xl"
      >
        {/* Background blobs for premium feel */}
        <div className="absolute top-0 end-0 -me-20 -mt-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl group-hover:bg-primary/30 transition-colors duration-500" />
        <div className="absolute bottom-0 start-0 -ms-16 -mb-16 w-32 h-32 bg-yellow-500/10 rounded-full blur-2xl" />

        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 rounded-2xl bg-white/10 backdrop-blur-md ring-1 ring-white/20">
              <Calendar className="h-7 w-7 text-yellow-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold tracking-tight">
                Schedule a Call
              </h3>
              <p className="text-zinc-400 text-sm mt-0.5">
                Let's discuss your project requirements
              </p>
            </div>
          </div>
          <Button
            onClick={handleScheduleCall}
            className="w-full bg-white text-zinc-900 hover:bg-zinc-100 h-14 rounded-xl text-lg font-bold transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Book a 30-minute Call
          </Button>
          <p className="text-xs text-zinc-500 mt-4 text-center font-medium">
            Strictly limited slots available for this month
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
