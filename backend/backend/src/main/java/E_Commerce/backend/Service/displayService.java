package E_Commerce.backend.Service;

import E_Commerce.backend.Model.Product;
import E_Commerce.backend.Model.Products;
import E_Commerce.backend.Repository.displayRepository;
import E_Commerce.backend.Repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class displayService {

    @Autowired
    private displayRepository displayRepository;

    public Products saveProducts(Products products) {
        return displayRepository.save(products);
    }
}
