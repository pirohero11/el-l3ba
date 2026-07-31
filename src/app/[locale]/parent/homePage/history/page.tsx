import React from "react";
import TabToggle from "@/components/animatedToggle";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
        <header className='p-5 w-full flex flex-rew justify-center items-center border-b-black border-2 h-18 sticky top-0 bg-white mb-10'>
            <TabToggle></TabToggle>
        </header>
      {/* Title */}

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
    </div>
    );
}