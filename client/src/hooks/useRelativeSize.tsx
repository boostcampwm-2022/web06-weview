import { RefObject, useCallback, useEffect, useState } from "react";
import { pipe } from "@/utils/functional";

interface RelativeSizeOptions {
  targetRef: RefObject<HTMLElement>;
  minHeight: number;
  heightRatio: number;
  windowRatio?: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface RelativeSize {
  windowSize: WindowSize;
}

// target 요소의 height 기준으로 입력한 비율에 따라
// 가로-세로 창 크기를 계산해주는 커스텀 훅 입니다.
const useRelativeSize = ({
  targetRef,
  minHeight,
  heightRatio,
  windowRatio,
}: RelativeSizeOptions): RelativeSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>({
    width: 0,
    height: 0,
  });

  // 옵션에 입력한 배율을 적용하는 함수
  const scaleWindow = useCallback(
    (windowSize: WindowSize): WindowSize => {
      return {
        width: windowSize.width * (windowRatio ?? 1.0),
        height: windowSize.height * (windowRatio ?? 1.0),
      };
    },
    [windowRatio]
  );

  // 최소 크기를 고려한 반응형 창 크기를 반환하는 함수
  const calcRelativeSize = useCallback(
    ({ width, height }: WindowSize): WindowSize => {
      const minWidth = minHeight / heightRatio;

      // 최소 창 크기를 보장하는 로직
      if (width <= minWidth || height <= minHeight) {
        return {
          width: minWidth,
          height: minHeight,
        };
      }

      // 가로 비율에 맞춰야 할 경우를 계산하는 로직
      if (width <= height && width * heightRatio <= height) {
        return {
          width,
          height: width * heightRatio,
        };
      }

      // 세로 비율에 맞춰야 할 경우를 계산하는 로직
      return {
        width: height / heightRatio,
        height,
      };
    },
    [minHeight, heightRatio]
  );

  useEffect(() => {
    if (targetRef.current === null) {
      return;
    }
    const target = targetRef.current;

    // target 요소의 크기가 변경될 경우 실행 할 콜백 함수를 등록합니다.
    const resizeObserver = new ResizeObserver((event) => {
      // Depending on the layout, you may need to swap inlineSize with
      const width = event[0].contentBoxSize[0].inlineSize;
      const height = event[0].contentBoxSize[0].blockSize;

      const scaledWindowSize = pipe(
        { width, height },
        calcRelativeSize,
        scaleWindow
      );
      setWindowSize(scaledWindowSize);
    });

    resizeObserver.observe(target);

    return () => resizeObserver.unobserve(target);
  }, [targetRef]);

  return { windowSize };
};

export default useRelativeSize;
