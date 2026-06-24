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
        <div className="max-h-screen w-screen bg-background flex flex-col items-center pb-36">
          <div className="h-20 w-screen flex items-center justify-center mb-6 mt-6">
            <p className="font-black text-3xl text-bright-purple">{t("title")}</p>
          </div>
          <div className="flex flex-col gap-6 pb-40 w-screen items-center">
            <HistoryCard
              day={7}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={6}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={5}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={4}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={3}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={2}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
            <HistoryCard
              day={1}
              translations={{
                day: t("Day"),
                taskName: t("taskName"),
                time: t("time"),
                status: t("status"),
              }}
              image="mission1.png"
            />
          </div>
          <Footer />
        </div>
    );
}