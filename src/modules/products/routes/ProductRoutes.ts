import { Router} from 'express'
import ProductsControllers from '../controllers/ProductsControllers'



const productsRouter = Router();
const productController = new ProductsControllers();

productsRouter.get('/', productController.index.bind(productController));
productsRouter.get('/:id', productController.show.bind(productController));
productsRouter.post('/', productController.create.bind(productController));
productsRouter.put('/:id', productController.update.bind(productController));
productsRouter.delete('/:id', productController.delete.bind(productController));


export default productsRouter;
