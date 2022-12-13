export class PostInputInvalidException extends Error {
  constructor(msg: string) {
    super(msg);
  }
}
