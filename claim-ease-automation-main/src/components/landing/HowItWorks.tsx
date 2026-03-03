import { motion } from "framer-motion";
import { Upload, Brain, CheckCircle2, Wallet } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      step: "01",
      title: "Submit Your Claim",
      description:
        "Fill out a simple form and upload your supporting documents. Our AI validates everything instantly.",
      color: "primary",
    },
    {
      icon: Brain,
      step: "02",
      title: "AI Assessment",
      description:
        "Our intelligent system analyzes your claim, checks for completeness, and calculates coverage automatically.",
      color: "secondary",
    },
    {
      icon: CheckCircle2,
      step: "03",
      title: "Quick Review",
      description:
        "Claims are prioritized and fast-tracked. Complex cases get expert attention when needed.",
      color: "accent",
    },
    {
      icon: Wallet,
      step: "04",
      title: "Get Paid",
      description:
        "Once approved, receive your settlement directly to your preferred payment method.",
      color: "success",
    },
  ];

  return (
    <section className="py-24 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium mb-4"
          >
            Simple Process
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            How It Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-muted-foreground max-w-2xl mx-auto"
          >
            Four simple steps from filing to payment. No paperwork, no waiting,
            no hassle.
          </motion.p>
        </div>

        {/* Steps */}
        <div className="relative">
          {/* Connection Line */}
          <div className="hidden lg:block absolute top-24 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-0.5 bg-gradient-to-r from-primary via-secondary to-success" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                <div className="flex flex-col items-center text-center">
                  {/* Icon Circle */}
                  <div
                    className={`relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${
                      step.color === "primary"
                        ? "gradient-primary"
                        : step.color === "secondary"
                        ? "gradient-secondary"
                        : step.color === "accent"
                        ? "gradient-accent"
                        : "bg-success"
                    } shadow-lg`}
                  >
                    <step.icon className="w-7 h-7 text-primary-foreground" />
                    {/* Step Number */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-card shadow-md flex items-center justify-center text-xs font-bold text-foreground">
                      {step.step}
                    </span>
                  </div>

                  {/* Content */}
                  <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
