package org.example.controller; // Paquete donde vive este controller

// Importaciones necesarias de Spring
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

// @Controller le dice a Spring que esta clase es un controller
// El DispatcherServlet (Front Controller) delegará las peticiones aquí
@Controller
public class PaginaController {

    // @GetMapping("/inicio") indica que este método responde
    // cuando el usuario entra a http://localhost:8080/inicio
    @GetMapping("/inicio")
    public String inicio(Model model) {
        // Model es el objeto que pasa datos del controller a la vista HTML
        model.addAttribute("titulo", "Inicio");
        model.addAttribute("mensaje", "Bienvenido a la página principal.");
        // Retorna el nombre de la vista → Thymeleaf busca templates/inicio.html
        return "inicio";
    }

    // Responde a http://localhost:8080/acerca
    @GetMapping("/acerca")
    public String acerca(Model model) {
        model.addAttribute("titulo", "Acerca de nosotros");
        model.addAttribute("mensaje", "Somos un equipo de desarrollo de software.");
        // Thymeleaf busca templates/acerca.html
        return "acerca";
    }

    // Responde a http://localhost:8080/servicios
    @GetMapping("/servicios")
    public String servicios(Model model) {
        model.addAttribute("titulo", "Servicios");
        model.addAttribute("mensaje", "Ofrecemos desarrollo web, móvil y consultoría.");
        // Thymeleaf busca templates/servicios.html
        return "servicios";
    }

    // Responde a http://localhost:8080/contacto
    @GetMapping("/contacto")
    public String contacto(Model model) {
        model.addAttribute("titulo", "Contacto");
        model.addAttribute("mensaje", "Escríbenos a: contacto@empresa.com");
        // Thymeleaf busca templates/contacto.html
        return "contacto";
    }
}