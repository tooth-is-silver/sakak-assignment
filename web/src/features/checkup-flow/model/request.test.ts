import { createAuthenticationRequest } from './request';

test('폼 값을 CANDiY 1차 인증 요청으로 구성한다', () => {
  expect(
    createAuthenticationRequest(
      {
        legalName: '홍길동',
        birthdate: '19900201',
        phoneNo: '01012345678',
        telecom: '2',
        startDate: '2022',
        endDate: '2026',
      },
      'id-request-id',
    ),
  ).toEqual({
    id: 'id-request-id',
    loginTypeLevel: '1',
    legalName: '홍길동',
    birthdate: '19900201',
    phoneNo: '01012345678',
    telecom: '2',
    startDate: '2022',
    endDate: '2026',
    inquiryType: '0',
  });
});
