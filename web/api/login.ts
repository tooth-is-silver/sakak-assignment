import { z } from 'zod';

const loginRequestSchema = z.object({
  id: z.string().min(1),
  password: z.string().min(1),
});

export default {
  async fetch(request: Request) {
    if (request.method !== 'POST') {
      return Response.json(
        { status: 'error', message: '요청을 처리할 수 없습니다.', code: 'METHOD_NOT_ALLOWED' },
        { status: 405 },
      );
    }

    const parsed = loginRequestSchema.safeParse(await request.json().catch(() => null));
    if (!parsed.success) {
      return Response.json(
        {
          status: 'error',
          message: '아이디 또는 비밀번호를 확인해 주세요.',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 400 },
      );
    }

    if (parsed.data.id !== 'sakak' || parsed.data.password !== 'sakak1234') {
      return Response.json(
        {
          status: 'error',
          message: '아이디 또는 비밀번호를 확인해 주세요.',
          code: 'INVALID_CREDENTIALS',
        },
        { status: 401 },
      );
    }

    return Response.json({
      status: 'success',
      data: {
        user: { id: 'sakak', name: 'SAKAK' },
        sessionToken: 'sakak-mock-session',
      },
    });
  },
};
