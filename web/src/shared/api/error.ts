/**
 * CANDiY가 내려준 실패 응답.
 * 화면이 오류코드로 분기해야 해서(AE-003 재인증, AT-003 키 오류 등) code를 함께 들고 다닌다.
 */
export class CandiyRequestError extends Error {
  readonly code: string;

  constructor(code: string, message: string) {
    super(message);
    this.name = 'CandiyRequestError';
    this.code = code;
  }
}
