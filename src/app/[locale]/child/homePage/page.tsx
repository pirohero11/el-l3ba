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
    <div className="min-h-screen w-full bg-[url('/levels.png')] bg-cover bg-no-repeat bg-center flex flex-col items-center justify-center p-4">
      {/*header */}
      <div className=" w-full max-w-md shadow-2xl rounded-3xl overflow-hidden border-4 border-white flex justify-center">
        <div className="fixed z-9999 h-16 w-9/10 flex flex-row justify-center items-center gap-5">
          <Button className="w-6/20 h-12 rounded-full bg-white border-bright-purple border-4"><span className="font-black text-xl text-bright-purple decoration-0">⭐</span></Button>
          <div className="bg-white border-sunny-yellow border-4 text-bright-purple rounded-full p-2 shadow-button w-4/10 h-12 flex justify-center items-center"><span className="font-black text-xl text-bright-purple">{t("week")} 1</span></div>
          <Link href={`/${locale}/child/profile`}>          
            <Button className="w-14 h-14 rounded-full bg-white border-bright-purple border-4"><img src="/avtr1.png" alt="" /></Button>
          </Link>
        </div>
        <Levels />
        <Footer />
      </div>
    </div>
  );
}
