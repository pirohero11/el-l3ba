import { getTranslations, setRequestLocale } from "next-intl/server";
import Footer from "@/components/Footer";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'



export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("profile");

  return (
    <div className="min-h-screen bg-background flex flex-col items-center p-4">
        <header className="relative w-[250px] h-[250px] rounded-full drop-shadow-[0px_0px_80px_rgba(255,214,10,0.5)] mb-6">
            <img className="z-10 w-full h-full rounded-full object-cover border-4 border-bright-purple bg-white" src="/avtr1.png" alt="Avatar" />
            <div className="absolute bottom-2 right-8 z-40 flex w-13 h-13 items-center justify-center bg-bright-purple rounded-full text-white font-black border-2 border-white shadow-md -rotate-10">
                <span className="text-2xl">13</span>
            </div>
        </header>
        
      <div className="bg-white w-90 h-15 flex items-center justify-center px-8 py-3 rounded-full border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] mb-6">
          {/*name*/}
          <p className="text-2xl font-bold text-bright-purple">{t("super")} Chris</p>
          
        </div>
        <section>
          <div className="bg-white w-90 h-20 rounded-full flex items-center gap-5 border-4 border-bright-purple shadow-[0_6px_0_0_#7209B7] p-10">
            <div className="w-16 h-16 bg-sunny-yellow rounded-full flex items-center justify-center border-4 border-white shadow-[0_4px_0_0_#E0A800]">
              <FontAwesomeIcon icon={faStar} className="w-10 h-10 text-white" />
            </div>
            <div className="flex flex-col">
              <p className="text-admin-slate text-lg">Total stars</p>
              <p className="font-bold text-2xl text-bright-purple">250</p>
            </div>
          </div>
          <div className=""></div>
          <div className=""></div>
        </section>
        <Footer />
    </div>
  );
}
