package com.bs.common.jwt;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTDecodeException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;

import java.util.Date;

public class JwtUtil {
    /**
     * JWT验证过期时间 EXPIRE_TIME 分钟
     */
    private static final long EXPIRE_TIME = 1000 * 60 * 60 * 24 * 7;

    /**
     * token密钥
     */
    private static final String SECRET_KEY = "1234567890!@#$%^&*()";

    /**
     * 校验token是否正确
     *
     * @param token 令牌
     * @param account 账户
     * @param userId 用户id
     */
    public static void verify(String token, String account, String userId) throws JWTVerificationException {
        //根据密码生成JWT效验器
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        JWTVerifier verifier = JWT.require(algorithm)
                .withClaim("account", account)
                .withClaim("userId", userId)
                .build();
        verifier.verify(token);
    }

    /**
     * 获得token中的信息无需secret解密也能获得
     * @return token中包含的负载信息
     */
    public static String getClaimInfo(String token, String key) {
        try {
            DecodedJWT jwt = JWT.decode(token);
            return jwt.getClaim(key).asString();
        } catch (JWTDecodeException e) {
            return null;
        }
    }

    /**
     * 获取token中包含的账户名
     * @param token token
     * @return 账户名
     */
    public static String getAccount(String token) {
        return JwtUtil.getClaimInfo(token, "account");
    }

    /**
     * 获取token中包含的用户id
     * @param token token
     * @return 用户id
     */
    public static String getUserId(String token) {
        return JwtUtil.getClaimInfo(token, "userId");
    }

    /**
     * 生成token签名EXPIRE_TIME 分钟后过期
     *
     * @param account 账户名
     * @param userId 用户id
     * @return 加密的token
     */
    public static String sign(String account, String userId) {
        Date date = new Date(System.currentTimeMillis() + EXPIRE_TIME);
        Algorithm algorithm = Algorithm.HMAC256(SECRET_KEY);
        // 附带username信息
        return JWT.create()
                .withClaim("account", account)
                .withClaim("userId", userId)
                .withExpiresAt(date)
                .sign(algorithm);
    }

}
