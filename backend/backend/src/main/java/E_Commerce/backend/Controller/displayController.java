package E_Commerce.backend.Controller;

import E_Commerce.backend.Model.Product;
import E_Commerce.backend.Model.Products;
import E_Commerce.backend.Repository.displayRepository;
import E_Commerce.backend.Service.displayService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/products")
public class displayController {

    @Autowired
    private displayRepository displayRepository;
    @Autowired
    private displayService displayService;


    @GetMapping
    public List<Products> getProducts(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String category
    ) {

        boolean filterBySearch = search != null && !search.isEmpty();
        boolean filterByCategory = category != null && !category.equalsIgnoreCase("All") && !category.isEmpty();

        if (filterBySearch && filterByCategory) {
            return displayRepository.findByNameContainingIgnoreCaseAndCategory(search, category);
        } else if (filterBySearch) {
            return displayRepository.findByNameContainingIgnoreCase(search);
        } else if (filterByCategory) {
            return displayRepository.findByCategory(category);
        } else {
            return displayRepository.findAll();
        }
    }


    @PostMapping
    public Products addProduct(@RequestBody Products products) {
        return displayService.saveProducts(products);
    }
}
