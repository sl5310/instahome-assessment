import {ResponseOutput} from "../ResponseOutput";

export const errorHandler = async (err, req, res, next) => {
    const response = ResponseOutput.createInternalServerErrorRequestResponse();
    response.body = { error: err.message };
    res.status(response.statusCode).send(response.body);
};
