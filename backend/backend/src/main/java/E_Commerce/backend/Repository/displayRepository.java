package E_Commerce.backend.Repository;

import E_Commerce.backend.Model.Product;
import E_Commerce.backend.Model.Products;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;
@Component
public interface displayRepository extends MongoRepository<Products,String> {
    List<Products> findByNameContainingIgnoreCaseAndCategory(String name, String category);
    List<Products> findByNameContainingIgnoreCase(String name);

    List<Products> findByCategory(String category);

}
