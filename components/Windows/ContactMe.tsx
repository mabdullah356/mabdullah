"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, MapPin, Mail, MessageSquare, CheckCircle, Github, Linkedin, Twitter, Phone } from "lucide-react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactMe() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setIsSuccess(true);
    reset();
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <div className="relative w-full h-full p-6 overflow-y-auto">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row gap-8">
        <motion.div
          className="w-full md:w-1/3 space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Get in Touch</h2>
            <p className="text-white/60 text-sm">
              I'm always open to new opportunities and collaborations. Let's build something amazing!
            </p>
          </div>

          <div className="space-y-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-blue-400">
                <MapPin size={18} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Location</p>
                <p className="text-sm">Faisalabad, Pakistan (Remote)</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-purple-400">
                <Mail size={18} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Email</p>
                <p className="text-sm">abdullahworld111@gmail.com</p>
              </div>
            </div>
            <div className="flex items-center gap-3 text-white/80">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-green-400">
                <Phone size={18} />
              </div>
              <div>
                <p className="text-xs text-white/40 font-medium uppercase tracking-wider">Phone</p>
                <p className="text-sm">+92 315 6215289</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3 pt-6">
            <a href="https://github.com/mabdullah356" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
              <Github size={18} />
            </a>
            <a href="#" target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all hover:-translate-y-1">
              <Linkedin size={18} />
            </a>
          </div>
        </motion.div>

        <motion.div
          className="w-full md:w-2/3 bg-white/[0.03] border border-white/10 p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {isSuccess ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center mb-2">
                <CheckCircle size={32} />
              </div>
              <h3 className="text-2xl font-bold text-white">Message Sent!</h3>
              <p className="text-white/60 max-w-sm">
                Thanks for reaching out. I'll get back to you as soon as possible.
              </p>
              <button
                onClick={() => setIsSuccess(false)}
                className="mt-6 px-6 py-2 bg-white/10 hover:bg-white/20 rounded-full text-white text-sm transition-colors"
              >
                Send another message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4 h-full">
              <div className="flex flex-col gap-1.5 ">
                <label className="text-xs text-white/60 font-medium ml-1">Name</label>
                <input
                  {...register("name")}
                  className={`w-full bg-black/40 border ${errors.name ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors`}
                  placeholder="Your Name"
                />
                {errors.name && <p className="text-red-400 text-xs ml-1">{errors.name.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/60 font-medium ml-1">Email</label>
                <input
                  {...register("email")}
                  className={`w-full bg-black/40 border ${errors.email ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors`}
                  placeholder="your.email@example.com"
                />
                {errors.email && <p className="text-red-400 text-xs ml-1">{errors.email.message}</p>}
              </div>

              <div className="flex flex-col gap-1.5 flex-1">
                <label className="text-xs text-white/60 font-medium ml-1">Message</label>
                <textarea
                  {...register("message")}
                  className={`w-full h-full min-h-[120px] bg-black/40 border ${errors.message ? 'border-red-500/50' : 'border-white/10 focus:border-blue-500/50'} rounded-xl px-4 py-3 text-white text-sm outline-none transition-colors resize-none`}
                  placeholder="How can I help you?"
                />
                {errors.message && <p className="text-red-400 text-xs ml-1">{errors.message.message}</p>}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-white text-black font-semibold rounded-xl px-6 py-3.5 mt-2 flex items-center justify-center gap-2 hover:bg-neutral-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={18} /> Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}
