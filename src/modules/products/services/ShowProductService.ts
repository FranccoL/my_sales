import AppError from '@shared/errors/AppError';
import { productsRepositories } from '../database/entities/repositories/ProductsRepositories'
import { Product } from '../database/entities/Products'


interface IShowProduct {
  id: string;
}

export default class ShowProductService {
  async execute({id}: IShowProduct): Promise<Product> {
    const product = await productsRepositories.findById(id)

    if(!product) {
      throw new AppError('Product not found.', 404);
    }

    return product;
  }
}
