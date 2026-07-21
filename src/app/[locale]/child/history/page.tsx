import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import HistoryContent from "@/components/HistoryContent";

export default async function Events({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");

  return (
    <div className="min-h-screen w-screen bg-background flex flex-col items-center overflow-y-auto no-scrollbar">
      {/* Title */}
      <div className="h-20 w-screen flex items-center justify-center mb-2 mt-6">
        <p className="font-black text-3xl text-bright-purple">{t("title")}</p>
      </div>

      {/* Week Accordions */}
      <HistoryContent
        translations={{
          week: t("week"),
          day: t("day"),
          taskName: t("taskName"),
          time: t("time"),
          status: t("status"),
        }}
      />

      <Footer />
    </div>
  );
}