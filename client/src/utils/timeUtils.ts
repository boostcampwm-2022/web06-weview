interface TimeDiff {
  yearDiff: number;
  monthDiff: number;
  dayDiff: number;
  hourDiff: number;
  minDiff: number;
  secDiff: number;
  msDiff: number;
}

export const ONE_SEC = 1000; // 1sec = 1000ms
export const ONE_MINUTE = 60; // 1min = 60sec
export const ONE_HOUR = 60; // 1hour = 60minutes
export const ONE_DAY = 24; // 1day = 24hours
export const ONE_MONTH = 30; // 1month = 30days
export const ONE_YEAR = 12; // 1year = 12month;

/**
 * 현재 시간과 입력한 시간의 차이를 [밀리초, 초, 분, 시간, 일, 월, 년] 단위로 반환합니다.
 * 시간 차이는 정수 단위로 저장합니다.
 * @param date 비교할 시간 객체
 */
export const diff = (date: Date): TimeDiff => {
  const now = new Date();

  const msDiff = now.getTime() - date.getTime();
  const secDiff = Math.floor(msDiff / ONE_SEC);
  const minDiff = Math.floor(secDiff / ONE_MINUTE);
  const hourDiff = Math.floor(minDiff / ONE_HOUR);
  const dayDiff = Math.floor(hourDiff / ONE_DAY);
  const monthDiff = Math.floor(dayDiff / ONE_MONTH);
  const yearDiff = Math.floor(monthDiff / ONE_YEAR);

  return { msDiff, secDiff, minDiff, hourDiff, dayDiff, monthDiff, yearDiff };
};
