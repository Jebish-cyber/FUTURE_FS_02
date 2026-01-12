package E_Commerce.backend.Repository;


import E_Commerce.backend.Model.Product;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public interface productRepository extends MongoRepository<Product,String> {


}
