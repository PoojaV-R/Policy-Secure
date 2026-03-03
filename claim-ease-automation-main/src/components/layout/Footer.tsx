import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const links = {
    product: [
      { label: "Features", path: "/" },
      { label: "How It Works", path: "/" },
      { label: "Pricing", path: "/" },
      { label: "Security", path: "/" },
    ],
    company: [
      { label: "About Us", path: "/" },
      { label: "Careers", path: "/" },
      { label: "Blog", path: "/" },
      { label: "Press", path: "/" },
    ],
    support: [
      { label: "Help Center", path: "/" },
      { label: "Contact Us", path: "/" },
      { label: "Status", path: "/" },
      { label: "API Docs", path: "/" },
    ],
    legal: [
      { label: "Privacy Policy", path: "/" },
      { label: "Terms of Service", path: "/" },
      { label: "Cookie Policy", path: "/" },
      { label: "GDPR", path: "/" },
    ],
  };

  return (
    <footer className="bg-foreground text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-12 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 gradient-primary rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display font-bold text-xl">PolicySecure</span>
            </Link>
            <p className="text-primary-foreground/70 text-sm leading-relaxed mb-6">
              Simplifying insurance claims with AI-powered automation. Faster
              processing, better outcomes.
            </p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Mail className="w-4 h-4" />
                <span>support@policysecure.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <Phone className="w-4 h-4" />
                <span>1-800-POLICY-AI</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-primary-foreground/70">
                <MapPin className="w-4 h-4" />
                <span>San Francisco, CA</span>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3">
              {links.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-sm text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50">
            © 2024 PolicySecure. All rights reserved.
          </p>
          <p className="text-sm text-primary-foreground/50">
            Built with AI 🤖 • Powered by Trust 🛡️
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
