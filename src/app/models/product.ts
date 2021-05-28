//import { Category } from "./category";

export interface Product {
    id:number, 
    categoryId: number,
    productName:string,
    price:number,
    weight: number,
    description: string
}