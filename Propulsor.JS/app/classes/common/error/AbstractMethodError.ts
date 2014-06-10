
export = AbstractMethodError;
class AbstractMethodError implements Error {
    name: string;
    message: string;

    constructor() {
        this.message = "Abstract method called";
    }

}