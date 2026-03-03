import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  FileText,
  Camera,
  Shield,
  User,
  Calendar,
  MapPin,
  X,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type ClaimType = "vehicle" | "home" | "health" | "life" | "travel" | "business" | "";

interface RequiredDocument {
  id: string;
  label: string;
  description: string;
  accept: string;
}

const requiredDocumentsByType: Record<Exclude<ClaimType, "">, RequiredDocument[]> = {
  vehicle: [
    { id: "driving_license", label: "Driving License", description: "Valid driving license of the policyholder", accept: "image/*,.pdf" },
    { id: "rc_book", label: "Vehicle Registration (RC Book)", description: "Registration certificate of the vehicle", accept: "image/*,.pdf" },
    { id: "fir_report", label: "FIR / Police Report", description: "First Information Report filed with police", accept: "image/*,.pdf" },
    { id: "vehicle_photos", label: "Photos of Damaged Vehicle", description: "Clear photographs showing vehicle damage", accept: "image/*" },
    { id: "repair_estimate", label: "Repair Estimate", description: "Estimate from authorized service center", accept: "image/*,.pdf,.doc,.docx" },
  ],
  health: [
    { id: "medical_bills", label: "Medical Bills & Receipts", description: "Itemized hospital/clinic bills", accept: "image/*,.pdf" },
    { id: "discharge_summary", label: "Discharge Summary", description: "Hospital discharge summary document", accept: "image/*,.pdf" },
    { id: "doctor_prescription", label: "Doctor's Prescription", description: "Prescription from attending doctor", accept: "image/*,.pdf" },
    { id: "diagnostic_reports", label: "Diagnostic / Lab Reports", description: "Test results, X-rays, MRI reports", accept: "image/*,.pdf" },
    { id: "id_proof", label: "ID Proof", description: "Government-issued identity document", accept: "image/*,.pdf" },
  ],
  life: [
    { id: "death_certificate", label: "Death Certificate", description: "Official death certificate (if applicable)", accept: "image/*,.pdf" },
    { id: "nominee_id", label: "Nominee ID Proof", description: "Government-issued ID of the nominee", accept: "image/*,.pdf" },
    { id: "policy_document", label: "Original Policy Document", description: "Copy of the life insurance policy", accept: "image/*,.pdf" },
    { id: "medical_records", label: "Medical Records", description: "Relevant medical history and records", accept: "image/*,.pdf" },
    { id: "bank_details", label: "Bank Account Details", description: "Cancelled cheque or bank statement", accept: "image/*,.pdf" },
  ],
  home: [
    { id: "property_docs", label: "Property Ownership Documents", description: "Title deed or ownership proof", accept: "image/*,.pdf" },
    { id: "damage_photos", label: "Photos of Property Damage", description: "Clear photographs of damaged areas", accept: "image/*" },
    { id: "fir_report", label: "FIR / Police Report", description: "Police report (for theft/vandalism)", accept: "image/*,.pdf" },
    { id: "repair_estimate", label: "Repair / Restoration Estimate", description: "Estimate from contractor or surveyor", accept: "image/*,.pdf,.doc,.docx" },
    { id: "id_proof", label: "ID Proof of Policyholder", description: "Government-issued identity document", accept: "image/*,.pdf" },
  ],
  travel: [
    { id: "passport", label: "Passport Copy", description: "Passport bio page and visa stamps", accept: "image/*,.pdf" },
    { id: "boarding_pass", label: "Boarding Pass / Tickets", description: "Flight tickets or boarding passes", accept: "image/*,.pdf" },
    { id: "trip_cancellation_proof", label: "Trip Cancellation / Delay Proof", description: "Airline/hotel cancellation or delay documentation", accept: "image/*,.pdf" },
    { id: "medical_receipts", label: "Medical Receipts (if abroad)", description: "Hospital or clinic bills from abroad", accept: "image/*,.pdf" },
    { id: "baggage_report", label: "Lost Baggage Report", description: "Property Irregularity Report from airline", accept: "image/*,.pdf" },
  ],
  business: [
    { id: "business_registration", label: "Business Registration Certificate", description: "Company registration or license", accept: "image/*,.pdf" },
    { id: "financial_statements", label: "Financial Statements", description: "Profit & loss, revenue records", accept: "image/*,.pdf,.doc,.docx,.xls,.xlsx" },
    { id: "damage_assessment", label: "Damage Assessment Report", description: "Professional surveyor or assessor report", accept: "image/*,.pdf" },
    { id: "incident_photos", label: "Photos of Damage / Incident", description: "Photographs of business premises or equipment", accept: "image/*" },
    { id: "police_report", label: "Police / Fire Department Report", description: "Official report from authorities", accept: "image/*,.pdf" },
  ],
};

interface ClaimData {
  type: ClaimType;
  policyNumber: string;
  fullName: string;
  email: string;
  phone: string;
  incidentDate: string;
  location: string;
  description: string;
  documents: Record<string, File | null>;
  additionalDocuments: File[];
}

const ClaimWizard = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [claimData, setClaimData] = useState<ClaimData>({
    type: "",
    policyNumber: "",
    fullName: "",
    email: "",
    phone: "",
    incidentDate: "",
    location: "",
    description: "",
    documents: {},
    additionalDocuments: [],
  });
  const { toast } = useToast();

  const steps = [
    { title: "Claim Type", icon: Shield },
    { title: "Your Details", icon: User },
    { title: "Incident Info", icon: Calendar },
    { title: "Documents", icon: FileText },
    { title: "Review", icon: CheckCircle },
  ];

  const claimTypes = [
    { value: "vehicle", label: "Vehicle Insurance", description: "Car, bike & vehicle accidents, theft, damage" },
    { value: "home", label: "Home Insurance", description: "Property damage, theft, natural disasters" },
    { value: "health", label: "Health Insurance", description: "Medical expenses, hospitalization, treatments" },
    { value: "life", label: "Life Insurance", description: "Term life, whole life, accidental death" },
    { value: "travel", label: "Travel Insurance", description: "Trip cancellation, lost baggage, medical abroad" },
    { value: "business", label: "Business Insurance", description: "Liability, equipment, business interruption" },
  ];

  const currentRequiredDocs = useMemo(() => {
    if (!claimData.type) return [];
    return requiredDocumentsByType[claimData.type] || [];
  }, [claimData.type]);

  const uploadedRequiredCount = useMemo(() => {
    return currentRequiredDocs.filter((doc) => claimData.documents[doc.id]).length;
  }, [currentRequiredDocs, claimData.documents]);

  const allRequiredUploaded = currentRequiredDocs.length > 0 && uploadedRequiredCount === currentRequiredDocs.length;

  const handleNext = () => {
    if (currentStep === 3 && !allRequiredUploaded) {
      toast({
        title: "Missing Documents",
        description: `Please upload all ${currentRequiredDocs.length} required documents before proceeding.`,
        variant: "destructive",
      });
      return;
    }
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Claim Submitted Successfully!",
      description: "Your claim #CLM-2024-" + Math.random().toString(36).substring(2, 8).toUpperCase() + " has been received. We'll review it within 24 hours.",
    });
    setCurrentStep(0);
    setClaimData({
      type: "",
      policyNumber: "",
      fullName: "",
      email: "",
      phone: "",
      incidentDate: "",
      location: "",
      description: "",
      documents: {},
      additionalDocuments: [],
    });
  };

  const handleRequiredDocUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setClaimData({
        ...claimData,
        documents: { ...claimData.documents, [docId]: e.target.files[0] },
      });
    }
  };

  const removeRequiredDoc = (docId: string) => {
    const newDocs = { ...claimData.documents };
    delete newDocs[docId];
    setClaimData({ ...claimData, documents: newDocs });
  };

  const handleAdditionalFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      setClaimData({ ...claimData, additionalDocuments: [...claimData.additionalDocuments, ...newFiles] });
    }
  };

  const removeAdditionalFile = (index: number) => {
    const newDocs = claimData.additionalDocuments.filter((_, i) => i !== index);
    setClaimData({ ...claimData, additionalDocuments: newDocs });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <div>
              <Label className="text-base font-medium mb-4 block">
                What type of claim are you filing?
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {claimTypes.map((type) => (
                  <button
                    key={type.value}
                    onClick={() => setClaimData({ ...claimData, type: type.value as ClaimType })}
                    className={`p-4 rounded-xl border-2 text-left transition-all ${
                      claimData.type === type.value
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                  >
                    <p className="font-semibold text-foreground">{type.label}</p>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="policyNumber">Policy Number</Label>
              <Input
                id="policyNumber"
                placeholder="e.g., POL-123456789"
                value={claimData.policyNumber}
                onChange={(e) => setClaimData({ ...claimData, policyNumber: e.target.value })}
              />
            </div>
          </div>
        );

      case 1:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName">Full Name</Label>
              <Input
                id="fullName"
                placeholder="Enter your full name"
                value={claimData.fullName}
                onChange={(e) => setClaimData({ ...claimData, fullName: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={claimData.email}
                onChange={(e) => setClaimData({ ...claimData, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={claimData.phone}
                onChange={(e) => setClaimData({ ...claimData, phone: e.target.value })}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="incidentDate">Date of Incident</Label>
              <Input
                id="incidentDate"
                type="date"
                value={claimData.incidentDate}
                onChange={(e) => setClaimData({ ...claimData, incidentDate: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="location">Location of Incident</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  id="location"
                  placeholder="Enter address or location"
                  className="pl-10"
                  value={claimData.location}
                  onChange={(e) => setClaimData({ ...claimData, location: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Describe what happened</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about the incident..."
                rows={5}
                value={claimData.description}
                onChange={(e) => setClaimData({ ...claimData, description: e.target.value })}
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            {/* Required Documents */}
            <div>
              <Label className="text-base font-medium mb-2 block">
                Required Documents for {claimData.type ? claimTypes.find(t => t.value === claimData.type)?.label : "—"}
              </Label>
              <p className="text-sm text-muted-foreground mb-4">
                Upload all {currentRequiredDocs.length} required documents below. ({uploadedRequiredCount}/{currentRequiredDocs.length} uploaded)
              </p>
              
              <div className="space-y-3">
                {currentRequiredDocs.map((doc) => {
                  const uploaded = claimData.documents[doc.id];
                  return (
                    <div
                      key={doc.id}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        uploaded ? "border-primary/50 bg-primary/5" : "border-border"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            {uploaded ? (
                              <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                            ) : (
                              <AlertCircle className="w-4 h-4 text-muted-foreground shrink-0" />
                            )}
                            <span className="font-medium text-sm">{doc.label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground ml-6">{doc.description}</p>
                          {uploaded && (
                            <p className="text-xs text-primary ml-6 mt-1 truncate max-w-[250px]">
                              ✓ {uploaded.name}
                            </p>
                          )}
                        </div>
                        <div className="shrink-0">
                          {uploaded ? (
                            <button
                              onClick={() => removeRequiredDoc(doc.id)}
                              className="p-1.5 hover:bg-destructive/10 rounded-full transition-colors"
                            >
                              <X className="w-4 h-4 text-destructive" />
                            </button>
                          ) : (
                            <>
                              <input
                                type="file"
                                accept={doc.accept}
                                onChange={(e) => handleRequiredDocUpload(doc.id, e)}
                                className="hidden"
                                id={`doc-${doc.id}`}
                              />
                              <label
                                htmlFor={`doc-${doc.id}`}
                                className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                              >
                                <Upload className="w-3.5 h-3.5" />
                                Upload
                              </label>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Additional Documents */}
            <div>
              <Label className="text-base font-medium mb-2 block">Additional Documents (Optional)</Label>
              <div className="border-2 border-dashed border-border rounded-xl p-6 text-center hover:border-primary/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx"
                  onChange={handleAdditionalFileUpload}
                  className="hidden"
                  id="additional-upload"
                />
                <label htmlFor="additional-upload" className="cursor-pointer flex flex-col items-center">
                  <Upload className="w-6 h-6 text-primary mb-2" />
                  <p className="text-sm font-medium text-foreground">Upload any extra supporting documents</p>
                </label>
              </div>

              {claimData.additionalDocuments.length > 0 && (
                <div className="space-y-2 mt-3">
                  {claimData.additionalDocuments.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-3">
                        <FileText className="w-4 h-4 text-primary" />
                        <span className="text-sm truncate max-w-[200px]">{file.name}</span>
                      </div>
                      <button onClick={() => removeAdditionalFile(index)} className="p-1 hover:bg-destructive/10 rounded-full">
                        <X className="w-4 h-4 text-destructive" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="bg-muted/50 rounded-xl p-6 space-y-4">
              <h3 className="font-semibold text-lg">Claim Summary</h3>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Claim Type</p>
                  <p className="font-medium capitalize">{claimData.type || "—"} Insurance</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Policy Number</p>
                  <p className="font-medium">{claimData.policyNumber || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Full Name</p>
                  <p className="font-medium">{claimData.fullName || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{claimData.email || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{claimData.phone || "—"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Incident Date</p>
                  <p className="font-medium">{claimData.incidentDate || "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Location</p>
                  <p className="font-medium">{claimData.location || "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Description</p>
                  <p className="font-medium">{claimData.description || "—"}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-muted-foreground">Required Documents</p>
                  <div className="mt-1 space-y-1">
                    {currentRequiredDocs.map((doc) => (
                      <div key={doc.id} className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-3.5 h-3.5 text-primary" />
                        <span>{doc.label}: <span className="text-muted-foreground">{claimData.documents[doc.id]?.name || "—"}</span></span>
                      </div>
                    ))}
                  </div>
                </div>
                {claimData.additionalDocuments.length > 0 && (
                  <div className="col-span-2">
                    <p className="text-muted-foreground">Additional Documents</p>
                    <p className="font-medium">{claimData.additionalDocuments.length} file(s)</p>
                  </div>
                )}
              </div>
            </div>

            <div className="p-4 bg-success/10 rounded-xl border border-success/20">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-success mt-0.5" />
                <div>
                  <p className="font-medium text-success">AI Verification Complete</p>
                  <p className="text-sm text-muted-foreground">
                    All {currentRequiredDocs.length} required documents validated. Your claim is ready for submission.
                  </p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          {/* Progress Line */}
          <div className="absolute top-5 left-0 right-0 h-0.5 bg-border">
            <motion.div
              className="h-full gradient-primary"
              initial={{ width: "0%" }}
              animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {steps.map((step, index) => (
            <div
              key={index}
              className="relative z-10 flex flex-col items-center"
            >
              <motion.div
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                  index <= currentStep
                    ? "gradient-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
                animate={{ scale: index === currentStep ? 1.1 : 1 }}
              >
                {index < currentStep ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  <step.icon className="w-5 h-5" />
                )}
              </motion.div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  index <= currentStep ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="bg-card rounded-2xl shadow-card p-6 md:p-8 border border-border">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="font-display text-2xl font-bold text-foreground mb-6">
              {steps[currentStep].title}
            </h2>
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="gap-2"
          >
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>

          {currentStep === steps.length - 1 ? (
            <Button variant="hero" onClick={handleSubmit} className="gap-2">
              Submit Claim
              <CheckCircle className="w-4 h-4" />
            </Button>
          ) : (
            <Button variant="hero" onClick={handleNext} className="gap-2">
              Continue
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ClaimWizard;
