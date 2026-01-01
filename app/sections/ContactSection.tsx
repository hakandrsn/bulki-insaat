function toDigits(phone: string) {
  return phone.replace(/[^\d]/g, "");
}

function buildWaLink(phone: string, text: string) {
  const digits = toDigits(phone);
  const msg = encodeURIComponent(text);
  return `https://wa.me/${digits}?text=${msg}`;
}

export type ContactPerson = {
  name: string;
  role: string;
  phone: string;
  whatsapp: string;
};

export default function ContactSection({
  projectName,
  contacts,
}: {
  projectName: string;
  contacts: ContactPerson[];
}) {
  return (
    <section
      id="iletisim"
      className="h-dvh w-full snap-start snap-always overflow-hidden bg-white"
    >
      <div className="h-full w-full overflow-y-auto no-scrollbar">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-14 h-full flex items-center justify-center">
          <div className="w-full max-w-2xl text-center">
            <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
              Yerinde görün, kararınızı kolaylaştırın.
            </h2>
            <p className="mt-3 text-zinc-600 max-w-xl mx-auto">
              {projectName} hakkında fiyat, ödeme planı ve daire seçenekleri için
              ekibimiz saniyeler içinde size dönüş yapsın.
            </p>

            <div className="mt-10 grid gap-4">
              {contacts.map((c) => {
                const msg = `Merhaba ${c.name}, ${projectName} hakkında bilgi almak istiyorum.`;
                return (
                  <div
                    key={`${c.name}-${c.phone}`}
                    className="rounded-2xl border border-black/10 bg-white px-5 py-4 text-left"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <div className="text-base font-semibold text-zinc-900">
                          {c.name}
                        </div>
                        <div className="text-sm text-zinc-600">{c.role}</div>
                        <div className="mt-1 text-sm text-zinc-700">
                          {c.phone}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2 sm:justify-end">
                        <a
                          href={`tel:${c.phone}`}
                          className={[
                            "inline-flex items-center justify-center",
                            "rounded-2xl px-4 py-3 text-sm font-semibold",
                            "border border-black/10 bg-zinc-900 text-white",
                            "hover:bg-zinc-800 transition-colors",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/25",
                          ].join(" ")}
                        >
                          Ara
                        </a>
                        <a
                          href={buildWaLink(c.whatsapp, msg)}
                          className={[
                            "inline-flex items-center justify-center",
                            "rounded-2xl px-4 py-3 text-sm font-semibold",
                            "border border-black/10 bg-emerald-700 text-white",
                            "hover:bg-emerald-800 transition-colors",
                            "focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-700/25",
                          ].join(" ")}
                          target="_blank"
                          rel="noreferrer"
                        >
                          WhatsApp
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <footer className="mt-10 text-sm text-zinc-500">
              © {new Date().getFullYear()} {projectName}. Tüm hakları saklıdır.
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}


