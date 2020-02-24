import { ComponentType } from 'react';

export type GetProps<C> = C extends ComponentType<infer P> ? P : never;

export type Parameters<F> = F extends (...args: infer P) => any ? P : never;
