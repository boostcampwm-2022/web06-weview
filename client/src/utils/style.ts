export const getNextImageStyle = (
  index: number
): { transform: string; transition: string } => ({
  transform: `translateX(-${index}00%)`,
  transition: `all 0.4s ease-in-out`,
});
