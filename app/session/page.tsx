"use client";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useEffect, useRef } from "react";

const SessionPage = () => {
  const { user } = useUser();
  const searchParams = useSearchParams();
  const roomID = searchParams.get("roomID") || "default-room";
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user || !containerRef.current) return;

    const appID = parseInt(process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_ID!);
    const serverSecret = process.env.NEXT_PUBLIC_ZEGOCLOUD_APP_SECRET!;

    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomID,
      user.id,
      "User"
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
    <div className="w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
    </div>
  );
};

export default SessionPage;
