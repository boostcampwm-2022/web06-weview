interface ImageSlidingStyle {
  transform: string;
  transition: string;
}

export const getNextImageStyle = (index: number): ImageSlidingStyle => ({
  transform: `translateX(-${index}00%)`,
  transition: `all 0.4s ease-in-out`,
});

export const get3dImageTransformStyle = (
  result: number
): ImageSlidingStyle => ({
  transform: `translate3d(${result}px, 0px, 0px)`,
  transition: "0ms",
});
