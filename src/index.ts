import PromptSync from "prompt-sync";
import { createProduct, deleteProduct, getProduct, updateProduct } from "./services/ProductServices.js";
import { createClient, deleteClient, getClient, updateClient } from "./services/ClientServices.js";
import { ClientType } from "./models/ClientModel.js";


const prompt = PromptSync();

const readNumber = (message: string): number => {
    return Number(prompt(message));
};

const createProductWindow = (): void => {
    const name = prompt("Ingresa el nombre del producto: ");
    const price = readNumber("Ingresa el precio: ");
    const stock = readNumber("Ingresa el stock: ");

    if (!name || price <= 0 || stock < 0) {
        console.log("Error, debes de ingresar datos adecuados\n");
        return;
    }

    const product = createProduct(name, price, stock);
    console.log("Producto creado");
    console.log(product, "\n");
};

const deleteProductWindow = (): void => {
    const id = readNumber("Ingresa el id del producto a eliminar: ");
    const success = deleteProduct(id);

    if (success) {
        console.log(`Producto con el id: ${id} eliminado\n`);
    } else {
        console.log(`No se encontroo el producto con el id: ${id}\n`);
    }
};

const listProductsWindow = (): void => {
    const list = getProduct();
    console.log("listado de Productos:");
    if (list.length === 0) {
        console.log("No hay productos registrados");
    } else {
        console.table(list);
    }
    console.log("\n");
};

const updateProductWindow = (): void => {
    const id = readNumber("Ingresa el id del producto a modificar: ");
    
    // Aquí puedes preguntar qué quieres modificar
    const name = prompt("Nuevo nombre (dejar vacío para no cambiar): ");
    const price = prompt("Nuevo precio (dejar vacío para no cambiar): ");
    const stock = prompt("Nuevo stock (dejar vacío para no cambiar): ");

    // Creamos un objeto solo con lo que se escribió
    const updates: Partial<Product> = {};
    if (name) updates.name = name;
    if (price) updates.price = Number(price);
    if (stock) updates.stock = Number(stock);

    const success = updateProduct(id, updates);

    if (success) {
        console.log(`Producto con ID: ${id} actualizado correctamente.`);
    } else {
        console.log(`No se encontró el producto con ID: ${id}.`);
    }
};

const productsMenu = (): void => {
    console.log("| PRODUCTOS |");
    console.log("1- Crear productos");
    console.log("2- Eliminar producto");
    console.log("3- Listar productos");
    console.log("4- Actualizar producto");
    console.log("5- Volver al menu principal");
    
    const option = prompt("selecciona una opcion: ");

    switch (option) {
        case "1":
            createProductWindow();
            productsMenu(); 
            break;
        case "2":
            deleteProductWindow();
            productsMenu();
            break;
        case "3":
            listProductsWindow();
            productsMenu();
            break;
        case "4": 
            updateProductWindow(); 
            productsMenu(); 
            break;
        case "5":
            mainMenu();
            break;
        default:
            console.log("Opcion no valida, intenta de nuevo\n");
            productsMenu();
    }
};


//clientes


// poner el enum al cliente
const createClientWindow = (): void => {
    const name = prompt("Ingresa el nombre del cliente: ");
    const age = readNumber("Ingresa la edad: ");
    const address = prompt("Ingresa la dirección: ");
    
    console.log("\nSelecciona el tipo de cliente:");
    console.log("1. Nuevo");
    console.log("2. Ocasional");
    console.log("3. Recurrente (Frecuente)");
    console.log("4. Inactivo");
    const typeOption = prompt("Opcion: ");

    let type: ClientType;

    switch (typeOption) {
        case "1": type = ClientType.New; break;
        case "2": type = ClientType.Occasional; break;
        case "3": type = ClientType.Frequent; break;
        case "4": type = ClientType.Inactive; break;
        default:
            console.log("Opcion invalida, se pondra como nuevo por defecto \n");
            type = ClientType.New;
    }

    if (!name || age <= 0 || !address) {
        console.log("debes ingresar datos adecuados\n");
        return;
    }

    const client = createClient(name, age, address, type);
    console.log("Cliente creado");
    console.log(client, "\n");
};

//listar clientes

const listClientsWindow = (): void => {
    const list = getClient();
    console.log("listado de Clientes:");
    if (list.length === 0) {
        console.log("no hay clientes registrados");
    } else {
        console.table(list); 
    }
    console.log("\n");
};


// borrar cliente
const deleteClientWindow = (): void => {
    const id = readNumber("Ingresa el id del cliente a eliminar: ");
    const success = deleteClient(id);

    if (success) {
        console.log(`Cliente con el id: ${id} eliminado correctamente\n`);
    } else {
        console.log(`No se encontró el cliente de id: ${id}\n`);
    }
};

//modificar
const updateClientWindow = (): void => {
    const id = readNumber("Ingresa el ID del cliente a modificar: ");
    
    const name = prompt("Nuevo nombre (dejar vacio para no cambiar): ");
    const age = prompt("Nueva edad (dejar vacio para no cambiar): ");
    const address = prompt("Nueva dirección (dejar vacio para no cambiar): ");
    
    console.log("¿Deseas cambiar el tipo de cliente? (1:Nuevo, 2:Ocasional, 3:Recurrente, 4:Inactivo, Enter para omitir)");
    const typeOption = prompt("Opción: ");

    const updates: Partial<Client> = {};
    if (name) updates.name = name;
    if (age) updates.age = Number(age);
    if (address) updates.address = address;
    if (typeOption) {
        switch (typeOption) {
            case "1": updates.type = ClientType.New; break;
            case "2": updates.type = ClientType.Occasional; break;
            case "3": updates.type = ClientType.Frequent; break;
            case "4": updates.type = ClientType.Inactive; break;
        }
    }

    const success = updateClient(id, updates);

    if (success) {
        console.log(`Cliente con ID: ${id} actualizado correctamente\n`);
    } else {
        console.log(`No se encontro el cliente con ID: ${id}.\n`);
    }
};

//clientes 
const clientsMenu = (): void => {
    console.log("| CLIENTES |");
    console.log("1- Crear cliente");
    console.log("2- Eliminar cliente");
    console.log("3- Listar Clientes");
    console.log("4- Actualizar cliente");
    console.log("5- volver al menu principal");
    
    const option = prompt("Selecciona una opcion: ");

    switch (option) {
        case "1":
            createClientWindow();
            clientsMenu();        
            break;
        case "2":
            deleteClientWindow();
            clientsMenu();
            break;
        case "3":
            listClientsWindow();
            clientsMenu();
            break;
        case "4": 
            updateClientWindow(); 
            clientsMenu(); 
            break;
        case "5":
            mainMenu();     
            break;
        default:
            console.log("Opcion no valida, intenta de nuevo\n");
            clientsMenu();
    }
};

// Opciones del menu
const mainMenu = (): void => {
    console.log("| Tienda Cristian |");
    console.log("1. Sección de productos");
    console.log("2. Sección de clientes");
    console.log("3. Salir");
    
    const option = prompt("Selecciona una opcion: ");
    switch (option) {
        case "1":
            productsMenu();   
            break;
        case "2":
            clientsMenu(); 
            break;
        case "3":
            console.log("Abandonando la tienda");
            break;
        default:
            console.log("Opcion no valida, intenta de nuevo\n");
            mainMenu(); 
    }
};

// Iniciar la aplicación
mainMenu();
