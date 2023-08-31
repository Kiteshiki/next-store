import Link from "next/link";

export default function Home() {
  return (
    <div className="bg-black w-full h-screen text-white">
      <Link href="/api/auth/login">Login</Link>
    </div>
  );
}
