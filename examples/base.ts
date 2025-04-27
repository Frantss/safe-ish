import { safeish_defineError, safeish_result } from '~/entries/prefixed';
import { safeish } from '~/src/safeish';

const errors = {
  greater_than_50: safeish_defineError({
    code: 'greater_than_50',
    message: (context: number) => `Value ${context} is greater than 50`,
  }),

  greater_than_80: safeish_defineError({
    code: 'greater_than_80',
    message: () => 'Value is greater than 80',
  }),
};

// you can access the error builder's code, context schema, and message builder if needed
errors.greater_than_50.code;
errors.greater_than_50.message;
errors.greater_than_50.$context; // you also have access to a type-only property to easily reference the context type

const someFunctionThatMightFail = safeish(() => {
  const value = Math.random();

  // whenever you get to an error case, return the corresponding error instead of throwing or returning void or undefined
  // note that calling the error builder will add a sentry breadcrumb, this will be useful for debugging
  if (value > 0.5) return errors.greater_than_50(value);
  if (value > 0.8) return errors.greater_than_80();

  // for success cases use safe_result, which will wrap the data in a Safe_Result object
  return safeish_result(value);
});

const result = someFunctionThatMightFail();

// you can handle error and success cases separately by just asserting the value of ok
if (result.ok) {
  // handle success
  result.data; // number
} else {
  // handle error
  result.error.code; // 'greater_than_50' | 'greater_than_80' | '~unhandled'
  result.error.message; // string

  // you can handle each error case separately
  if (result.error.code === 'greater_than_50') {
    result.error.context; // number
  } else if (result.error.code === 'greater_than_80') {
    result.error.context; // undefined
  } else {
    // handle any unhandled error
    result.error.code; // '~unhandled'
    result.error.context; // unknown
  }
}
