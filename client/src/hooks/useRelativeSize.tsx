import { useCallback, useEffect, useState } from "react";

interface RelativeSizeOptions {
  minWidth: number;
  minHeight: number;
  heightRatio: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface RelativeSize {
  windowSize: WindowSize;
}

// 브라우저 width, height -> height 100% 기준으로 width
// padding-bottom : width-height
const useRelativeSize = ({
  minWidth,
  minHeight,
  heightRatio,
}: RelativeSizeOptions): RelativeSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  const calcRelativeSize = useCallback(
    (height: number): WindowSize => {
      if (height < minHeight) {
        return {
          width: minHeight / heightRatio,
          height: minHeight,
        };
      }

      const width = height / heightRatio;
      if (width < minWidth) {
        return {
          width: minWidth,
          height: minHeight,
        };
      }

      return {
        width,
        height,
      };
    },
    [minWidth, minHeight, heightRatio]
  );

  useEffect(() => {
    const resizeEventListener = (): void => {
      const { width, height } = calcRelativeSize(window.innerHeight);
      setWindowSize({ width, height });
    };

    resizeEventListener();

    window.addEventListener("resize", resizeEventListener);

    return () => {
      window.removeEventListener("resize", resizeEventListener);
    };
  }, [heightRatio]);

  return { windowSize };
};

export default useRelativeSize;
