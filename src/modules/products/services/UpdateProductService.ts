import { Product } from "../database/entities/Products"
import { productsRepositories } from "../database/entities/repositories/ProductsRepositories";
import AppError from '@shared/errors/AppError'

interface IUpdateProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export default class UpdatProductService {
  async execute({
    id,
     name,
     price,
     quantity,

  }: IUpdateProduct): Promise<Product> {
    const product = await productsRepositories.findById(id);

        if(!product) {
          throw new AppError('Product not found.', 404);
        }

        const productExists = await productsRepositories.findByName(name);

        if (productExists) {
          throw new AppError('There is already one product with this name', 409);
        }


        product.name = name;
        product.price = price;
        product.quantity = quantity;

        await productsRepositories.save(product);

        return product
  }
}
