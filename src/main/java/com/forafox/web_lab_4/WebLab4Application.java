package com.forafox.web_lab_4;

import com.forafox.web_lab_4.enumeration.Status;
import com.forafox.web_lab_4.model.Server;
import com.forafox.web_lab_4.repo.ServerRepo;
import org.apache.catalina.filters.CorsFilter;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

@SpringBootApplication
public class WebLab4Application {
	public static void main(String[] args) {
		SpringApplication.run(WebLab4Application.class, args);
	}
	@Bean
	CommandLineRunner run (ServerRepo serverRepo){
		return args -> {
			serverRepo.save(new Server(null,"192.168.1.168","Ubuntu Linux","16 GB","Personal PC",
					"http://localhost:8080/server/image/server1.png", Status.SERVER_UP));
			serverRepo.save(new Server(null,"192.168.1.58","Fedora Linux","16 GB","Dell Tower",
					"http://localhost:8080/server/image/server2.png", Status.SERVER_DOWN));
			serverRepo.save(new Server(null,"192.168.1.21","MS 2008","32 GB","Web Server",
					"http://localhost:8080/server/image/server3.png", Status.SERVER_UP));
			serverRepo.save(new Server(null,"192.168.1.14","Red Hat Enterprise Linux","64 GB","Mail Server",
					"http://localhost:8080/server/image/server4.png", Status.SERVER_DOWN));
		};
	}
//	@Bean
//	public CorsFilter corsFilter(){
//		UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
//		CorsConfiguration corsConfiguration=new CorsConfiguration();
//		corsConfiguration.setAllowCredentials(true);
//		corsConfiguration.setAllowedOrigins(Arrays.asList("http://localhost:3000","http://localhost:4200"));
//		corsConfiguration.setAllowedHeaders(Arrays.asList("Origin","Access-Control-Allow-Origin", "Content-Type",
//				"Accept","Jwt-Token","Authorization","Origin, Accept","X-Requested-With",
//				"Access-Control-Request-Method", "Access-Control-Allow-Origin",
//				"Access=Control-Allow-Credentials", "OPTIONS"));
//		urlBasedCorsConfigurationSource.registerCorsConfiguration("/**",corsConfiguration);
//		return new CorsFilter();
//
//	}
}
