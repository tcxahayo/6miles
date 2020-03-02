package com.bs.common.jwt;

import com.bs.common.constants.CommonConstant;
import com.bs.common.exception.AuthenticationException;
import com.bs.common.exception.GlobalException;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.Method;

/**
 * 权限校验
 */
@Component
public class AuthenticationInterceptor implements HandlerInterceptor {
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 如果不是映射到方法直接通过
        if (!(handler instanceof HandlerMethod)){
            return true;
        }
        HandlerMethod handlerMethod=(HandlerMethod)handler;
        Method method = handlerMethod.getMethod();
        //检查是否有RequiresAuthentication注释，若没有则直接跳过认证
        if (!method.isAnnotationPresent(Authentication.class)) {
            return true;
        }
        Authentication authentication = method.getAnnotation(Authentication.class);
        // 检查注解的value是否为true，若是false，直接跳过认证
        if (!authentication.value()) {
            return true;
        }
        // 从 http 请求头中取出 token
        String token = request.getHeader(CommonConstant.AUTHORIZATION_FLAG);
        if (token == null) {
            throw new AuthenticationException("身份校验失败");
        }
        // 从token中获取到账户信息
        String account = JwtUtil.getAccount(token);
        if (account == null) {
            throw new AuthenticationException("身份校验失败");
        }
        String userId = JwtUtil.getUserId(token);
        if (userId == null) {
            throw new AuthenticationException("身份校验失败");
        }
        // 校验token是否正确
        try {
            JwtUtil.verify(token, account, userId);
        } catch (Exception e) {
            throw new AuthenticationException("身份校验失败");
        }
        return true;
    }
}
