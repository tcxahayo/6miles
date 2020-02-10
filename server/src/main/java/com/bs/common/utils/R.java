package com.bs.common.utils;

import com.bs.common.constants.CommonConstant;
import lombok.Data;

import java.io.Serializable;

/**
 * 自定义结果类
 * @param <T>
 */
@Data
public class R<T> implements Serializable {

    private Integer status;
    private String msg;
    private T data;

    public R(Integer status, String msg) {
        this.status = status;
        this.msg = msg;
    }

    public R(T data, String msg) {
        this.status = CommonConstant.SUCCESS;
        this.data = data;
        this.msg = msg;
    }

    public R(Integer status, String msg, T data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }
}
