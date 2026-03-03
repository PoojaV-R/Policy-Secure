import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import ChatBot from "@/components/chat/ChatBot";
import { Button } from "@/components/ui/button";
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  XCircle,
  ChevronRight,
  Plus,
  Bell,
  Settings,
  Search,
  Filter,
} from "lucide-react";
import { Link } from "react-router-dom";

interface Claim {
  id: string;
  type: string;
  date: string;
  status: "submitted" | "under_review" | "approved" | "settled" | "denied";
  amount: string;
  description: string;
}

const Dashboard = () => {
  const [filter, setFilter] = useState("all");

  const claims: Claim[] = [
    {
      id: "CLM-2024-A7B3",
      type: "Auto Insurance",
      date: "2024-01-15",
      status: "approved",
      amount: "$4,250",
      description: "Vehicle collision repair - front bumper and headlight",
    },
    {
      id: "CLM-2024-K9M2",
      type: "Home Insurance",
      date: "2024-01-20",
      status: "under_review",
      amount: "$12,800",
      description: "Water damage from burst pipe in basement",
    },
    {
      id: "CLM-2024-P5D8",
      type: "Health Insurance",
      date: "2024-01-25",
      status: "submitted",
      amount: "$850",
      description: "Emergency room visit and X-ray examination",
    },
    {
      id: "CLM-2024-X2F1",
      type: "Auto Insurance",
      date: "2024-01-10",
      status: "settled",
      amount: "$2,100",
      description: "Windshield replacement and minor dent repair",
    },
  ];

  const stats = [
    { label: "Total Claims", value: "4", icon: FileText, color: "primary" },
    { label: "Pending Review", value: "2", icon: Clock, color: "warning" },
    { label: "Approved", value: "1", icon: CheckCircle2, color: "success" },
    { label: "Total Recovered", value: "$6,350", icon: CheckCircle2, color: "secondary" },
  ];

  const getStatusConfig = (status: Claim["status"]) => {
    switch (status) {
      case "submitted":
        return {
          label: "Submitted",
          icon: Clock,
          className: "bg-muted text-muted-foreground",
        };
      case "under_review":
        return {
          label: "Under Review",
          icon: AlertCircle,
          className: "bg-warning/10 text-warning",
        };
      case "approved":
        return {
          label: "Approved",
          icon: CheckCircle2,
          className: "bg-success/10 text-success",
        };
      case "settled":
        return {
          label: "Settled",
          icon: CheckCircle2,
          className: "bg-secondary/10 text-secondary",
        };
      case "denied":
        return {
          label: "Denied",
          icon: XCircle,
          className: "bg-destructive/10 text-destructive",
        };
      default:
        return {
          label: "Unknown",
          icon: AlertCircle,
          className: "bg-muted text-muted-foreground",
        };
    }
  };

  const filteredClaims = filter === "all" 
    ? claims 
    : claims.filter((claim) => claim.status === filter);

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                My Claims Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Track and manage all your insurance claims in one place
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button asChild variant="hero">
                <Link to="/file-claim">
                  <Plus className="w-4 h-4" />
                  New Claim
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-xl p-6 shadow-card border border-border"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="font-display text-2xl font-bold text-foreground mt-1">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      stat.color === "primary"
                        ? "bg-primary/10"
                        : stat.color === "warning"
                        ? "bg-warning/10"
                        : stat.color === "success"
                        ? "bg-success/10"
                        : "bg-secondary/10"
                    }`}
                  >
                    <stat.icon
                      className={`w-6 h-6 ${
                        stat.color === "primary"
                          ? "text-primary"
                          : stat.color === "warning"
                          ? "text-warning"
                          : stat.color === "success"
                          ? "text-success"
                          : "text-secondary"
                      }`}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Claims List */}
          <div className="bg-card rounded-xl shadow-card border border-border overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Filter:</span>
                <div className="flex gap-2">
                  {["all", "submitted", "under_review", "approved", "settled"].map(
                    (status) => (
                      <button
                        key={status}
                        onClick={() => setFilter(status)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-colors ${
                          filter === status
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground hover:bg-muted/80"
                        }`}
                      >
                        {status === "all"
                          ? "All"
                          : status === "under_review"
                          ? "Under Review"
                          : status.charAt(0).toUpperCase() + status.slice(1)}
                      </button>
                    )
                  )}
                </div>
              </div>
              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search claims..."
                  className="w-full sm:w-64 pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>

            {/* Claims */}
            <div className="divide-y divide-border">
              {filteredClaims.map((claim, index) => {
                const statusConfig = getStatusConfig(claim.status);
                return (
                  <motion.div
                    key={claim.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 hover:bg-muted/50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="font-mono text-sm font-medium text-primary">
                            {claim.id}
                          </span>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${statusConfig.className}`}
                          >
                            <statusConfig.icon className="w-3 h-3" />
                            {statusConfig.label}
                          </span>
                        </div>
                        <p className="font-medium text-foreground mb-1">
                          {claim.type}
                        </p>
                        <p className="text-sm text-muted-foreground truncate">
                          {claim.description}
                        </p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-display text-lg font-semibold text-foreground">
                          {claim.amount}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(claim.date).toLocaleDateString()}
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
      <Footer />
      <ChatBot />
    </div>
  );
};

export default Dashboard;
