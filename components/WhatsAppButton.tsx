"use client";

import { motion } from "framer-motion";
import { COMPANY } from "@/lib/data";

export default function WhatsAppButton() {
  const number = COMPANY.whatsapp.replace(/[^\d]/g, "");
  return (
    <motion.a
      href={`https://wa.me/${number}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Scrivici su WhatsApp"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1, type: "spring", stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="whatsapp-fab fixed bottom-5 right-4 z-[700] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-card sm:bottom-6 sm:right-6"
    >
      <svg className="h-7 w-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 0 0-8.6 15l-1.3 4.7 4.8-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.5-4-4.7-4.2-.1-.2-1-1.4-1-2.6 0-1.2.6-1.8.9-2 .2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.3 0 .5l-.4.6-.3.3c-.2.2-.3.4-.1.7.2.3.9 1.4 1.9 2.3 1.3 1.1 2.3 1.5 2.6 1.6.2.1.4.1.6-.1l.9-1c.2-.3.4-.2.6-.1l1.9.9c.2.1.4.2.5.3.1.2.1.6-.1 1.2Z" />
      </svg>
    </motion.a>
  );
}
