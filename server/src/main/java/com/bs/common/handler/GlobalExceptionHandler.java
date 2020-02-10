package com.bs.server.common.handler;

import com.bs.server.common.constants.CommonConstant;
import com.bs.server.common.exception.GlobalException;
import com.bs.server.common.utils.R;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

/**
 * 全局异常处理类
 */
@RestControllerAdvice
public class GlobalExceptionHandler {

    /**
     * 系统异常类处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = Exception.class)
    public R exceptionHandle(Exception e) {
        e.printStackTrace();
        return new R(CommonConstant.ERROR, e.getMessage());
    }

    /**
     * 自定义异常类处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = GlobalException.class)
    public R globalExceptionHandle(GlobalException e) {
        return new R(CommonConstant.ERROR, e.getMessage());
    }
}
