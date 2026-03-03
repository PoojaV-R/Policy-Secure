import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Zap, Clock, CheckCircle } from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: Clock, value: "3 min", label: "Average filing time" },
    { icon: Zap, value: "24 hrs", label: "Claim processing" },
    { icon: CheckCircle, value: "95%", label: "Approval rate" },
  ];

  return (
    <section className="relative min-h-screen flex items-center gradient-hero overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl animate-pulse-soft" />
        <div className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl animate-pulse-soft" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 pt-24 pb-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8"
          >
            <Shield className="w-4 h-4" />
            <span>AI-Powered Insurance Claims</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
          >
            File Claims{" "}
            <span className="gradient-primary bg-clip-text text-transparent">
              Faster
            </span>
            ,<br />
            Get Paid{" "}
            <span className="gradient-secondary bg-clip-text text-transparent">
              Sooner
            </span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Our AI-powered platform simplifies insurance claims with intelligent
            document processing, real-time tracking, and instant support.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
          >
            <Button asChild variant="hero" size="xl">
              <Link to="/file-claim">
                Start Your Claim
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="hero-outline" size="xl">
              <Link to="/dashboard">View Dashboard</Link>
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl bg-card shadow-card"
              >
                <stat.icon className="w-8 h-8 text-primary mb-3" />
                <span className="font-display text-3xl font-bold text-foreground mb-1">
                  {stat.value}
                </span>
                <span className="text-sm text-muted-foreground">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
