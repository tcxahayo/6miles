package com.bs.common.handler;

import com.bs.common.exception.AuthenticationException;
import com.bs.common.utils.R;
import com.bs.common.constants.CommonConstant;
import com.bs.common.exception.GlobalException;
import org.springframework.validation.BindException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.List;

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
        return R.error(CommonConstant.ERROR, e.getMessage());
    }


    /**
     * 自定义异常类处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = GlobalException.class)
    public R globalExceptionHandle(GlobalException e) {
        return R.error(CommonConstant.ERROR, e.getMessage());
    }

    /**
     * 认证异常类处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = AuthenticationException.class)
    public R authenticationExceptionHandle(AuthenticationException e) {
        return R.error(CommonConstant.AUTHORIZATION_ERROR, e.getMessage());
    }

    /**
     * 参数异常处理
     * @return
     */
    @ExceptionHandler(value = MissingServletRequestParameterException.class)
    public R exceptionHandle() {
        return R.error(CommonConstant.PARAM_ERROR, "所需必要参数不存在");
    }

    /**
     * validation注解校验异常类处理
     * @param e
     * @return
     */
    @ExceptionHandler(value = BindException.class)
    public R bindExceptionHandle(BindException e) {
        List<FieldError> fieldErrors =  e.getBindingResult().getFieldErrors();
        return R.error(CommonConstant.PARAM_ERROR, fieldErrors.get(0).getDefaultMessage());
    }

    @ExceptionHandler(value = ConstraintViolationException.class)
    public R constraintViolationExceptionHandle(ConstraintViolationException e) {
        String message = new ArrayList<>(e.getConstraintViolations()).get(0).getMessage();
        System.out.println(message);
        return R.error(CommonConstant.PARAM_ERROR, message);
    }

    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public R methodArgumentNotValidExceptionHandle(MethodArgumentNotValidException e) {
        List<FieldError> fieldErrors =  e.getBindingResult().getFieldErrors();
        return R.error(CommonConstant.PARAM_ERROR, fieldErrors.get(0).getDefaultMessage());
    }

}
