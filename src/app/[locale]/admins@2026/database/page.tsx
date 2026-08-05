import { Button } from "@/components/ui/button";
import Link from "next/link";
import { getTranslations, setRequestLocale } from "next-intl/server";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default async function DatabasePage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");


    return (
        <div className="flex flex-col items-center gap-3">
            <div className="flex justify-between w-full p-3 border-b-3 border-b-black items-center">
                <Link href={`/${locale}/admins@2026/homePage`}>
                    <Button className='bg-white text-black border-black border rounded-full w-8 h-8'>
                        <ArrowBackIcon className="w-2 h-2" />
                    </Button>
                </Link>
                <h1 className="text-2xl font-bold text-bright-purple mt-1">Database Management</h1>
            </div>
            <main className="h-screen w-[90%] flex bg-white rounded-2xl mb-3 border-2 border-black/30">
                <div className="h-15 flex justify-between w-full p-3 border-b-3 border-b-black items-center">
                </div>
                <div className="">
                    <p></p>
                </div>
            </main>
        </div>
    );
}
