import Image from "next/image";
import { Phone } from "lucide-react";

export default function HeroSection({
  projectName,
  title,
  subtitle,
  completionRate,
  unitsSold,
  constructionArea,
  whatsappLink,
}: {
  projectName: string;
  title: string;
  subtitle: string;
  completionRate: number;
  unitsSold: number;
  constructionArea: number;
  whatsappLink: string;
}) {
  return (
    <section
      id="giris"
      className="h-dvh w-full snap-start snap-always relative overflow-hidden"
    >
      <div className="absolute inset-0">
        <Image
          src="/images/hero-bg.jpg"
          alt="Proje kapak görseli"
          fill
          priority
          className="object-cover brightness-[0.55]"
        />
      </div>

      <div className="relative h-full w-full">
        <div className="h-full w-full overflow-y-auto no-scrollbar">
          <div className="min-h-full flex items-center">
            <div className="mx-auto max-w-6xl px-6 pt-24 pb-14 text-white">
              <div className="w-full max-w-xl lg:max-w-2xl flex flex-col gap-5 items-start text-left">
                <div className="text-xs uppercase tracking-[0.2em] text-white/70">
                  Konut Projesi
                </div>

                <h1 className="text-4xl sm:text-6xl font-semibold tracking-tight">
                  {projectName}
                </h1>

                <p className="text-lg sm:text-xl text-white/80">{title}</p>
                <p className="text-base sm:text-lg text-white/70">{subtitle}</p>

                <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                    <div className="text-3xl font-semibold tracking-tight">
                      %{completionRate}
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/70 mt-1">
                      Tamamlanma
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                    <div className="text-3xl font-semibold tracking-tight">
                      {unitsSold}
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/70 mt-1">
                      Satılan Daire
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4">
                    <div className="text-3xl font-semibold tracking-tight">
                      {constructionArea}
                    </div>
                    <div className="text-xs uppercase tracking-[0.18em] text-white/70 mt-1">
                      m² İnşaat
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex flex-col sm:flex-row gap-3">
                  <a
                    href={whatsappLink}
                    className={[
                      "inline-flex items-center justify-center gap-2",
                      "rounded-2xl px-6 py-4 text-base font-semibold",
                      "bg-white text-zinc-900 hover:bg-white/90 transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
                    ].join(" ")}
                  >
                    <Phone size={20} />
                    Bilgi Al & İletişime Geç
                  </a>

                  <a
                    href="#daireler"
                    className={[
                      "inline-flex items-center justify-center",
                      "rounded-2xl px-6 py-4 text-base font-semibold",
                      "border border-white/20 bg-white/10 hover:bg-white/15 transition-colors",
                      "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/35",
                    ].join(" ")}
                  >
                    Daire Tiplerine Bak
                  </a>
                </div>

                <div className="mt-10 text-sm text-white/60">
                  Aşağı kaydırarak bölümler arasında geçiş yapabilirsiniz.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


