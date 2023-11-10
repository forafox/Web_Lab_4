package com.forafox.web_lab_4.repo;

import com.forafox.web_lab_4.model.Server;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ServerRepo extends JpaRepository<Server, Long> {
    Server findByIpAddress(String ipAddress);
    Server findByName(String name);

}
