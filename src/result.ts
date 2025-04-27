import type { SafeishResult } from '~/src/types';

export const result = <Data>(data: Data) => {
  return {
    ok: true,
    data,
  } satisfies SafeishResult<Data> as SafeishResult<Data>;
};
