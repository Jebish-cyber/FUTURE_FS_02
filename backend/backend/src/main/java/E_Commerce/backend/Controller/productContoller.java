package E_Commerce.backend.Controller;


import E_Commerce.backend.Model.Product;
import E_Commerce.backend.Repository.displayRepository;
import E_Commerce.backend.Repository.productRepository;
import E_Commerce.backend.Service.productService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class productContoller {
    @Autowired
    private productService productService;
    @Autowired
    private productRepository productRepository;
    @PostMapping("addToCart")
    public ResponseEntity<Product> addToCart(@RequestBody Product product) {
        if (product.getQuantity() == null) {
            product.setQuantity(1);
        }
        return new ResponseEntity<>(productService.addProducts(product), HttpStatus.OK);
    }

    @GetMapping("displayProducts")
    ResponseEntity<List<Product>> listOfStudent()
    {
        return new ResponseEntity<List<Product>>(productService.getlistOfProducts(),HttpStatus.OK);
    }
    @DeleteMapping("deleteProduct/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable String id) {
        productService.deleteProductById(id);
        return new ResponseEntity<>("Product removed from cart", HttpStatus.OK);
    }
    @PutMapping("updateQuantity/{id}")
    public ResponseEntity<Product> updateQuantity(
            @PathVariable String id,
            @RequestParam int quantity) {

        return new ResponseEntity<>(
                productService.updateQuantity(id, quantity),
                HttpStatus.OK
        );
    }




}
