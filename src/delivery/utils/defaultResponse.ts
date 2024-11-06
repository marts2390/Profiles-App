import { ResponseModel } from '@src/types/Response';

export const defaultResult = <T>(): ResponseModel<T | null> => ({
  value: null,
  hasError: false,
  errorData: {
    messages: [],
  },
});
