package E_Commerce.backend.Service;


import E_Commerce.backend.Model.Product;
import E_Commerce.backend.Repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class productService {
    @Autowired
    private productRepository productRepository;
    public Product addProducts(Product product)
    {
        return productRepository.save(product);
    }
    public List<Product> getlistOfProducts()
    {
        return productRepository.findAll();
    }
    public void deleteProductById(String id) {
        productRepository.deleteById(id);
    }
    public Product updateQuantity(String id, int quantity) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found"));

        product.setQuantity(quantity);
        return productRepository.save(product);
    }

}
