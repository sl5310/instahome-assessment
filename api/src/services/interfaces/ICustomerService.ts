import {ResponseOutput} from "../../commons/ResponseOutput";

export default interface ICustomerService {
    listing(): Promise<ResponseOutput>;
}
