<h1 align="center">Safe-ish</h1>

<div align="center">
  <a href="https://bundlejs.com/?q=safeish" >
    <img src="https://deno.bundlejs.com/badge?q=safeish@0.1.0" />
  </a>

  <a href="https://github.com/frantss/safeish/blob/main/LICENSE">
    <img alt="MIT License" src="https://img.shields.io/github/license/frantss/safeish?logo=open-source-initiative" />
  </a>
</div>

<h2>Safe-ish error handling.</h2>

A lightweight TypeScript library for robust error handling using a Result-like pattern. It helps you safely execute functions, catch exceptions gracefully, and work with predictable success (`SafeishResult`) and error (`SafeishError`) types, avoiding runtime crashes from unhandled exceptions.

## Why `safeish`?

-   **Prevent Crashes:** Wrap functions with `safeish` to automatically catch thrown exceptions and convert them into structured `SafeishError` objects.
-   **Explicit Error Handling:** Functions return either a success (`SafeishResult`) or an error (`SafeishError`), making potential failure points explicit in the type system.
-   **Structured Errors:** Define consistent error types with unique codes, context-aware messages, and optional side effects (like logging) using `defineError`.
-   **Reduce Boilerplate:** Avoid repetitive `try...catch` blocks for expected and unexpected errors.


## Installation

With npm:

```bash
npm install safeish
```

With any other package manager:

```bash
# pnpm
pnpm add safeish

# yarn
yarn add safeish

# bun
bun add safeish

# jsr
npx jsr add @frantss/safeish
```

## Usage

```typescript
import { safeish, safeish_defineError, safeish_result } from 'safeish/prefixed';

// define your errors
const errors = {
  greater_than_50: safeish_defineError({
    code: 'greater_than_50',
    // you can specified a required context for the error, this can be used for building the message or handling the error
    message: (context: number) => `Value ${context} is greater than 50`,
  }),

  greater_than_65: safeish_defineError({ // this
    code: 'greater_than_65', // this
    message: (context: number) => `Value ${context} is greater than 65`,
    
  }),

  greater_than_80: safeish_defineError({
    code: 'greater_than_80',
    message: () => 'Value is greater than 80',
    // you can also specify an effect to be called when the error is created
    effect: () => { // arguments are the same as in message
      console.log('effect');
    },
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
  if (value > 0.8) return errors.greater_than_80(); // creating this error will trigger the effect

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
```

### With ts-pattern

Safe-ish works great when paired with [ts-pattern](https://github.com/gvergnaud/ts-pattern), a pattern matching library for TypeScript.
It allows you to easily ensure you are handling all possible errors exhaustively.

```typescript
const result = someFunctionThatMightFail();

match(result)
  .with({ ok: true }, (data) => {
    // handle success
  })
  .with({ error: { code: 'greater_than_50' } }, (error) => {
    // handle error
    error.error.context; // number
  })
  .with({ error: { code: 'greater_than_80' } }, (error) => {
    // handle error
    error.error.context; // undefined
  })
  .with({ error: { code: '~unhandled' } }, (error) => {
    // handle any unhandled error
    error.error.context; // unknown
  })
  .exhaustive();
```

## API

### `defineError`

Defines a reusable blueprint for a specific error type, including its unique code, context-aware message generation function, and optional side effect function (e.g., for logging).

### `result`

Creates a `SafeishResult` object representing a successful outcome ("Ok"), wrapping the success payload.

### `error`

Creates an ad-hoc `SafeishError` object representing a failure ("Err"). Prefer using the factory function returned by `defineError` for consistency and to automatically trigger side effects.

### `safeish`

Wraps a function to provide safe execution. It catches any exceptions thrown by the wrapped function and maps them to a specified error definition, ensuring the function always returns a Promise resolving to a `SafeishResult` or `SafeishError`.


## Inspirations

This library was inspired by the following projects:

- [neverthrow](https://github.com/supermacro/neverthrow)
- [ts-results](https://github.com/vultix/ts-results)
