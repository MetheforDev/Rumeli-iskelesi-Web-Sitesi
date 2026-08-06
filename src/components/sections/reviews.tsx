import { TextReveal } from "@/components/ui/text-reveal";
import { getTranslations } from "next-intl/server";
import { SectionGlow } from "@/components/ui/section-glow";
import { FadeInView } from "@/components/ui/fade-in-view";
import { NAP } from "@/lib/site-config";

// Google İşletme Profili'nden alınan gerçek yorumlar (genel puan: 4.4 · 806 yorum)
const GOOGLE_RATING = 4.4;
const GOOGLE_REVIEW_COUNT = 806;

const reviews = [
  {
    name: "M-Byn",
    rating: 5,
    date: "1 hafta önce",
    text: "Manzara ve yemekler çok güzeldi. Kahvaltı için geldik, seçenek çok bol değil ama fiyatlar uygundu. Self-servis kendiniz alıyorsunuz. Belediyeyi tebrik ediyorum.",
    avatar: "M",
  },
  {
    name: "Murat",
    rating: 5,
    date: "2 hafta önce",
    text: "Rumeli iskelesi gayet güzel bir yer iki çay bahçesi dondurma satan ayrı bir işletmesi balık ekmek satan bir işletmeyi ve kadın komisyonuna bağlı el emeği ürünlerin satıldığı yerleri bünyesinde barındırıyor balık tutulabilen alanlarıda var çay bahçelerindeki bir olumsuzluk self servis olması çok oturmayalım diye galiba :) dandik sandalyeler konmuş",
    avatar: "M",
  },
  {
    name: "ismail81",
    rating: 5,
    date: "3 hafta önce",
    text: "Bulunduğu konum harika. Ayrıca iskelenin en son kısmında belediye ait bir sosyal tesis olduğu için de muhteşem geç saatlere kadar açık çalışanlarda ellerinden geldiği kadar özverili bir şekilde herkesi yetişmeye çalışıyor tatil zamanları çok yoğun çok eşek olan bir yer bu bölgeye gelip de mutlaka uğranması gereken bir yer",
    avatar: "İ",
  },
  {
    name: "Engin Sunal",
    rating: 5,
    date: "7 hafta önce",
    text: "Ailenizle birlikte gidip denizin dibinde vakit geçirebileceğiniz güzel bir mekan. Hem denizin keyfini çıkarabilir hem de uygun fiyatlı bir şekilde yiyip içebilirsiniz. Bu gibi güzel manzaralı alanları halka kazandırdığı için Tekirdağ belediyesini tebrik ederim. Diğer belediyelere örnek olması dileğiyle.",
    avatar: "E",
  },
  {
    name: "Levent İvecan",
    rating: 5,
    date: "20 hafta önce",
    text: "Örnek olması gereken Belediyeye ait bir işletme. Denizin ortasında makul fiyatlı, sevdiklerinizle hoşça vakit geçirebileceğiniz bir mekan.",
    avatar: "L",
  },
  {
    name: "Ece",
    rating: 5,
    date: "29 hafta önce",
    text: "Tekirdağlılar için sahil yürüyüşü sonrası dinlenmek için harika bir seçenek. Uygun fiyat, self servis, haftasonu sabah saatlerinde genelde tenha oluyor. Kahvaltı, tost, karadut (bizim favorimiz), çay, meşrubatlar vs. birçok seçenek mevcut. 🌊⛴️🍽️☕",
    avatar: "E",
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

function ReviewCard({
  review,
  index,
  googleReviewLabel,
}: {
  review: (typeof reviews)[0];
  index: number;
  googleReviewLabel: string;
}) {
  return (
    <FadeInView
      delay={index * 0.08}
      margin="-40px"
      y={0}
      blur
      className="flex flex-col gap-3 p-5 rounded-2xl bg-white/6 border border-white/10 hover:border-brand-600/30 transition-colors"
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
      <p className="text-zinc-400 text-sm leading-relaxed">“{review.text}”</p>
      <div className="flex items-center gap-1.5 mt-auto pt-2 border-t border-white/5">
        <svg className="w-3.5 h-3.5" viewBox="0 0 24 24">
          <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
          <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
          <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
          <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
        <span className="text-zinc-600 text-xs">{googleReviewLabel}</span>
      </div>
    </FadeInView>
  );
}

export async function Reviews() {
  const t = await getTranslations("reviews");
  const googleReviewLabel = t("google_review");

  return (
    <section className="section-py px-6 bg-[#0a0a0a] relative overflow-hidden">
      <SectionGlow color="gold" position="top-center" />
      <div className="absolute top-0 inset-x-0 h-px bg-linear-to-r from-transparent via-brand-600/20 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <FadeInView duration={0.3} y={0} className="text-brand-400 text-sm font-medium mb-4 block">
            {t("badge")}
          </FadeInView>
          <TextReveal text={t("title1")} className="font-display justify-center text-3xl sm:text-4xl font-bold text-white mb-3" />
          <TextReveal text={t("title2")} delay={0.2} className="font-display justify-center text-3xl sm:text-4xl font-bold" />

          <FadeInView
            delay={0.5}
            y={0}
            className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-2xl bg-white/6 border border-white/12"
          >
            <span className="text-4xl font-bold text-white">{GOOGLE_RATING.toFixed(1)}</span>
            <div className="flex flex-col gap-1">
              <Stars count={5} />
              <span className="text-zinc-500 text-xs">{t("count", { count: String(GOOGLE_REVIEW_COUNT) })}</span>
            </div>
          </FadeInView>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <ReviewCard key={r.name} review={r} index={i} googleReviewLabel={googleReviewLabel} />
          ))}
        </div>

        <FadeInView delay={0.7} y={0} duration={0.3} className="mt-8 text-center">
          <a
            href={NAP.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-zinc-500 hover:text-white transition-colors"
          >
            {t("see_all")}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </FadeInView>
      </div>
    </section>
  );
}
