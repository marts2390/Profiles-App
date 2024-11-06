import { ApiError, ResponseModel } from '@src/types/Response';
import { AxiosResponse, HttpStatusCode } from 'axios';

export const responseHandler = <T>(
  res: AxiosResponse<T>,
  result: ResponseModel<T | null>,
): ResponseModel<T | null> => {
  const invalidCodes = [
    HttpStatusCode.NotFound,
    HttpStatusCode.InternalServerError,
    HttpStatusCode.BadRequest,
    HttpStatusCode.Conflict,
    HttpStatusCode.MethodNotAllowed,
  ];

  // Handle no content response
  if (res.status === HttpStatusCode.NoContent) {
    result.value = null;

    return result;
  }

  // Handle errors
  if (invalidCodes.includes(res.status)) {
    result.hasError = true;
    result.errorData.status = res.status;

    const err = res?.data as ApiError;

    result.errorData.messages =
      'errors' in err ? err.errors.map((item) => item.msg) : [err.message];

    return result;
  }

  // return result if no errors
  result.value = res.data;

  return result;
};
