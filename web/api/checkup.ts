const CHECKUP_URL = 'https://api.candiy.io/v1/nhis/checkup';

/**
 * 브라우저 대신 해당 함수를 호출해 API Key가 클라이언트 번들에 노출되지 않게 한다.
 * 1차, 2차 요청 모두 같은 엔드포인트라 body를 그대로 전달하기만 한다.
 */
export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return Response.json(
        { status: 'error', message: 'POST만 허용합니다', code: 'VE-002' },
        { status: 405 },
      );
    }

    const apiKey = process.env.CANDIY_API_KEY;
    if (!apiKey) {
      return Response.json(
        { status: 'error', message: 'CANDIY_API_KEY가 설정되지 않았습니다', code: 'AT-002' },
        { status: 500 },
      );
    }

    const upstream = await fetch(CHECKUP_URL, {
      method: 'POST',
      headers: {
        'x-api-key': apiKey,
        'Content-Type': 'application/json',
      },
      body: await request.text(),
    });

    return new Response(upstream.body, {
      status: upstream.status,
      headers: { 'Content-Type': 'application/json' },
    });
  },
};
