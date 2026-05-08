import { getTranslations, setRequestLocale } from "next-intl/server";
import Levels from "@/components/levels";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Home from "@mui/icons-material/Home";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import PersonIcon from '@mui/icons-material/Person';

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
                <Button className="w-30 h-14 rounded-full bg-white border-bright-purple border-4"><p className="font-black text-xl text-bright-purple decoration-0">⭐Score</p></Button>
                <div className="bg-white border-sunny-yellow border-4 text-bright-purple rounded-full p-2 shadow-button w-35 flex justify-center items-center"><p className="font-black text-3xl text-bright-purple">Week 1</p></div>
                <Button className="w-18 h-18 rounded-full bg-white border-bright-purple border-4"><img src="/avtr1.png" alt="" /></Button>
            </div>
            <Levels />
            <div className="fixed z-9999 border-bright-purple border-10 bg-white rounded-full flex flex-row w-97 h-30 items-center justify-center gap-2 bottom-5">
                <LocalFireDepartmentIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
                <PersonIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
                <Home className="bg-sunny-yellow rounded-full -translate-y-6 border-white border-4 shadow-sunny-yellow shadow-lg p-2 transition-all duration-500 ease-in-out" sx={{ fontSize: "80px", color: "#ffffff" }} />
                <EmojiEventsIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
                <FormatListBulletedIcon className="" sx={{ fontSize: "50px", color: "gray" }} />
            </div>
        </div>
    </div>
  );
}
