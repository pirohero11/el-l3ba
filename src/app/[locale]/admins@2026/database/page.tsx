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
            <main className="h-screen w-[90%] flex bg-white rounded-2xl mb-3 border-2 border-black/30 flex-col items-center">
                <div className="h-15 flex justify-between w-full p-3 border-b-3 border-b-black items-center">
                    <select className="rounded-full border border-black w-50 text-center h-9" name="database" id="database">
                        <option value="">Select Database</option>
                        <option value="users">Children</option>
                        <option value="missions">Parents</option>
                        <option value="submissions">Admins</option>
                    </select>
                </div>
                <div className="w-[95%] h-full p-3 overflow-y-auto flex flex-col bg-admin-slate/10 m-3">
                    <table className="w-[90%] mx-auto border-collapse text-left text-sm text-gray-700 border border-gray-200 rounded-lg">
                        <thead className="bg-gray-50 border-b border-gray-200 text-xs uppercase text-gray-500">
                            <tr>
                                <th className="px-4 py-3">Name</th>
                                <th className="px-4 py-3">Avatar</th>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Status</th>
                                <th className="px-4 py-3">Streak</th>
                                <th className="px-4 py-3">Points</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {/* Skeleton Placeholder Row */}
                            <tr className="animate-pulse">
                                <td className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-24"></div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="w-8 h-8 rounded-full bg-gray-200"></div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-6 bg-gray-200 rounded-full w-16"></div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-12"></div>
                                </td>
                                <td className="px-4 py-3">
                                    <div className="h-4 bg-gray-200 rounded w-16"></div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
}
