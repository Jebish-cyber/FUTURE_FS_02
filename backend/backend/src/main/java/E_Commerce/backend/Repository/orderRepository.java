package E_Commerce.backend.Repository;

import E_Commerce.backend.Model.Order;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface orderRepository extends MongoRepository<Order, String> {
}
