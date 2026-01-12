package E_Commerce.backend.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Order {

    @Id
    private String id;

    private String name;
    private String email;
    private String phone;
    private String address;

    private List<Product> products;
    private int totalAmount;
    private String orderDate;
}
