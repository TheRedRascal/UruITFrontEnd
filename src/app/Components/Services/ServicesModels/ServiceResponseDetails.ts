export class ServiceResponseDetails<T> {
    constructor(public Message: string,
        public Status: string,
        public Data: Array<T>) {
    }
}
