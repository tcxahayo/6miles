package com.bs.common.exception;

/**
 * 身份认证异常信息
 */
public class AuthenticationException extends RuntimeException {

    private String msg;

    public AuthenticationException(String message) {
        super(message);
        this.msg = message;
    }
}
