import * as _ from 'lodash';

export class ResponseOutput {

    public static createOkResponse(body: any, header?: any): ResponseOutput {
        return this.createResponse(200, body, header);
    }

    public static createBadRequestResponse(errors?: string | string[]): ResponseOutput {
        return this.createErrorResponses(400, errors);
    }

    public static createUnauthorizedResponse(): ResponseOutput {
        return this.createErrorResponses(401, 'UNAUTHENTICATED_HTTP_RESPONSES');
    }

    public static createNotFoundRequestResponse(): ResponseOutput {
        return this.createErrorResponses(404, null);
    }

    public static createInternalServerErrorRequestResponse(errors?: string | string[]): ResponseOutput {
        return this.createErrorResponses(500, errors);
    }

    public static createErrorResponses(statusCode: number, errors: string | string[]): ResponseOutput {
        if (errors) {
            const errorObj = {
                errors: []
            };
            if (Array.isArray(errors)) {
                _.forEach(errors, (err) => {
                    errorObj.errors.push(err);
                });
            } else {
                errorObj.errors.push(errors);
            }
            return this.createResponse(statusCode, errorObj);
        }
        return this.createResponse(statusCode);
    }

    public static createResponse(statusCode: number, body?: any, header?: any): ResponseOutput {
        const response = new ResponseOutput();
        response.statusCode = statusCode;
        if (body) {
            response.body = body;
        }
        if (header) {
            response.header = header;
        }

        return response;
    }

    public statusCode: number;
    public header: any;
    public body: any;

    public isOK(): boolean {
        let ok = true;
        if (this.statusCode >= 400) {
            ok = false;
        }
        return ok;
    }
}
