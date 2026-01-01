"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export type ApartmentImage = {
  label: string;
  src: string;
};

export type ApartmentType = {
  type: "1+1" | "2+1" | "3+1" | string;
  size: string;
  remaining: number;
  images: ApartmentImage[];
};

export default function ApartmentsSection({
  apartmentTypes,
}: {
  apartmentTypes: ApartmentType[];
}) {
  const types = useMemo(() => apartmentTypes ?? [], [apartmentTypes]);
  const [galleryType, setGalleryType] = useState<ApartmentType | null>(null);
  const [galleryIndex, setGalleryIndex] = useState(0);

  const galleryImages = galleryType?.images ?? [];
  const galleryCurrent = galleryImages[galleryIndex];

  useEffect(() => {
    if (!galleryType) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [galleryType]);

  const openGallery = (t: ApartmentType, idx = 0) => {
    setGalleryType(t);
    setGalleryIndex(Math.max(0, Math.min(idx, t.images.length - 1)));
  };

  const closeGallery = () => {
    setGalleryType(null);
    setGalleryIndex(0);
  };

  const goPrev = () => {
    if (!galleryType) return;
    setGalleryIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  };

  const goNext = () => {
    if (!galleryType) return;
    setGalleryIndex((i) => (i + 1) % galleryImages.length);
  };

  return (
    <section
      id="daireler"
      className="h-dvh w-full snap-start snap-always overflow-hidden bg-zinc-50"
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-14">
          <div className="flex flex-col gap-3">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              Daire Tipleri
            </h2>
            <p className="text-zinc-600 max-w-2xl">
              Her daire tipi için m² ve kalan adet bilgisini net görün. Karttan
              galeriye girip oda görselleri arasında gezebilirsiniz.
            </p>
          </div>

          <div className="mt-8">
            {types.length === 0 ? (
              <div className="mt-6 text-sm text-zinc-600">
                Henüz daire tipi eklenmemiş.
              </div>
            ) : (
              <>
                {/* Mobile: yatay scroll */}
                <div className="sm:hidden -mx-6 px-6">
                  <div className="flex gap-4 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-2">
                    {types.map((t) => {
                      const thumb = t.images?.[0];
                      return (
                        <article
                          key={t.type}
                          className="snap-start shrink-0 w-[86%] rounded-2xl border border-black/10 bg-white overflow-hidden"
                        >
                          <button
                            type="button"
                            onClick={() => openGallery(t, 0)}
                            className="relative w-full h-56 bg-zinc-100 text-left"
                            aria-label={`${t.type} galerisini aç`}
                          >
                            {thumb ? (
                              <Image
                                src={thumb.src}
                                alt={`${t.type} ${thumb.label} görseli`}
                                fill
                                className="object-cover"
                              />
                            ) : (
                              <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
                                Görsel yok
                              </div>
                            )}
                            <div className="absolute inset-x-0 bottom-0 p-4">
                              <div className="flex items-center justify-between gap-3">
                                <div className="inline-flex items-center rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-900 backdrop-blur">
                                  {t.type}
                                </div>
                                <div className="inline-flex items-center rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-xs font-semibold text-zinc-800 backdrop-blur">
                                  Galeri ({t.images.length})
                                </div>
                              </div>
                            </div>
                          </button>

                          <div className="p-5">
                            <div className="flex items-start justify-between gap-3">
                              <div>
                                <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                                  Daire Tipi
                                </div>
                                <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
                                  {t.type}
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={() => openGallery(t, 0)}
                                className={[
                                  "shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold",
                                  "border border-black/10 bg-zinc-900 text-white",
                                  "hover:bg-zinc-800 transition-colors",
                                  "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25",
                                ].join(" ")}
                              >
                                Galeri
                              </button>
                            </div>

                            <div className="mt-4 grid grid-cols-2 gap-3">
                              <div className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3">
                                <div className="text-xs text-zinc-500">m²</div>
                                <div className="text-lg font-semibold text-zinc-900">
                                  {t.size}
                                </div>
                              </div>
                              <div className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3">
                                <div className="text-xs text-zinc-500">Kalan</div>
                                <div className="text-lg font-semibold text-zinc-900">
                                  {t.remaining} adet
                                </div>
                              </div>
                            </div>

                            <div className="mt-4 flex flex-wrap gap-2">
                              {t.images.slice(0, 4).map((img) => (
                                <span
                                  key={img.label}
                                  className="text-xs rounded-full border border-black/10 bg-white px-3 py-1 text-zinc-700"
                                >
                                  {img.label}
                                </span>
                              ))}
                              {t.images.length > 4 ? (
                                <span className="text-xs rounded-full border border-black/10 bg-white px-3 py-1 text-zinc-500">
                                  +{t.images.length - 4}
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </article>
                      );
                    })}
                  </div>
                </div>

                {/* Web/Tablet: grid */}
                <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-5">
                  {types.map((t) => {
                    const thumb = t.images?.[0];
                    return (
                      <article
                        key={t.type}
                        className="rounded-2xl border border-black/10 bg-white overflow-hidden"
                      >
                        <button
                          type="button"
                          onClick={() => openGallery(t, 0)}
                          className="relative w-full h-56 bg-zinc-100 text-left"
                          aria-label={`${t.type} galerisini aç`}
                        >
                          {thumb ? (
                            <Image
                              src={thumb.src}
                              alt={`${t.type} ${thumb.label} görseli`}
                              fill
                              className="object-cover"
                            />
                          ) : (
                            <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
                              Görsel yok
                            </div>
                          )}
                          <div className="absolute inset-x-0 bottom-0 p-4">
                            <div className="flex items-center justify-between gap-3">
                              <div className="inline-flex items-center rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-sm font-semibold text-zinc-900 backdrop-blur">
                                {t.type}
                              </div>
                              <div className="inline-flex items-center rounded-xl border border-black/10 bg-white/80 px-3 py-2 text-xs font-semibold text-zinc-800 backdrop-blur">
                                Galeri ({t.images.length})
                              </div>
                            </div>
                          </div>
                        </button>

                        <div className="p-5">
                          <div className="flex items-start justify-between gap-3">
                            <div>
                              <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                                Daire Tipi
                              </div>
                              <div className="mt-1 text-xl font-semibold tracking-tight text-zinc-900">
                                {t.type}
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => openGallery(t, 0)}
                              className={[
                                "shrink-0 rounded-2xl px-4 py-2 text-sm font-semibold",
                                "border border-black/10 bg-zinc-900 text-white",
                                "hover:bg-zinc-800 transition-colors",
                                "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25",
                              ].join(" ")}
                            >
                              Galeriyi Aç
                            </button>
                          </div>

                          <div className="mt-4 grid grid-cols-2 gap-3">
                            <div className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3">
                              <div className="text-xs text-zinc-500">m²</div>
                              <div className="text-lg font-semibold text-zinc-900">
                                {t.size}
                              </div>
                            </div>
                            <div className="rounded-2xl border border-black/10 bg-zinc-50 px-4 py-3">
                              <div className="text-xs text-zinc-500">Kalan</div>
                              <div className="text-lg font-semibold text-zinc-900">
                                {t.remaining} adet
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex flex-wrap gap-2">
                            {t.images.slice(0, 4).map((img) => (
                              <span
                                key={img.label}
                                className="text-xs rounded-full border border-black/10 bg-white px-3 py-1 text-zinc-700"
                              >
                                {img.label}
                              </span>
                            ))}
                            {t.images.length > 4 ? (
                              <span className="text-xs rounded-full border border-black/10 bg-white px-3 py-1 text-zinc-500">
                                +{t.images.length - 4}
                              </span>
                            ) : null}
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fullscreen Gallery Modal */}
      {galleryType ? (
        <div
          className="fixed inset-0 z-[60]"
          role="dialog"
          aria-modal="true"
          aria-label="Daire görsel galerisi"
        >
          <button
            type="button"
            onClick={closeGallery}
            className="absolute inset-0 bg-zinc-900/35 backdrop-blur-[2px]"
            aria-label="Galeriyi kapat"
          />

          <div className="absolute inset-0 p-4 sm:p-6 flex items-center justify-center">
            <div className="w-full max-w-5xl rounded-2xl bg-white text-zinc-900 border border-black/10 overflow-hidden">
              <div className="flex items-center justify-between gap-3 px-4 sm:px-5 py-4 border-b border-black/10">
                <div>
                  <div className="text-xs uppercase tracking-[0.18em] text-zinc-500">
                    {galleryType.type} • {galleryType.size} • {galleryType.remaining} adet
                  </div>
                  <div className="mt-1 text-lg sm:text-xl font-semibold tracking-tight">
                    {galleryCurrent?.label ?? "Görsel"}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="text-sm text-zinc-600">
                    {galleryImages.length === 0 ? "0/0" : `${galleryIndex + 1}/${galleryImages.length}`}
                  </div>
                  <button
                    type="button"
                    onClick={closeGallery}
                    className="rounded-xl px-3 py-2 text-sm font-semibold border border-black/10 bg-zinc-50 hover:bg-zinc-100 transition-colors"
                  >
                    Kapat
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
                <div className="lg:col-span-9 relative bg-zinc-50">
                  <div className="relative w-full h-[60vh] lg:h-[560px]">
                    {galleryCurrent ? (
                      <Image
                        src={galleryCurrent.src}
                        alt={`${galleryType.type} ${galleryCurrent.label} görseli`}
                        fill
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 grid place-items-center text-sm text-zinc-500">
                        Görsel bulunamadı
                      </div>
                    )}
                  </div>

                  {galleryImages.length > 1 ? (
                    <>
                      <button
                        type="button"
                        onClick={goPrev}
                        className="absolute left-3 top-1/2 -translate-y-1/2 rounded-2xl border border-black/10 bg-white/85 px-3 py-2 text-sm font-semibold hover:bg-white transition-colors backdrop-blur"
                        aria-label="Önceki görsel"
                      >
                        Önceki
                      </button>
                      <button
                        type="button"
                        onClick={goNext}
                        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-2xl border border-black/10 bg-white/85 px-3 py-2 text-sm font-semibold hover:bg-white transition-colors backdrop-blur"
                        aria-label="Sonraki görsel"
                      >
                        Sonraki
                      </button>
                    </>
                  ) : null}
                </div>

                <div className="lg:col-span-3 border-t lg:border-t-0 lg:border-l border-black/10 bg-white">
                  <div className="p-4 sm:p-5">
                    <div className="text-sm font-semibold text-zinc-900">
                      Oda Görselleri
                    </div>
                    <div className="mt-3 grid grid-cols-3 lg:grid-cols-1 gap-2">
                      {galleryImages.map((img, idx) => (
                        <button
                          key={`${img.label}-${idx}`}
                          type="button"
                          onClick={() => setGalleryIndex(idx)}
                          className={[
                            "rounded-xl overflow-hidden border text-left transition-colors",
                            idx === galleryIndex
                              ? "border-zinc-900/20 bg-zinc-50"
                              : "border-black/10 bg-white hover:bg-zinc-50",
                          ].join(" ")}
                        >
                          <div className="relative w-full h-20 lg:h-24 bg-zinc-100">
                            <Image
                              src={img.src}
                              alt={`${galleryType.type} ${img.label} küçük görsel`}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="px-3 py-2 text-xs text-zinc-800">
                            {img.label}
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}


