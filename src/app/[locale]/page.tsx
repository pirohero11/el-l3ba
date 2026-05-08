import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { setRequestLocale, getTranslations } from 'next-intl/server';

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("HomePage");

  const getButtonStyles = (isActive: boolean) => {
    const baseStyles =
      "cursor-pointer h-15 w-17 px-4 py-2 rounded-full font-bold text-2xl border-2 border-white shadow-[0_4px_0_0_#7209B7] active:translate-y-1 active:shadow-none transition-all";
    if (isActive) {
      return `${baseStyles} bg-[#4CC9F0] text-white hover:bg-white hover:text-black`;
    }
    return `${baseStyles} bg-white text-black hover:bg-[#4CC9F0] hover:text-white`;
  };

  return (
    <div className="flex flex-col justify-center items-center">
      {/* header */}
      <div className="flex flex-row justify-end h-20 w-full gap-4 mt-5">
        <Link href="/en">
          <button className={getButtonStyles(locale === "en")}>En</button>
        </Link>
        <Link href="/ar">
          <button className={getButtonStyles(locale === "ar")}>Ar</button>
        </Link>
      </div>
      {/* hero */}
      <div className="relative w-full aspect-square max-w-[300px] float-animation mt-10">
        <div className="absolute inset-0 bg-candy-pink rounded-full blur-2xl opacity-30"></div>
        <div className="relative w-full h-full bg-white rounded-[40px] border-4 border-white shadow-card overflow-hidden flex items-center justify-center p-6 bg-linear-to-br from-sky-blue to-bright-purple">
          <img
            alt="Colorful 3D abstract shapes representing a fun playground"
            className="w-full h-full object-cover rounded-3xl mix-blend-overlay opacity-80 rtl-flip"
            data-alt="Bright, colorful 3D abstract geometric shapes like spheres and cubes floating in a playful, toy-like composition with soft lighting"
            src="/hero-logo.png"
          />
          <h1 className="absolute text-5xl font-black text-white drop-shadow-[0_4px_4px_rgba(114,9,183,0.8)] text-center leading-tight">
            {t("logo")}
          </h1>
        </div>
      </div>
      {/* title and description */}
      <div className="flex flex-col justify-center items-center mt-10">
        <p className="text-4xl font-bold text-bright-purple text-center">
          {t("title")}
        </p>
        <br />
        <p className="text-xl font-bold text-center">{t("description")}</p>
      </div>
      {/* buttons */}
      <div className="flex flex-row justify-center items-center mt-20">
        <Link href={`/${locale}/child/getStarted`}>
          <Button className="bg-sunny-yellow w-80 h-17 text-4xl text-bright-purple font-extrabold rounded-60">
            {t("getStarted")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
