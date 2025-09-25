import AppError from '@shared/errors/AppError'
import { Product } from '../database/entities/Products';
import { productsRepositories } from '../database/entities/repositories/ProductsRepositories'


interface ICreateProduct {
  name: string,
  price: number,
  quantity: number
}


export default class CreatProductService {
  async execute({name, price, quantity}: ICreateProduct): Promise<Product> {
    const productExists = await productsRepositories.findOneBy({name})

    if (productExists) {
      throw new AppError('There is already one product with this name', 409);
    }

    const product = productsRepositories.create({
      name,
      price,
      quantity
    });
    await productsRepositories.save(product);

    return product;
  }
}
