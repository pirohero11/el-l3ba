import { getTranslations, setRequestLocale } from 'next-intl/server';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("scan");
    return (
        <div className="flex flex-col gap-5 w-full">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white rounded-full border-4 border-dark shadow-card p-5 m-5">
                <ArrowBackIcon sx={{color:"#7209B7", fontSize:"40px"}} />
            </div>
            <div className="px-4 text-center flex-col flex gap-3 items-center">
                {/*title*/}
                <p className="text-2xl font-bold text-bright-purple text-center w-80">{t("title")}</p>
                {/*description*/}
                <p className=" font-bold text-center mt-2 w-full">{t("scanQR")}</p>
            </div>
            {/* QR CODE Scanner */}
            <div className="flex flex-col items-center justify-center">
                <div className="bg-white w-100 h-130 rounded-[25px]">

                </div>
            </div>
            <div className="flex flex-col items-center justify-center">
                <Link href={`/${locale}/child/homePage`}>
                    <Button className="bg-sunny-yellow w-80 h-17 text-3xl text-bright-purple font-extrabold rounded-60">
                        {t("scanned")}
                    </Button>
                </Link>
            </div>
        </div>
    );
}