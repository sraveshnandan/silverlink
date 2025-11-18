import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Image
        src="/next.svg"
        alt="Next.js Logo"
        className="dark:invert"
        width={180}
        height={37}
        priority
      />
      <UserButton />
    </main>
  );
}
