import { SetMetadata } from '@nestjs/common';

export const TYPEORM_EX_CUSTOM_REPOSITORY = 'TYPEORM_EX_CUSTOM_REPOSITORY';

//TODO "Function을 인자로 넘기면 안된다"라는 lint규칙을 여기서만 꺼버리는게 맞을지, 글로벌하게 꺼버리는게 맞을지 추후에 고민하기

/**
 * 참고: https://stackoverflow.com/questions/71557301/how-to-workraound-this-typeorm-error-entityrepository-is-deprecated-use-repo
 *    : https://kscodebase.tistory.com/524
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export function CustomRepository(entity: Function): ClassDecorator {
  return SetMetadata(TYPEORM_EX_CUSTOM_REPOSITORY, entity);
}
