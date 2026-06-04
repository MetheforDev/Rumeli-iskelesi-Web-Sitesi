"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { TextReveal } from "@/components/ui/text-reveal";
import { useTranslations } from "next-intl";

const reviews = [
  {
    name: "Ahmet Y.",
    rating: 5,
    date: "1 hafta önce",
    text: "Tekirdağ'ın en güzel manzarasında kahvaltı yaptık. Serpme kahvaltı muhteşemdi, personel çok ilgiliydi. Kesinlikle tavsiye ederim!",
    avatar: "A",
  },
  {
    name: "Elif K.",
    rating: 5,
    date: "2 hafta önce",
    text: "Rumeli İskelesi'nde Tekirdağ köftesi yedik, gerçekten enfes. Deniz manzarası eşliğinde yemek ayrı bir keyif. Fiyatlar da çok uygun.",
    avatar: "E",
  },
  {
    name: "Murat D.",
    rating: 5,
    date: "3 hafta önce",
    text: "San Sebastian tatlısı harika! Belediye işletmesi olmasına rağmen kalite ve servis çok üst düzey. Her hafta geliyoruz artık.",
    avatar: "M",
  },
  {
    name: "Selin A.",
    rating: 5,
    date: "1 ay önce",
    text: "Hamburgerleri gerçekten lezzetli. Soğuk kahveler de çok güzel. Deniz kenarında oturarak yemek yemek ayrı bir deneyim.",
    avatar: "S",
  },
  {
    name: "Kemal B.",
    rating: 5,
    date: "1 ay önce",
    text: "Ailecek geliyoruz. Çocuklar dondurmaları çok seviyor. Temiz, bakımlı ve huzurlu bir mekan. Tekirdağ'ın incisi.",
    avatar: "K",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < count ? "text-yellow-400" : "text-zinc-700"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review, index }: { review: typeof reviews[0]; index: number }) {
  const t = useTranslations("reviews");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="flex flex-col gap-3 p-5 rounded-2xl bg-white/3 border border-white/5 hover:border-brand-600/20 transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-brand-600/20 border border-brand-600/30 flex items-center justify-center text-brand-400 font-bold text-sm">
            {review.avatar}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{review.name}</p>
            <p className="text-zinc-600 text-xs">{review.date}</p>
          </div>
        </div>
        <Stars count={review.rating} />
      </div>
      <p className="text-zinc-400 text-sm leading-relaxed">"{review.text}"</p>
      <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-white/5">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-zinc-600 text-xs">{t("google_review")}</span>
      </div>
    </motion.div>
  );
}

export function Reviews() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const t = useTranslations("reviews");
  const avg = (reviews.reduce((a, r) => a + r.rating, 0) / reviews.length).toFixed(1);

  return (
    <section ref={sectionRef} className="py-24 px-6 bg-[#0a0a0a] relative">
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/20 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            className="inline-flex items-center gap-2 mb-4 px-3 py-1 rounded-full border border-brand-600/30 text-brand-400 text-xs tracking-widest uppercase"
          >
            {t("badge")}
          </motion.div>
          <TextReveal text={t("title1")} className="justify-center text-3xl sm:text-4xl font-bold text-white mb-3" />
          <TextReveal text={t("title2")} delay={0.2} className="justify-center text-3xl sm:text-4xl font-bold" />

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-2xl bg-white/3 border border-white/8"
          >
            <span className="text-4xl font-bold text-white">{avg}</span>
            <div className="flex flex-col gap-1">
              <Stars count={5} />
              <span className="text-zinc-500 text-xs">{t("count", { count: reviews.length })}</span>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} review={r} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-8 text-center"
        >
          <a
            href="https://www.google.com/maps/search/Rumeli+İskelesi+Süleymanpaşa"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            {t("see_all")}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
