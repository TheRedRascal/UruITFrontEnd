import { ServiceResponseDetails } from './ServiceResponseDetails';

export class ServiceResponse<T>{
    Message: ServiceResponseDetails<T>;
    constructor() {
    }
}
