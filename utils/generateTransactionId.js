import {v4 as uuidv4} from 'uuid'

export const generateTransactionId=()=>{
    return uuidv4();
};