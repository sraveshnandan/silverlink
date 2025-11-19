"use client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef, useState } from "react";
import { Copy, Check, Share2 } from "lucide-react";

const SessionPage = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID") || "default-room";
  const containerRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);
  const [showShareUrl, setShowShareUrl] = useState(true);

  const shareableUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/session?roomID=${roomID}`
      : "";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareableUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  useEffect(() => {
    console.log(user);
    if (!user || !containerRef.current) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID!);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_SECRET!;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      user.id,
      user?.fullName || "User"
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: containerRef.current,
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
      showScreenSharingButton: true,
      showPreJoinView: true,
      turnOnCameraWhenJoining: false,
      turnOnMicrophoneWhenJoining: false,
      showRoomTimer: true,
    });
  }, [user, roomID]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen">
      {showShareUrl && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 max-w-md w-full mx-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Share2 className="w-5 h-5 text-blue-500" />
              <h3 className="font-semibold text-sm">Share Meeting Link</h3>
            </div>
            <button
              onClick={() => setShowShareUrl(false)}
              className="text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareableUrl}
              readOnly
              className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
            <button
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded flex items-center gap-2 transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {!showShareUrl && (
        <button
          onClick={() => setShowShareUrl(true)}
          className="absolute top-4 right-4 z-50 p-3 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg transition-colors"
          title="Show share link"
        >
          <Share2 className="w-5 h-5" />
        </button>
      )}

      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default SessionPage;
