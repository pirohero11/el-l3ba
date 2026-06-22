import React from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import HistoryCard from "@/components/HistoryCard";

export default async function Events({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("history");
    return (
        <div className="h-screen w-screen bg-background flex flex-col items-center pb-36">
          <div className="h-20 w-screen flex items-center justify-center mb-6">
            <p className="font-black text-3xl text-bright-purple">{t("title")}</p>
          </div>
          <div>
            <HistoryCard
              day={7}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="/assets/home icon.png"
            />
          </div>
          <Footer />
        </div>
    );
}