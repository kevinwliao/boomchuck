import { useEffect } from "react";

interface UseKeyboardShortcutArgs {
  key: string;
  onKeyPressed: () => void;
  started: boolean;
}

export function useKeyboardShortcut({
  key,
  onKeyPressed,
  started,
}: UseKeyboardShortcutArgs) {
  useEffect(() => {
    function keyDownHandler(e: globalThis.KeyboardEvent) {
      if (e.key === key) {
        e.preventDefault();
        onKeyPressed();
      }
    }

    const boomchuck = document.getElementById("boomchuck");

    boomchuck?.addEventListener("keydown", keyDownHandler);

    return () => {
      boomchuck?.removeEventListener("keydown", keyDownHandler);
    };
  }, [started]);
}
