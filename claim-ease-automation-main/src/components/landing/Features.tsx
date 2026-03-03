import { motion } from "framer-motion";
import {
  FileSearch,
  Bot,
  BarChart3,
  ShieldCheck,
  Globe,
  Bell,
  Scan,
  Users,
} from "lucide-react";

const Features = () => {
  const customerFeatures = [
    {
      icon: FileSearch,
      title: "Smart Document Upload",
      description:
        "AI-powered OCR automatically extracts and validates information from your documents.",
    },
    {
      icon: Bot,
      title: "24/7 AI Assistant",
      description:
        "Get instant guidance and answers to your questions with our intelligent chatbot.",
    },
    {
      icon: Bell,
      title: "Real-Time Tracking",
      description:
        "Stay informed with live status updates and notifications at every step.",
    },
    {
      icon: Globe,
      title: "Multilingual Support",
      description:
        "File claims in your preferred language with full translation support.",
    },
  ];

  const insurerFeatures = [
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description:
        "Monitor performance metrics and gain insights with comprehensive analytics.",
    },
    {
      icon: ShieldCheck,
      title: "Fraud Detection",
      description:
        "AI-powered risk assessment identifies suspicious patterns automatically.",
    },
    {
      icon: Scan,
      title: "Auto Classification",
      description:
        "Intelligent document sorting and claim categorization saves hours of work.",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description:
        "Priority-based workflows ensure efficient handling by the right team members.",
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-24 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
          >
            Powerful Features
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Built for Everyone
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Whether you're filing a claim or processing one, our platform
            delivers a seamless experience.
          </motion.p>
        </div>

        {/* Customer Features */}
        <div className="mb-20">
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-xl font-semibold text-foreground mb-8 flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Users className="w-5 h-5 text-primary-foreground" />
            </span>
            For Customers
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {customerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 border border-transparent hover:border-primary/20"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Insurer Features */}
        <div>
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="font-display text-xl font-semibold text-foreground mb-8 flex items-center gap-3"
          >
            <span className="w-10 h-10 rounded-lg gradient-secondary flex items-center justify-center">
              <ShieldCheck className="w-5 h-5 text-secondary-foreground" />
            </span>
            For Insurance Companies
          </motion.h3>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {insurerFeatures.map((feature, index) => (
              <motion.div
                key={index}
                variants={item}
                className="group p-6 rounded-2xl bg-card shadow-card hover:shadow-card-hover transition-all duration-300 border border-transparent hover:border-secondary/20"
              >
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-secondary" />
                </div>
                <h4 className="font-display text-lg font-semibold text-foreground mb-2">
                  {feature.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Features;
