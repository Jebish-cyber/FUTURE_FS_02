package E_Commerce.backend.Model;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection="products")
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data

public class Products {
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
}
