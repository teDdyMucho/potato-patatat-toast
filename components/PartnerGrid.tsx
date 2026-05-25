"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { partnerCases } from "@/lib/partner-cases";

export default function PartnerGrid() {
  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
      {partnerCases.map((item, index) => (
        <motion.div
          key={item.slug}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.4, delay: index * 0.06 }}
        >
          <Link
            href={`/partners/${item.slug}`}
            className="group flex aspect-square items-center justify-center rounded-card border border-white/10 bg-[#101113] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#0abfa3]/60 hover:shadow-[0_16px_50px_rgba(10,191,163,0.14)]"
          >
            {item.logo ? (
              <Image
                src={item.logo}
                alt={item.title}
                width={240}
                height={120}
                className="w-4/5 h-auto object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              />
            ) : (
              <span className="text-center font-syne text-base font-bold leading-tight text-white/70 transition-colors duration-300 group-hover:text-[#0ABFA3]">
                {item.title}
              </span>
            )}
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
