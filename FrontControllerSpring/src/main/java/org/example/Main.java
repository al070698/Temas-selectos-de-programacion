package org.example;  // ← corregido

import org.eclipse.jetty.server.Server;
import org.eclipse.jetty.servlet.ServletContextHandler;
import org.eclipse.jetty.servlet.ServletHolder;
import org.example.config.AppConfig;
import org.springframework.web.context.support.AnnotationConfigWebApplicationContext;
import org.springframework.web.servlet.DispatcherServlet;

public class Main {
    public static void main(String[] args) throws Exception {

        // 1. Crear el contexto de Spring con nuestra configuración
        AnnotationConfigWebApplicationContext context =
                new AnnotationConfigWebApplicationContext();
        context.register(AppConfig.class);

        // 2. Crear el DispatcherServlet (el Front Controller)
        DispatcherServlet dispatcher = new DispatcherServlet(context);

        // 3. Configurar Jetty como servidor
        Server server = new Server(8080);
        ServletContextHandler handler = new ServletContextHandler();
        handler.setContextPath("/");

        // 4. Registrar el DispatcherServlet — toda petición pasa por él
        handler.addServlet(new ServletHolder(dispatcher), "/");

        server.setHandler(handler);
        server.start();

        System.out.println("=== Servidor corriendo en http://localhost:8080/inicio ===");
        System.out.println("=== Front Controller activo: DispatcherServlet ===");

        server.join();
    }
}