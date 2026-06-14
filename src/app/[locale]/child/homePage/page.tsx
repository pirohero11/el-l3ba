import { getTranslations, setRequestLocale } from "next-intl/server";
import Levels from "@/components/levels";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("homePage");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        {/*header */}
        <div className=" w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border-4 border-white flex justify-center">
            <div className="fixed z-9999 h-16 w-97 flex flex-row justify-between items-center">
                <Button className="w-30 h-14 rounded-full bg-white border-bright-purple border-4"><span className="font-black text-xl text-bright-purple decoration-0">⭐</span></Button>
                <div className="bg-white border-sunny-yellow border-4 text-bright-purple rounded-full p-2 shadow-button w-35 flex justify-center items-center"><span className="font-black text-3xl text-bright-purple">{t("week")} 1</span></div>
                <Button className="w-18 h-18 rounded-full bg-white border-bright-purple border-4"><img src="/avtr1.png" alt="" /></Button>
            </div>
            <Levels />
            <Footer />
        </div>
    </div>
  );
}
