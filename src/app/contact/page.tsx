"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Footer from "@/components/shared/Footer";
import FormInput from "@/components/shared/FormInput";
import Navbar from "@/components/shared/Navbar";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const contactSchema = z.object({
  fullName: z.string().min(2, "Full name is required"),
  email: z.string().email("Enter a valid email address"),
  phone: z.string().min(7, "Phone number is required"),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, "Message should be at least 10 characters long"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const Page = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      company: "",
      message: "",
    },
  });

  const formValues = watch();

  const handleSubmitForm = async (data: ContactFormValues) => {
    setSubmitError(null);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const result = await response.json();
        throw new Error(result?.error || "Unable to send message.");
      }

      setSubmitted(true);
      reset();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unable to send message.";
      setSubmitError(message);
    }
  };

  useEffect(() => {
    if (!submitted) return;
    const timeout = setTimeout(() => setSubmitted(false), 5000);
    return () => clearTimeout(timeout);
  }, [submitted]);

  return (
    <main>
      <section className="relative min-h-screen bg-[url('/images/contact_page.jpg')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10">
          <section className="nav-offset w-full flex justify-center items-center">
            <Navbar />
          </section>

          <div className="w-11/12 max-w-2xl mx-auto py-16 lg:py-20">
            <div className="bg-black/70 backdrop-blur-sm p-6 sm:p-10 lg:p-12 text-white">
              <div className="flex flex-col gap-4 text-center">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-IvyPresto text-white">
                  Get in touch
                </h1>
                <p className="text-sm sm:text-base text-white/80">
                  Have questions or want to create a tailored experience? Fill
                  out the form below and we will get back to you shortly.
                </p>
              </div>

              <form
                className="mt-10 flex flex-col gap-6"
                onSubmit={handleSubmit(handleSubmitForm)}
                noValidate
              >
                <FormInput
                  errors={errors}
                  placeholder="Full Name *"
                  register={register}
                  value={formValues.fullName ?? ""}
                  name="fullName"
                />
                <FormInput
                  errors={errors}
                  placeholder="Email Address *"
                  register={register}
                  value={formValues.email ?? ""}
                  name="email"
                />
                <FormInput
                  errors={errors}
                  placeholder="Phone Number *"
                  register={register}
                  value={formValues.phone ?? ""}
                  name="phone"
                />
                <FormInput
                  errors={errors}
                  placeholder="Company"
                  register={register}
                  value={formValues.company ?? ""}
                  name="company"
                />
                <FormInput
                  errors={errors}
                  placeholder="Message *"
                  register={register}
                  value={formValues.message ?? ""}
                  name="message"
                  inputType="textarea"
                />

                {submitted && (
                  <p
                    className="text-sm text-green-200"
                    role="status"
                    aria-live="polite"
                  >
                    Thanks for reaching out. We will be in touch soon.
                  </p>
                )}
                {submitError && (
                  <p className="text-sm text-red-200" role="alert">
                    {submitError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="self-center border border-white bg-white px-6 py-3 text-xs uppercase tracking-[0.3em] text-black transition-opacity hover:opacity-90 disabled:opacity-60"
                >
                  {isSubmitting ? "Sending..." : "Indulge Today"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
};

export default Page;
