package com.bs.common.handler;

import com.bs.common.utils.R;
import com.bs.common.constants.CommonConstant;
import com.bs.common.exception.GlobalException;
import org.springframework.validation.BindException;
import org.springframework.web.bind.MissingServletRequestParameterException;
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
     * 参数异常处理
     * @return
     */
    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public R exceptionHandle() {
        return new R(401, "参数不正确");
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
