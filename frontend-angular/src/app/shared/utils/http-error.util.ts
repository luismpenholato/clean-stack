import { HttpErrorResponse } from '@angular/common/http';

const DEFAULT_MESSAGE = 'Something went wrong. Please try again.';

export function getApiErrorMessage(err: unknown): string {
  if (!err) {
    return DEFAULT_MESSAGE;
  }

  if (err instanceof HttpErrorResponse) {
    const body = err.error;
    if (body && typeof body === 'object') {
      const msg =
        body.detail ??
        body.title ??
        body.message ??
        extractFromErrors(body.errors);
      if (msg && typeof msg === 'string') {
        return msg;
      }
    }
    if (err.status === 0) {
      return 'No connection. Check your network or whether the API is running.';
    }
    if (err.status >= 500) {
      return 'Server error. Please try again later.';
    }
    if (err.status === 404) {
      return 'Resource not found.';
    }
    return err.message || DEFAULT_MESSAGE;
  }

  if (err instanceof Error) {
    return err.message || DEFAULT_MESSAGE;
  }

  return DEFAULT_MESSAGE;
}

function extractFromErrors(errors: unknown): string | null {
  if (!errors || typeof errors !== 'object') {
    return null;
  }
  const first = Object.values(errors)[0];
  if (Array.isArray(first) && first.length > 0) {
    return typeof first[0] === 'string' ? first[0] : String(first[0]);
  }
  if (typeof first === 'string') {
    return first;
  }
  return null;
}
