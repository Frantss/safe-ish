import { defineError } from '~/src/define-error';
import { error } from '~/src/error';
import { result } from '~/src/result';
import { safeish, unhandledCode } from '~/src/safeish';

export const safeish_defineError = defineError;
export const safeish_error = error;
export const safeish_unhandledCode = unhandledCode;
export const safeish_result = result;
export const safeish_safe = safeish;
