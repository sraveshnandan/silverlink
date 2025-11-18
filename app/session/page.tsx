"use client";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { randomID } from "@/utils";

/**
 * Parse the query string from a URL and obtain its query parameters.
 *
 * @param url - The full URL to parse; defaults to the current page URL.
 * @returns A `URLSearchParams` instance representing the URL's query parameters, or an empty `URLSearchParams` if the URL has no query string.
 */
export function getUrlParams(
  url: string = window.location.href
): URLSearchParams {
  let urlStr = url.split("?")[1];
  return new URLSearchParams(urlStr);
}

/**
 * Render a full-viewport container that initializes and joins a Zego video conference when mounted.
 *
 * The component determines a `roomID` from the URL `roomID` query parameter or a generated fallback,
 * then initializes and joins a Zego UIKit prebuilt video conference inside the rendered container.
 *
 * @returns A JSX element: a full-viewport div that starts and hosts a Zego video conference using the resolved room ID.
 */
export default function App() {
  const roomID = getUrlParams().get("roomID") || randomID(5);
  let myMeeting = async (element: HTMLDivElement) => {
    const userID = randomID(5);
    const userName = randomID(5);
    const res = {
      token: randomID(12),
    };
    // generate token
    const token = ZegoUIKitPrebuilt.generateKitTokenForProduction(
      1484647939,
      res.token,
      roomID,
      userID,
      userName
    );
    // create instance object from token
    const zp = ZegoUIKitPrebuilt.create(token);

    // start the call
    zp.joinRoom({
      container: element,
      sharedLinks: [
        {
          name: "Personal link",
          url:
            window.location.origin +
            window.location.pathname +
            "?roomID=" +
            roomID,
        },
      ],
      scenario: {
        mode: ZegoUIKitPrebuilt.VideoConference,
      },
    });
  };

  return (
    <div
      className="myCallContainer"
      ref={myMeeting as any}
      style={{ width: "100vw", height: "100vh" }}
    ></div>
  );
}