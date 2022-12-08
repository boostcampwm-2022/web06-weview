export const isCloseModalElement = (element: HTMLElement): boolean =>
  element.matches(".modal-background") ||
  element.matches(".modal-close-button") ||
  element.matches("path");
