import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ClaimWizard from "@/components/claim/ClaimWizard";
import ChatBot from "@/components/chat/ChatBot";

const FileClaim = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
              File a New Claim
            </span>
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Let's Get Your Claim Started
            </h1>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Follow our simple step-by-step process. Our AI will guide you and
              validate your documents automatically.
            </p>
          </div>
          <ClaimWizard />
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default FileClaim;
