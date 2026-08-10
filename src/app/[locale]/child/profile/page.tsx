import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faFire } from '@fortawesome/free-solid-svg-icons'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'



export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("profile");

  return (
    <div className="max-h-screen w-screen bg-background flex flex-col items-center p-4">
        <header className="relative w-3/5 aspect-square rounded-full drop-shadow-[0px_0px_80px_rgba(255,214,10,0.5)] mb-6">
            <img className="z-10 w-full h-full rounded-full object-cover border-4 border-bright-purple bg-white" src="/avtr1.png" alt="Avatar" />
            <div className="absolute bottom-1 right-5 z-40 flex w-13 h-13 items-center justify-center bg-bright-purple rounded-full text-white font-black border-2 border-white shadow-md -rotate-10">
                <span className="text-2xl">13</span>
            </div>
        </header>
        
        <div className="bg-white w-9/10 h-20 flex items-center justify-between px-6 py-3 rounded-3xl border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] mb-6">
            {/*name*/}
            <p className="text-2xl font-bold text-bright-purple">{t("super")} Chris</p>
        </div>
        <section className="flex items-center flex-col w-full mb-50">
          <div className="bg-white w-9/10 h-25 rounded-4xl flex items-center gap-5 border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] p-10 mb-6">
            <div className="w-16 h-16 bg-sunny-yellow rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_0_0_#E0A800]">
              <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-admin-slate text-lg">{t("stars")}</p>
              <p className="font-bold text-2xl text-bright-purple">765</p>
            </div>
          </div>
          <div className="flex items-center gap-2 w-full justify-center mb-40">
            <div className="bg-white w-9/20 h-50 rounded-4xl flex flex-col items-center gap-2 border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] p-5">
                <div className="w-16 h-16 bg-candy-pink rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_0_0_#E0A800] mb-2">
                  <FontAwesomeIcon icon={faFire} className="w-10 h-10 text-white" />
                </div>
                <p className="font-bold text-4xl text-bright-purple">255</p>
                <p className="text-admin-slate text-lg">{t("streak")}</p>
            </div>
            <div className="bg-white w-9/20 h-50 rounded-4xl flex flex-col items-center gap-2 border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] p-5">
                <div className="w-16 h-16 bg-mint-green rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_0_0_#E0A800] mb-2">
                  <FontAwesomeIcon icon={faCircleCheck} className="w-8 h-8 text-white" />
                </div>
                <p className="font-bold text-4xl text-bright-purple">85</p>
                <p className="text-admin-slate text-lg">{t("completed")}</p>
            </div>
          </div>
          <LanguageSwitcher variant="compact" className="-mt-30 mb-40"/>
        </section>
        <Footer />
    </div>
  );
}
