package E_Commerce.backend.Controller;


import E_Commerce.backend.Model.User;
import E_Commerce.backend.Repository.UserRepository;
import E_Commerce.backend.Service.UserService;
import E_Commerce.backend.utils.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Map;

@RequiredArgsConstructor
@RestController
public class AuthController {
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final UserService userService;

    @PostMapping("/auth/register")
    public ResponseEntity<String> registerUser(@RequestBody Map<String,String> body)
    {
        String name = body.get("name");
        String email = body.get("email");
        String password = passwordEncoder.encode(body.get("password"));
        if(userRepository.findByEmail(email).isPresent())
        {
            return new ResponseEntity<>("Email already exists" , HttpStatus.CONFLICT);
        }
        userService.addUser(User.builder().name(name).email(email).password(password).build());
        return new ResponseEntity<>("Successfully Registered",HttpStatus.CREATED);
    }
    @PostMapping("/auth/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String,String> body)
    {
        String email = body.get("email");
        String password = body.get("password");

        //checking if user is registered
        var userOptional = userRepository.findByEmail(email);
        if(userOptional.isEmpty())
        {
            return new ResponseEntity<>("Not Registered Yet",HttpStatus.UNAUTHORIZED);
        }

        //Checking whether the user enters the correct password
        User user = userOptional.get();
        if(!passwordEncoder.matches(password,user.getPassword()))
        {
            return new ResponseEntity<>("Invalid user",HttpStatus.UNAUTHORIZED);
        }

        //Generating token for the user
        String token = jwtUtil.generateToken(email);
        return ResponseEntity.ok(Map.of("token",token));
    }
}
