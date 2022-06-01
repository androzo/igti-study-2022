import ProductRepository from "../repositories/product.repository.js";
import SupplierRepository from "../repositories/supplier.repository.js";

async function createProduct(product) {
  if (!(await SupplierRepository.getSupplier(product.supplier_id))) {
    throw new Error("O supplier fornecido não está castrado");
  }
  return await ProductRepository.insertProduct(product);
}

async function getProducts() {
  return await ProductRepository.getProducts();
}

async function getProduct(id) {
  return await ProductRepository.getProduct(id);
}

async function deleteProduct(id) {
  ProductRepository.deleteProduct(id);
}

async function updateProduct(product) {
  if (await getProduct(product.product_id)) {
    return ProductRepository.updateProduct(product);
  }
  throw new Error("Produto inexistente na base");
}

export default {
  createProduct,
  getProducts,
  getProduct,
  deleteProduct,
  updateProduct,
};
