import Image from "next/image";
import { Bus, MapPin, TrainFront } from "lucide-react";

export default function LocationSection({
  description,
  mapImage,
  metrics,
}: {
  description: string;
  mapImage: string;
  metrics: {
    metro: { label: string; walkMin: number };
    bus: { label: string; walkMin: number };
    center: { label: string; walkMin: number; driveMin: number };
  };
}) {
  return (
    <section
      id="konum"
      className="h-dvh w-full snap-start snap-always overflow-hidden bg-zinc-50 text-zinc-900"
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-14">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-start">
            <div>
              <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
                Konum
              </h2>
              <p className="mt-3 text-zinc-600 max-w-2xl">{description}</p>

              <div className="mt-8 grid gap-3">
                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <TrainFront size={16} className="text-zinc-500" />
                    <span>{metrics.metro.label}</span>
                  </div>
                  <div className="mt-1 text-xl font-semibold tracking-tight">
                    {metrics.metro.walkMin} dk{" "}
                    <span className="text-zinc-500 font-medium">yürüyüş</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <Bus size={16} className="text-zinc-500" />
                    <span>{metrics.bus.label}</span>
                  </div>
                  <div className="mt-1 text-xl font-semibold tracking-tight">
                    {metrics.bus.walkMin} dk{" "}
                    <span className="text-zinc-500 font-medium">yürüyüş</span>
                  </div>
                </div>

                <div className="rounded-2xl border border-black/10 bg-white p-5">
                  <div className="flex items-center gap-2 text-sm text-zinc-600">
                    <MapPin size={16} className="text-zinc-500" />
                    <span>{metrics.center.label}</span>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-x-4 gap-y-2">
                    <div className="text-xl font-semibold tracking-tight">
                      {metrics.center.walkMin} dk{" "}
                      <span className="text-zinc-500 font-medium">yürüyüş</span>
                    </div>
                    <div className="text-xl font-semibold tracking-tight">
                      {metrics.center.driveMin} dk{" "}
                      <span className="text-zinc-500 font-medium">araba</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:pt-2">
              <div className="relative w-full h-60 sm:h-80 lg:h-[520px] rounded-2xl overflow-hidden border border-black/10 bg-white">
                <Image
                  src={mapImage}
                  alt="Konum görseli"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-4 text-sm text-zinc-500">
                İstersen buraya daha sonra canlı harita embed de ekleyebiliriz.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


