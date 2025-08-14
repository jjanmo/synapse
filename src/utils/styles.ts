/**
 * 클래스명들을 결합하는 유틸리티 함수
 * - 여러 CSS module 클래스 결합
 * - 조건부 클래스 적용
 * - undefined, null, false 값 자동 필터링
 */
export const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};
