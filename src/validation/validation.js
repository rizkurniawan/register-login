import { ResponseError } from "../error/response-error.js";

const validate = (scheme, request) => {
    const result = scheme.validate(request, {
        abortEarly: false,
        allowUnknown: false
    });
    if (result.error) {
        throw new ResponseError(400, result.error.message);
    } else {
        return result.value;
    }
}

export {
    validate
}
