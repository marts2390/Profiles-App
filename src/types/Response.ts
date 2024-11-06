// 400 error
export type ApiNotFoundError = {
  errors: {
    location: string;
    msg: string;
    path: string;
    type: string;
    value: string;
  }[];
};

// 500 error
export type ApiFailError = {
  error: string;
  message: string;
  path: string;
  status: number;
  timestamp: string;
};

export type ApiError = ApiNotFoundError | ApiFailError;

export interface ResponseModel<DataType> {
  value: DataType;
  errorData: {
    status?: string | number;
    messages: string[];
  };
  hasError: boolean;
}
