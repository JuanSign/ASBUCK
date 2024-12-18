import Link from "next/link";
import Image from "next/image";
import { auth, signOut, signIn } from "@/auth"

const Navbar = async () => {
    const sess = await auth();

    return (
        <header className="px-5 py-3 bg-white shadow-sm font-work-sans">
            <nav className="flex justify-between items-center">
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={30} />
                </Link>

                <div className="flex items-center gap-5 text-black">
                    {sess && sess?.user ? (
                        <>
                            <Link href="/idea/create">
                                <span className="text-30-bold">Create</span>
                            </Link>

                            <form action={async () => {
                                "use server";
                                await signOut({ redirectTo: "/" })
                            }}>
                                <button type="submit" className="text-26-semibold">Logout</button>
                            </form>

                            <Link href={`/user/${sess ? 'a' : 'b'}`}>
                                <span className="text-26-semibold">{sess?.user?.name}</span>
                            </Link>
                        </>
                    ) : (
                        <form action={async () => {
                            "use server";
                            await signIn('github');
                        }}>
                            <button type="submit" className="text-26-semibold">Login</button>
                        </form>
                    )}
                </div>
            </nav>
        </header >
    )
}
export default Navbar