import { Ratelimit } from '@upstash/ratelimit';
import { redis } from './redis';

export const RateLimit = {
  signup: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '10 m'),
    prefix: 'ratelimit:signup',
  }),

  emailSend: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(3, '15 m'),
    prefix: 'ratelimit:email',
  }),

  verification: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '10 m'),
    prefix: 'ratelimit:verification',
  }),

  upload: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(10, '1 m'),
    prefix: 'ratelimit:upload',
  }),

  login: new Ratelimit({
    redis,
    limiter: Ratelimit.slidingWindow(5, '1 m'),
    prefix: 'ratelimit:login',
  }),
};
