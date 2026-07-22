import { getTranslations, setRequestLocale } from 'next-intl/server';
import MenuIcon from '@mui/icons-material/Menu';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

export default async function ScanPage({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    setRequestLocale(locale);
    const t = await getTranslations("Pscan");
    return (
        <div className=''>
            
        </div>
    );
}