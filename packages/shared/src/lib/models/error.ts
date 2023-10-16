
export interface RequestErrorList {
    path?: string;
    code?: string;
    message?: string;
}

export class RequestError {
    constructor(
        public message: string,
        public errors: RequestErrorList[] = []
    ) {}
}