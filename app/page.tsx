import data from "@/data/project-status.json";

import ScrollSnapShell from "./components/ScrollSnapShell";
import ApartmentsSection from "./sections/ApartmentsSection";
import ContactSection from "./sections/ContactSection";
import HeroSection from "./sections/HeroSection";
import LocationSection from "./sections/LocationSection";

export default function Home() {
  return (
    <ScrollSnapShell
      navItems={[
        { id: "daireler", label: "Daireler" },
        { id: "konum", label: "Konum" },
        { id: "iletisim", label: "İletişim" },
      ]}
    >
      <HeroSection
        projectName={data.general.projectName}
        title={data.hero.title}
        subtitle={data.hero.subtitle}
        completionRate={data.general.completionRate}
        unitsSold={data.general.unitsSold}
        constructionArea={data.general.constructionArea}
        whatsappLink={data.general.whatsappLink}
      />

      <ApartmentsSection apartmentTypes={data.apartmentTypes} />

      <LocationSection
        description={data.location.description}
        mapImage={data.location.mapImage}
        metrics={data.location.metrics}
      />

      <ContactSection
        projectName={data.general.projectName}
        contacts={data.contacts}
      />
    </ScrollSnapShell>
  );
}