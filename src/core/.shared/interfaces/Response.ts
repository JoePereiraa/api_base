import { HTTPCode } from '../enums/_enums';

interface Response {
    status_code: HTTPCode;
    data?: any;
    message?: any;
}

export { Response }