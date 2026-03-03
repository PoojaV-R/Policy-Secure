import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Send,
  Bot,
  User,
  Sparkles,
  Minimize2,
} from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm PolicySecure AI, your virtual claims assistant. How can I help you today?",
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const quickResponses = [
    "How do I file a claim?",
    "Check claim status",
    "What documents do I need?",
    "Speak to an agent",
  ];

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("file") || lowerMessage.includes("submit") || lowerMessage.includes("start")) {
      return "To file a claim, simply click on 'File Claim' in the navigation or the button on the homepage. Our step-by-step wizard will guide you through the process. You'll need your policy number, incident details, and any supporting documents.";
    }
    if (lowerMessage.includes("status") || lowerMessage.includes("track")) {
      return "You can check your claim status in your Dashboard. Each claim shows its current stage: Submitted, Under Review, Approved, or Settled. You'll also receive email notifications for any updates!";
    }
    if (lowerMessage.includes("document") || lowerMessage.includes("upload")) {
      return "For most claims, you'll need: 1) Photos of the damage, 2) A copy of the incident report (if applicable), 3) Receipts or estimates for repairs, and 4) Any relevant medical records for health claims. Our AI will help validate your documents automatically.";
    }
    if (lowerMessage.includes("agent") || lowerMessage.includes("human") || lowerMessage.includes("speak")) {
      return "I'd be happy to connect you with a human agent! Our support team is available 24/7. You can call 1-800-CLAIM-AI or I can request a callback for you. Would you like me to arrange that?";
    }
    if (lowerMessage.includes("time") || lowerMessage.includes("long") || lowerMessage.includes("fast")) {
      return "Most claims are processed within 24-48 hours thanks to our AI-powered system. Simple claims can be approved in as little as 3 hours! Complex cases may take up to 5 business days for thorough review.";
    }
    if (lowerMessage.includes("denied") || lowerMessage.includes("reject")) {
      return "If your claim was denied, don't worry! You can appeal the decision by providing additional documentation or clarification. Go to your Dashboard, select the claim, and click 'Appeal Decision'. I can help guide you through the process.";
    }
    
    return "I understand you're asking about '" + userMessage + "'. While I'm still learning, I can help with filing claims, checking status, document requirements, and connecting you with our support team. What would you like to know more about?";
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(input),
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickResponse = (text: string) => {
    setInput(text);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 w-14 h-14 gradient-primary rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-shadow z-50"
          >
            <MessageCircle className="w-6 h-6 text-primary-foreground" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-accent-foreground" />
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
              height: isMinimized ? "auto" : "600px",
            }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 w-[380px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-lg border border-border overflow-hidden z-50 flex flex-col"
          >
            {/* Header */}
            <div className="gradient-primary p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                <h3 className="font-semibold text-primary-foreground">
                  PolicySecure AI
                </h3>
                  <p className="text-xs text-primary-foreground/80">
                    Always here to help
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                >
                  <Minimize2 className="w-4 h-4 text-primary-foreground" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-primary-foreground/20 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${
                        message.role === "user" ? "flex-row-reverse" : ""
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-primary/10"
                            : "gradient-secondary"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-primary" />
                        ) : (
                          <Bot className="w-4 h-4 text-secondary-foreground" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl ${
                          message.role === "user"
                            ? "bg-primary text-primary-foreground rounded-tr-sm"
                            : "bg-muted text-foreground rounded-tl-sm"
                        }`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}

                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full gradient-secondary flex items-center justify-center">
                        <Bot className="w-4 h-4 text-secondary-foreground" />
                      </div>
                      <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                        <div className="flex gap-1">
                          <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                          <span
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          />
                          <span
                            className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  )}

                  <div ref={messagesEndRef} />
                </div>

                {/* Quick Responses */}
                {messages.length === 1 && (
                  <div className="px-4 pb-2">
                    <p className="text-xs text-muted-foreground mb-2">
                      Quick questions:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {quickResponses.map((text, index) => (
                        <button
                          key={index}
                          onClick={() => handleQuickResponse(text)}
                          className="text-xs px-3 py-1.5 rounded-full bg-muted hover:bg-primary/10 text-muted-foreground hover:text-primary transition-colors"
                        >
                          {text}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input */}
                <div className="p-4 border-t border-border">
                  <div className="flex gap-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && handleSend()}
                      placeholder="Type your message..."
                      className="flex-1"
                    />
                    <Button
                      onClick={handleSend}
                      disabled={!input.trim()}
                      size="icon"
                      className="gradient-primary"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
