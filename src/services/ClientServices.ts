import { Client, ClientType} from "../models/ClientModel.js";
import { clients} from "../data/ClientData.js"

let nextId = 1;

export const createClient = (
    name:string,
    age: number,      
    address: string,  
    type: ClientType  ):  Client => {
    const client: Client ={
        id: nextId,
        name,
        age,
        address,
        type
    };
    clients.push(client);
    nextId++
    return client;
}

// eliminar
export const deleteClient = (id: number): boolean => {
    const index = clients.findIndex(client => client.id === id);
    
    if (index !== -1) {
        clients.splice(index, 1); 
        return true;
    }
    
    return false;
}

//listar
export const getClient = (): Client[] => {
    return clients;
};

export const getClientById = (id: number): Client | undefined => {
    return clients.find(clients => clients.id === id);
};

//modificar

export const updateClient = (
    id: number, 
    updates: Partial<Omit<Client, 'id'>>
): boolean => {
    const client = clients.find(c => c.id === id);
    if (client) {
        Object.assign(client, updates);
        return true;
    }
    return false;
};