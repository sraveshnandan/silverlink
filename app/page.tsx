"use client";
import { api } from "@/convex/_generated/api";
import { UserProfile } from "@clerk/clerk-react";
import { useUser } from "@clerk/nextjs";
import { useConvexAuth, useMutation } from "convex/react";
import Image from "next/image";
import { useEffect } from "react";

/**
 * Home page component that renders the main layout and ensures the authenticated user is stored in the backend.
 *
 * When authentication finishes and a current user ID is available, this component triggers creation/upsert of the user record.
 *
 * @returns The React element for the home page.
 */
export default function Home() {
  const { isLoading, isAuthenticated } = useConvexAuth();

  const { user } = useUser();

  const storeUser = useMutation(api.users.store);

  const create_user = async () => {
    await storeUser();
  };

  useEffect(() => {
    if (!isLoading && isAuthenticated && user?.id) {
      create_user();
    }
    return () => {};
  }, [isLoading, isAuthenticated, user?.id]);
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
    </main>
  );
}