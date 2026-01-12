package E_Commerce.backend.Repository;

import E_Commerce.backend.Model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public interface UserRepository extends MongoRepository<User,String> {
    Optional<User> findByEmail(String email);
}
