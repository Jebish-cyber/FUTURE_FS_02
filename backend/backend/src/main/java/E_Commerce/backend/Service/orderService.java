package E_Commerce.backend.Service;

import E_Commerce.backend.Model.Order;
import E_Commerce.backend.Repository.orderRepository;
import E_Commerce.backend.Repository.productRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class orderService {

    @Autowired
    private orderRepository orderRepository;

    @Autowired
    private productRepository productRepository;

    public Order placeOrder(Order order) {
        order.setOrderDate(LocalDateTime.now().toString());
        Order savedOrder = orderRepository.save(order);
        productRepository.deleteAll();
        return savedOrder;
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}
