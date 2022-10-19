export class InputData {
    constructor(data = "", error = null) {
        this.data = data;
        this.error = error;
    }
}

export const Validate = (data) => {
    let count = 0;
    let length = 0;

    for(let value in data) {
        if(data[value].data.length > 0){
            count++;
        }
        length++;
    }

    if(count === length) {
        return false;
    }else{
        return true;
    }
}

/* Not Yet Tested */
export const ErrorHandler = (data, error) => {

    for(let value in error) {
        if(error[value]) {
            let string = "";

            error[value].forEach(message => {
                string += message;
                string += ' '
            });

            data[value].error = string;
        }else{
            data[value].error = error.message;
        }

        data[value].data = "";
    }

    return data;
}