import { ResponseModel, ApiError } from '@src/types/Response';
import { isAxiosError } from 'axios';

export const errorHandler = <T>(
  e: unknown,
): Omit<ResponseModel<T>, 'value'> => {
  const errorRes: Omit<ResponseModel<T>, 'value'> = {
    hasError: false,
    errorData: {
      messages: [],
    },
  };

  if (isAxiosError(e)) {
    const err = e.response?.data as ApiError;

    errorRes.hasError = true;
    errorRes.errorData.status = e.response?.status;

    if (!err) {
      errorRes.hasError = true;
      errorRes.errorData.messages = [
        'Oops, something went wrong, please try again',
      ];

      return errorRes;
    }

    errorRes.errorData.messages =
      'errors' in err ? err.errors.map((item) => item.msg) : [err.message];
  }

  return errorRes;
};
