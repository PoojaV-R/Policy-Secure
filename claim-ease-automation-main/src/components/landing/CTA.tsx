import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 bg-muted/50 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center p-12 md:p-16 rounded-3xl bg-card shadow-lg border border-border"
        >
          <div className="w-16 h-16 gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Ready to Transform Your
            <br />
            Claims Experience?
          </h2>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-10">
            Join thousands of customers and insurance providers who trust
            ClaimFlow for faster, smarter claims processing.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button asChild variant="hero" size="xl">
              <Link to="/file-claim">
                Start Your Claim
                <ArrowRight className="w-5 h-5" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="xl">
              <Link to="/admin">For Insurance Companies</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;
