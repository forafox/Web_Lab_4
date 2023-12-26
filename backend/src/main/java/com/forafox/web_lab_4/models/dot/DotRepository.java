package com.forafox.web_lab_4.models.dot;

import com.forafox.web_lab_4.models.user.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
@Repository
public interface DotRepository extends JpaRepository<Dot,Long> {
    Optional<Dot> findById(Long id);

    Optional<List<Dot>> findAllByUser(User user);

    @Transactional
    Optional<List<Dot>> deleteAllByUser(User user);

    Page<Dot> findByStatus(String status, Pageable pageable);
}
