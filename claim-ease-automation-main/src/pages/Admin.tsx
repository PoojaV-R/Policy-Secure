import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/layout/Header";
import ChatBot from "@/components/chat/ChatBot";
import { Button } from "@/components/ui/button";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  FileText,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Eye,
  Flag,
  Search,
  Filter,
  Download,
  Settings,
  Bell,
  ShieldAlert,
  Brain,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface AdminClaim {
  id: string;
  customer: string;
  type: string;
  date: string;
  amount: string;
  riskScore: number;
  status: "pending" | "review" | "approved" | "flagged";
  priority: "low" | "medium" | "high";
}

const Admin = () => {
  const [selectedTab, setSelectedTab] = useState("overview");

  const stats = [
    {
      label: "Total Claims Today",
      value: "127",
      change: "+12%",
      trend: "up",
      icon: FileText,
    },
    {
      label: "Pending Review",
      value: "34",
      change: "-5%",
      trend: "down",
      icon: Clock,
    },
    {
      label: "Fraud Alerts",
      value: "3",
      change: "+2",
      trend: "up",
      icon: AlertTriangle,
    },
    {
      label: "Avg. Processing Time",
      value: "4.2h",
      change: "-18%",
      trend: "down",
      icon: Zap,
    },
  ];

  const claims: AdminClaim[] = [
    {
      id: "CLM-2024-X9K2",
      customer: "John Smith",
      type: "Auto Insurance",
      date: "2024-01-28",
      amount: "$8,500",
      riskScore: 12,
      status: "pending",
      priority: "low",
    },
    {
      id: "CLM-2024-B4M7",
      customer: "Sarah Johnson",
      type: "Home Insurance",
      date: "2024-01-28",
      amount: "$45,000",
      riskScore: 78,
      status: "flagged",
      priority: "high",
    },
    {
      id: "CLM-2024-N2P5",
      customer: "Mike Williams",
      type: "Health Insurance",
      date: "2024-01-27",
      amount: "$2,300",
      riskScore: 25,
      status: "review",
      priority: "medium",
    },
    {
      id: "CLM-2024-Q8R1",
      customer: "Emily Brown",
      type: "Property Insurance",
      date: "2024-01-27",
      amount: "$15,200",
      riskScore: 8,
      status: "approved",
      priority: "low",
    },
    {
      id: "CLM-2024-T3W9",
      customer: "David Lee",
      type: "Auto Insurance",
      date: "2024-01-26",
      amount: "$3,800",
      riskScore: 45,
      status: "review",
      priority: "medium",
    },
  ];

  const getRiskColor = (score: number) => {
    if (score < 30) return "text-success bg-success/10";
    if (score < 60) return "text-warning bg-warning/10";
    return "text-destructive bg-destructive/10";
  };

  const getPriorityConfig = (priority: AdminClaim["priority"]) => {
    switch (priority) {
      case "high":
        return { label: "High", className: "bg-destructive/10 text-destructive" };
      case "medium":
        return { label: "Medium", className: "bg-warning/10 text-warning" };
      case "low":
        return { label: "Low", className: "bg-muted text-muted-foreground" };
    }
  };

  const getStatusConfig = (status: AdminClaim["status"]) => {
    switch (status) {
      case "pending":
        return { label: "Pending", icon: Clock, className: "text-muted-foreground" };
      case "review":
        return { label: "In Review", icon: Eye, className: "text-warning" };
      case "approved":
        return { label: "Approved", icon: CheckCircle2, className: "text-success" };
      case "flagged":
        return { label: "Flagged", icon: Flag, className: "text-destructive" };
    }
  };

  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "claims", label: "Claims Queue" },
    { id: "fraud", label: "Fraud Detection" },
    { id: "analytics", label: "Analytics" },
  ];

  return (
    <div className="min-h-screen bg-muted/30">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="font-display text-3xl font-bold text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                Manage claims, detect fraud, and monitor performance
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" size="icon">
                <Bell className="w-4 h-4" />
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="w-4 h-4" />
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-muted rounded-lg w-fit mb-8">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  selectedTab === tab.id
                    ? "bg-card text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.label}
                    </CardTitle>
                    <stat.icon className="w-4 h-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-end justify-between">
                      <span className="font-display text-2xl font-bold">
                        {stat.value}
                      </span>
                      <span
                        className={`flex items-center text-sm ${
                          stat.trend === "up" && stat.label !== "Fraud Alerts"
                            ? "text-success"
                            : stat.trend === "down"
                            ? "text-success"
                            : "text-destructive"
                        }`}
                      >
                        {stat.trend === "up" ? (
                          <TrendingUp className="w-4 h-4 mr-1" />
                        ) : (
                          <TrendingDown className="w-4 h-4 mr-1" />
                        )}
                        {stat.change}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Claims Queue */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Claims Queue</CardTitle>
                      <CardDescription>
                        Review and process incoming claims
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                      </Button>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Search..."
                          className="pl-9 pr-4 py-2 bg-muted rounded-lg text-sm border-none focus:outline-none focus:ring-2 focus:ring-primary w-48"
                        />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {claims.map((claim, index) => {
                      const statusConfig = getStatusConfig(claim.status);
                      const priorityConfig = getPriorityConfig(claim.priority);
                      return (
                        <motion.div
                          key={claim.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="flex items-center gap-4 p-4 rounded-xl bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                        >
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-mono text-sm font-medium text-primary">
                                {claim.id}
                              </span>
                              <span
                                className={`px-2 py-0.5 rounded-full text-xs font-medium ${priorityConfig.className}`}
                              >
                                {priorityConfig.label}
                              </span>
                            </div>
                            <p className="font-medium text-foreground">
                              {claim.customer}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {claim.type} · {claim.amount}
                            </p>
                          </div>
                          <div className="text-right">
                            <div
                              className={`inline-flex items-center gap-1 mb-1 ${statusConfig.className}`}
                            >
                              <statusConfig.icon className="w-4 h-4" />
                              <span className="text-sm font-medium">
                                {statusConfig.label}
                              </span>
                            </div>
                            <div
                              className={`text-sm font-medium px-2 py-1 rounded-lg ${getRiskColor(
                                claim.riskScore
                              )}`}
                            >
                              Risk: {claim.riskScore}%
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Side Panel */}
            <div className="space-y-6">
              {/* AI Insights */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="w-5 h-5 text-primary" />
                    AI Insights
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20">
                    <div className="flex items-start gap-3">
                      <ShieldAlert className="w-5 h-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          Potential Fraud Detected
                        </p>
                        <p className="text-sm text-muted-foreground">
                          CLM-2024-B4M7 shows patterns consistent with staged
                          claims. Review recommended.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-success/10 border border-success/20">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-success mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          Auto-Approved: 12 Claims
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Low-risk claims meeting all criteria were processed
                          automatically.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-start gap-3">
                      <BarChart3 className="w-5 h-5 text-primary mt-0.5" />
                      <div>
                        <p className="font-medium text-foreground">
                          Weekly Trend
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Auto claims up 23% this week. Consider resource
                          reallocation.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Team Activity */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-secondary" />
                    Team Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { name: "Alex Chen", claims: 24, avatar: "AC" },
                      { name: "Jamie Wilson", claims: 19, avatar: "JW" },
                      { name: "Sam Taylor", claims: 17, avatar: "ST" },
                    ].map((member, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-sm font-medium">
                            {member.avatar}
                          </div>
                          <span className="font-medium text-foreground">
                            {member.name}
                          </span>
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {member.claims} claims today
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <ChatBot />
    </div>
  );
};

export default Admin;
