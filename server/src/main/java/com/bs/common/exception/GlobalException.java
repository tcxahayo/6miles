package com.bs.common.exception;

/**
 *  自定义异常类
 */
public class GlobalException extends RuntimeException{

    private String msg;

    public GlobalException(String message) {
        super(message);
        this.msg = message;
    }
}
