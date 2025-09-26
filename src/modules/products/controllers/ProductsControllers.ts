import { Request, Response } from 'express';
import ListProductService from '../services/ListProductService';
import ShowProductService from '../services/ShowProductService';
import CreateProductService from '../services/CreateProductService'
import UpdateProductService from '../services/UpdateProductService'
import DeleteProductService from '../services/DeleteProductService'

export default class ProductsControllers {

  async index(request: Request, response: Response): Promise<Response> {
    const listProductsService = new ListProductService();
    const products = await listProductsService.execute();
    return response.status(200).json(products);
  }


  async show(request: Request, response: Response): Promise<Response> {

    const { id } = request.params as { id: string };

    const showProductService = new ShowProductService();
    const product = await showProductService.execute({ id });
    return response.status(200).json(product);
  }

  async create(request: Request, response: Response): Promise<Response> {
    const { name, price, quantity} = request.body;
    const createProductService = new CreateProductService();
    const product = await createProductService.execute({
      name,
      price,
      quantity,
    });


    return response.json(product);
  }

async update(request: Request, response: Response): Promise<Response> {
  // Garante que TypeScript entende que id existe
  const { id } = request.params as { id: string };
  const { name, price, quantity } = request.body;

  const updateProductService = new UpdateProductService();
  const product = await updateProductService.execute({
    id,
    name,
    price,
    quantity,
  });

  return response.status(200).json(product);
}


async delete(request: Request, response: Response): Promise<Response> {
  const { id } = request.params as { id: string };

  const deleteProductService = new DeleteProductService();
  await deleteProductService.execute({ id });

  return response.status(204).send([]);
}
}
