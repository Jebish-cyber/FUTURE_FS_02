package E_Commerce.backend.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class Product {

    @Id
    private String id;

    @NotBlank
    private String name;

    @NotNull
    private Integer price;

    @NotBlank
    private String category;

    @NotBlank
    private String imageUrl;

    @NotNull
    private Integer quantity;
}
