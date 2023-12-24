package com.forafox.web_lab_4.services.token;

import com.forafox.web_lab_4.exception.TokenRefreshException;
import com.forafox.web_lab_4.exception.UserNotFoundException;
import com.forafox.web_lab_4.models.token.RefreshToken;
import com.forafox.web_lab_4.models.token.RefreshTokenRepository;
import com.forafox.web_lab_4.models.user.User;
import com.forafox.web_lab_4.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {

    private final Duration JWT_REFRESH_ACCESS_TIME_TO_LIVE = Duration.ofDays(7);

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public String createRefreshToken(Long userId) {
        RefreshToken refreshToken;

        Optional<RefreshToken> refreshToken1 = refreshTokenRepository.getByUserId(userId);

        if (refreshToken1.isEmpty()) {
            refreshToken = new RefreshToken();
            refreshToken.setUser(userRepository.findById(userId).get());
        } else {
            refreshToken = refreshTokenRepository.getByUserId(userId).get();
        }

        var currentTime = Instant.now();
        var expirationTime = currentTime.plus(JWT_REFRESH_ACCESS_TIME_TO_LIVE);
        refreshToken.setExpiryDate(expirationTime);
        refreshToken.setToken(UUID.randomUUID().toString());

        refreshToken = refreshTokenRepository.save(refreshToken);
        return refreshToken.getToken();
    }

    public RefreshToken verifyExpiration(RefreshToken token) {
        if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
            refreshTokenRepository.delete(token);
            throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
        }

        return token;
    }

    public int deleteByUserId(Long userId) {
        Optional<User> user = userRepository.findById(userId);
        if (user.isPresent()) {
            return refreshTokenRepository.deleteByUser(user.get());
        } else {
            throw new UserNotFoundException();
        }
    }
}
