export type HttpResponse<T> = {
  success: boolean;
  data: T;
  error?: {
    type: string;
    message: string;
    reason: string;
  };
};
