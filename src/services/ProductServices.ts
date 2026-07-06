import { Product } from "../models/ProductModel.js";
import { products} from "../data/ProductData.js"

let nextId = 1;

export const createProduct = (
    name:string,
    price:number,
    stock:number
): Product => {
    const product: Product ={
        id: nextId,
        name,
        price,
        stock,
    };
    products.push(product);
    nextId++
    return product;
}
//eliminar
export const deleteProduct = (id: number): boolean => {
    const index = products.findIndex(product => product.id === id);

    if (index !== -1) {
        products.splice(index, 1); 
        return true;
    }

    return false;
}

//listar

export const getProduct = (): Product[] => {
    return products;
};

export const getProductById = (id: number): Product | undefined => {
    return products.find(products => products.id === id);
};

//modificar

export const updateProduct = (
    id: number, 
    newData: Partial<Omit<Product, 'id'>>
): boolean => {
    const product = products.find(p => p.id === id);

    if (product) {
        Object.assign(product, newData);
        return true;
    }

    return false;
};