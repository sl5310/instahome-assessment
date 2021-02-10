import {ResponseOutput} from "../../commons/ResponseOutput";

export default interface ICheckoutService {
    checkout(data): Promise<ResponseOutput>;
}
