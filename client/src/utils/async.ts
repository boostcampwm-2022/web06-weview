export const wait = async (timeToDelay: number): Promise<void> =>
  await new Promise((resolve) => setTimeout(resolve, timeToDelay));
