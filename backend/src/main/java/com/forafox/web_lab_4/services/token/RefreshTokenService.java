package com.forafox.web_lab_4.services.token;

import com.forafox.web_lab_4.exception.TokenRefreshException;
import com.forafox.web_lab_4.models.token.RefreshToken;
import com.forafox.web_lab_4.models.token.RefreshTokenRepository;
import com.forafox.web_lab_4.models.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

@Service
public class RefreshTokenService {
    private Long refreshTokenDurationMs= 86400000L;

    @Autowired
    private RefreshTokenRepository refreshTokenRepository;

    @Autowired
    private UserRepository userRepository;

    public Optional<RefreshToken> findByToken(String token) {
        return refreshTokenRepository.findByToken(token);
    }

    public String createRefreshToken(Integer userId) {
        RefreshToken refreshToken;

       Optional<RefreshToken> refreshToken1 = refreshTokenRepository.getByUserId(userId);

       if(refreshToken1.isEmpty()){
           refreshToken= new RefreshToken();
           refreshToken.setUser(userRepository.findById(userId).get());
       }else{
           refreshToken=refreshTokenRepository.getByUserId(userId).get();
       }

        refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
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
        return refreshTokenRepository.deleteByUser(userRepository.findById(Math.toIntExact(userId)).get());
    }
}
