import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/components/admin/login-form";
import { site } from "@/lib/site-data";

export default function AdminLoginPage() {
  return (
    <main className="mesh-bg grid min-h-screen place-items-center px-4 py-12">
      <div className="w-full max-w-md rounded-lg border border-[#d9e7f5] bg-white p-6 shadow-2xl shadow-[#0b2447]/10 sm:p-8">
        <Link href="/" className="mx-auto flex w-fit flex-col items-center text-center">
          <Image src={site.logo} alt="Zigo Digital logo" width={76} height={76} className="rounded-full" priority />
          <h1 className="mt-4 text-2xl font-black text-[#0b2447]">Admin Login</h1>
          <p className="mt-2 text-sm font-semibold text-[#667789]">Manage Zigo Digital website content.</p>
        </Link>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </main>
  );
}
