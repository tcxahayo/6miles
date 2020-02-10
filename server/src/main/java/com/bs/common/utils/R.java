package com.bs.server.common.utils;

import com.bs.server.common.constants.CommonConstant;
import lombok.Data;

import java.io.Serializable;

/**
 * 自定义结果类
 * @param <T>
 */
@Data
public class R<T> implements Serializable {

    private Integer code;
    private String msg;
    private T data;

    public R(Integer code, String msg) {
        this.code = code;
        this.msg = msg;
    }

    public R(T data, String msg) {
        this.code = CommonConstant.SUCCESS;
        this.data = data;
        this.msg = msg;
    }

    public R(Integer code, String msg, T data) {
        this.code = code;
        this.msg = msg;
        this.data = data;
    }
}
