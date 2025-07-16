/* eslint-disable @typescript-eslint/no-unsafe-assignment */
interface IBaseResponse {
  success: boolean;
  message: string;
}

export class FailureResponse implements IBaseResponse {
  success: boolean;
  message: string;

  constructor(success: boolean, message: string) {
    this.success = success;
    this.message = message;
  }
}

export class SuccessResponse implements IBaseResponse {
  success: boolean;
  message: string;
  data?: any;

  constructor(success: boolean, message: string, data?: any) {
    this.success = success;
    this.message = message;
    this.data = data;
  }
}
