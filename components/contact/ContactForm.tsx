"use client";

import { useEffect, useMemo, useState } from "react";
import { Send, CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { isValidEmail } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import {
  TextField,
  Box,
  Alert,
  CircularProgress,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from "@mui/material";
import { useParams, usePathname } from "next/navigation";
import defaultDict from "@/app/[lang]/dictionaries/en-CA.json";

async function getDictionary(locale: string) {
  const dicts: Record<string, () => Promise<any>> = {
    "en-CA": () =>
      import("@/app/[lang]/dictionaries/en-CA.json").then((m) => m.default),
    "ar-SA": () =>
      import("@/app/[lang]/dictionaries/ar-SA.json").then((m) => m.default),
    "fr-CA": () =>
      import("@/app/[lang]/dictionaries/fr-CA.json").then((m) => m.default),
    "tr-TR": () =>
      import("@/app/[lang]/dictionaries/tr-TR.json").then((m) => m.default),
    "ur-PK": () =>
      import("@/app/[lang]/dictionaries/ur-PK.json").then((m) => m.default),
  };

  const loader = dicts[locale];
  if (loader) return loader();
  return dicts["en-CA"]();
}

export default function ContactForm() {
  const params = useParams();
  const pathname = usePathname();
  const [dict, setDict] = useState<any>(defaultDict);
  const [mounted, setMounted] = useState(false);

  const resolvedLang =
    (params?.lang as string) ||
    pathname.match(/^\/([a-z]{2}-[A-Z]{2})/)?.[1] ||
    "en-CA";

  useEffect(() => {
    setMounted(true);
    getDictionary(resolvedLang)
      .then(setDict)
      .catch(() => setDict(defaultDict));
  }, [resolvedLang]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
    technicalLevel: "",
    budget: "",
    timeline: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const copy = dict?.contactForm || {};

  const inquiryTypes = useMemo(
    () =>
      (copy?.inquiryTypes || [
        { value: "project", label: "New Project" },
        { value: "consulting", label: "IT Consulting" },
        { value: "collaboration", label: "Collaboration" },
        { value: "job", label: "Job Opportunity" },
        { value: "mentorship", label: "Mentorship" },
        { value: "support", label: "Technical Support" },
        { value: "other", label: "Other" },
      ]) as Array<{ value: string; label: string }>,
    [copy?.inquiryTypes],
  );

  const technicalLevels = useMemo(
    () =>
      (copy?.technicalLevels || [
        { value: "non-technical", label: "Non-Technical (Just have an idea)" },
        { value: "beginner", label: "Beginner (Learning the basics)" },
        { value: "intermediate", label: "Intermediate (Know my way around)" },
        { value: "advanced", label: "Advanced (Can build things)" },
        { value: "expert", label: "Expert (Need complex solutions)" },
      ]) as Array<{ value: string; label: string }>,
    [copy?.technicalLevels],
  );

  const budgetRanges = useMemo(
    () =>
      (copy?.budgetRanges || [
        { value: "not-sure", label: "Not sure yet" },
        { value: "under-1k", label: "Under $1,000" },
        { value: "1k-5k", label: "$1,000 - $5,000" },
        { value: "5k-10k", label: "$5,000 - $10,000" },
        { value: "10k-25k", label: "$10,000 - $25,000" },
        { value: "25k-plus", label: "$25,000+" },
        { value: "no-budget", label: "No budget (Just asking)" },
      ]) as Array<{ value: string; label: string }>,
    [copy?.budgetRanges],
  );

  const timelines = useMemo(
    () =>
      (copy?.timelines || [
        { value: "asap", label: "ASAP (Urgent)" },
        { value: "1-month", label: "Within 1 month" },
        { value: "1-3-months", label: "1-3 months" },
        { value: "3-6-months", label: "3-6 months" },
        { value: "flexible", label: "Flexible / No rush" },
      ]) as Array<{ value: string; label: string }>,
    [copy?.timelines],
  );

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = copy?.validation?.nameRequired || "Name is required";
    } else if (formData.name.length < 2) {
      newErrors.name =
        copy?.validation?.nameMin || "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = copy?.validation?.emailRequired || "Email is required";
    } else if (!isValidEmail(formData.email)) {
      newErrors.email =
        copy?.validation?.emailInvalid || "Please enter a valid email address";
    }

    if (!formData.subject.trim()) {
      newErrors.subject =
        copy?.validation?.subjectRequired || "Subject is required";
    } else if (formData.subject.length < 5) {
      newErrors.subject =
        copy?.validation?.subjectMin || "Subject must be at least 5 characters";
    }

    if (!formData.message.trim()) {
      newErrors.message =
        copy?.validation?.messageRequired || "Message is required";
    } else if (formData.message.length < 10) {
      newErrors.message =
        copy?.validation?.messageMin ||
        "Message must be at least 10 characters";
    }

    if (!formData.inquiryType) {
      newErrors.inquiryType =
        copy?.validation?.inquiryTypeRequired ||
        "Please select what you are reaching out for";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  if (!mounted) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          inquiryType: "",
          technicalLevel: "",
          budget: "",
          timeline: "",
        });
        setErrors({});
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (e: {
    target: { name: string; value: string };
  }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  return (
    <div className="space-y-6">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{ display: "flex", flexDirection: "column", gap: 4 }}
      >
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          <TextField
            label={copy?.labels?.name || "Your Name"}
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            required
            fullWidth
            disabled={isSubmitting}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
          <TextField
            label={copy?.labels?.email || "Email Address"}
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            required
            fullWidth
            disabled={isSubmitting}
            variant="outlined"
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          />
        </Box>

        <FormControl
          fullWidth
          error={!!errors.inquiryType}
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        >
          <InputLabel>
            {copy?.labels?.inquiryType || "What are you reaching out for? *"}
          </InputLabel>
          <Select
            name="inquiryType"
            value={formData.inquiryType}
            label={
              copy?.labels?.inquiryType || "What are you reaching out for? *"
            }
            onChange={handleSelectChange}
            disabled={isSubmitting}
          >
            {inquiryTypes.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          {errors.inquiryType && (
            <FormHelperText>{errors.inquiryType}</FormHelperText>
          )}
        </FormControl>

        <FormControl
          fullWidth
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        >
          <InputLabel>
            {copy?.labels?.technicalLevel || "Your Technical Level"}
          </InputLabel>
          <Select
            name="technicalLevel"
            value={formData.technicalLevel}
            label={copy?.labels?.technicalLevel || "Your Technical Level"}
            onChange={handleSelectChange}
            disabled={isSubmitting}
          >
            {technicalLevels.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText>
            {copy?.helperText?.technicalLevel ||
              "Select the level that best describes you - helps me tailor my response"}
          </FormHelperText>
        </FormControl>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr" },
            gap: 3,
          }}
        >
          <FormControl
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          >
            <InputLabel>{copy?.labels?.budget || "Budget Range"}</InputLabel>
            <Select
              name="budget"
              value={formData.budget}
              label={copy?.labels?.budget || "Budget Range"}
              onChange={handleSelectChange}
              disabled={isSubmitting}
            >
              {budgetRanges.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            <FormHelperText>
              {copy?.helperText?.budget || "Optional but helps with planning"}
            </FormHelperText>
          </FormControl>

          <FormControl
            fullWidth
            sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
          >
            <InputLabel>{copy?.labels?.timeline || "Timeline"}</InputLabel>
            <Select
              name="timeline"
              value={formData.timeline}
              label={copy?.labels?.timeline || "Timeline"}
              onChange={handleSelectChange}
              disabled={isSubmitting}
            >
              {timelines.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <TextField
          label={copy?.labels?.subject || "Subject"}
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          required
          fullWidth
          disabled={isSubmitting}
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        <TextField
          label={copy?.labels?.message || "Message"}
          name="message"
          value={formData.message}
          onChange={handleChange}
          error={!!errors.message}
          helperText={
            errors.message ||
            copy?.helperText?.message ||
            "Please include as much detail as possible about your project requirements."
          }
          required
          fullWidth
          disabled={isSubmitting}
          multiline
          rows={6}
          variant="outlined"
          sx={{ "& .MuiOutlinedInput-root": { borderRadius: 3 } }}
        />

        <AnimatePresence>
          {submitStatus === "success" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert
                severity="success"
                icon={<CheckCircle />}
                sx={{ borderRadius: 3 }}
              >
                <strong>
                  {copy?.status?.successTitle || "Message sent successfully!"}
                </strong>
                <br />
                {copy?.status?.successBody ||
                  "Thank you for reaching out. I'll get back to you within 24 hours."}
              </Alert>
            </motion.div>
          )}

          {submitStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
            >
              <Alert
                severity="error"
                icon={<XCircle />}
                sx={{ borderRadius: 3 }}
              >
                <strong>
                  {copy?.status?.errorTitle || "Something went wrong"}
                </strong>
                <br />
                {copy?.status?.errorBody ||
                  "Please try again or contact me directly via email."}
              </Alert>
            </motion.div>
          )}
        </AnimatePresence>

        <Button
          type="submit"
          disabled={isSubmitting}
          className="h-14 rounded-xl text-lg font-bold bg-zinc-900 text-white hover:bg-zinc-800 transition-all relative group overflow-hidden"
        >
          {/* Yellow accent bar like the hero */}
          <div className="absolute bottom-0 left-0 w-full h-1 bg-[#FACC15] scale-x-0 group-hover:scale-x-100 transition-transform origin-left" />

          <div className="flex items-center justify-center gap-2 relative z-10">
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>{copy?.buttons?.sending || "Sending..."}</span>
              </>
            ) : (
              <>
                <span>{copy?.buttons?.send || "Send Message"}</span>
                <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </>
            )}
          </div>
        </Button>
      </Box>

      {/* Privacy Notice */}
      <div className="text-xs text-muted-foreground text-center">
        <p className="px-8">
          {copy?.privacyNotice ||
            "Your information is secure and will only be used to respond to your inquiry. I never share your details with third parties."}
        </p>
      </div>
    </div>
  );
}
