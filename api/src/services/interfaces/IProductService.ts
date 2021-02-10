import {ResponseOutput} from "../../commons/ResponseOutput";

export default interface IProductService {
    listing(): Promise<ResponseOutput>;
}
