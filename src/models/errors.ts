export interface ValidateErrorJSON {
    message: "Validation failed";
    details: { [name: string]: unknown };
}

export class ReturnSummaryError extends Error {

    public status: number;
    public code: string;
    public data: any;

    constructor(status: number, code: string, data: any){
        super();
        this.status = status;
        this.code = code;
        this.data = data;
    }

    public toJSON(): any {
        return {
            status: this.status,
            code: this.code,
            data: this.data
        };
    }
}