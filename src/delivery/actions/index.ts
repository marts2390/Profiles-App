import { ResponseModel } from '@src/types/Response';
import { AxiosInstance } from '../connector';
import { AxiosResponse } from 'axios';
import { defaultResult } from '../utils/defaultResponse';
import { responseHandler } from '../utils/responseHandler';
import { errorHandler } from '../utils/errorHandler';
import { FormData } from '@src/types/FormData';
import { User } from '@src/types/User';

class Actions {
  getUsers = async (): Promise<ResponseModel<User[] | null>> => {
    let result = defaultResult<User[]>();

    try {
      const response = await AxiosInstance.get<User[], AxiosResponse<User[]>>(
        '/users',
      );

      result = responseHandler<User[]>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<User[]>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };

  createUser = async (
    data: FormData,
  ): Promise<ResponseModel<{id: User['id']} | null>> => {
    let result = defaultResult<{id: User['id']}>();

    try {
      const response = await AxiosInstance.post<
        {id: User['id']},
        AxiosResponse<{id: User['id']}>
      >('/users', data);

      result = responseHandler<{id: User['id']}>(response, result);
    } catch (e) {
      const { hasError, errorData } = errorHandler<{id: User['id']}>(e);

      result.hasError = hasError;
      result.errorData = errorData;
    }

    return result;
  };
}

export default new Actions();
