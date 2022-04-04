import { ResponseModel } from "./responseModel";

export interface ListResponseModel<T> extends ResponseModel{
    List: T[];
    Entity: T;
}