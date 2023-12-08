package com.forafox.web_lab_4.models.dot;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
@Repository
public interface DotRepository extends JpaRepository<Dot,Long> {
    Optional<Dot> findById(Long id);
}
