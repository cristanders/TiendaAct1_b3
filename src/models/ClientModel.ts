export enum ClientType {
    New = "NEW",            
    Occasional = "OCCASIONAL", 
    Frequent = "FREQUENT",  
    Inactive = "INACTIVE"
}

export interface Client{
    id:number;
    name:string;
    age:number;
    address:string
    type: ClientType;
}