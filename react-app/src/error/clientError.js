export class ClientError extends Error {
    constructor(errors) {
        super("Client Error: invalid form inputs");
        this.name = "Client Error";
        this.errors = errors;
    }
}
