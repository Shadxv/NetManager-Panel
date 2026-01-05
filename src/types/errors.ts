export class RequestError extends Error {
    public readonly code: number;
    public readonly msg?: string;

    constructor(code: number = 500, msg?: string) {
        super(RequestError.encode(code, msg));
        this.code = code;
        this.msg = msg;
        this.name = 'RequestError';

        Object.setPrototypeOf(this, RequestError.prototype);
    }

    public static encode(code: number, msg?: string): string {
        if (!msg) return `${code}|`
        return `${code}|${msg}`;
    }

    public static decode(serializedMessage: string): { code: number; msg?: string } {
        const parts = serializedMessage.split('|');
        if (parts.length < 2) {
            return { code: 500 };
        }
        return {
            code: parseInt(parts[0], 10) || 500,
            msg: parts[1]
        };
    }
}