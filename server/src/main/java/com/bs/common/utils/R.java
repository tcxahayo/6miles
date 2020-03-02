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

    public R(Integer status, String msg, T data) {
        this.status = status;
        this.msg = msg;
        this.data = data;
    }

    public static R error(Integer status, String msg) {
        return new R(status, msg, null);
    }

    public static R<Boolean> success(String msg) {
        return new R<>(CommonConstant.SUCCESS, msg, null);
    }

    public static<T> R<T> success(T data, String msg) {
        return new R<>(CommonConstant.SUCCESS, msg, data);
    }

    public static<T> R<T> selectSuccess(T data) {
        return new R<>(CommonConstant.SUCCESS, "查询成功", data);
    }

    public static R<Boolean> deleteSuccess() {
        return new R<>(CommonConstant.SUCCESS, "删除成功", true);
    }

    public static R<Boolean> putSuccess() {
        return new R<>(CommonConstant.SUCCESS, "修改成功", true);
    }

    public static<T> R<T> putSuccess(T data) {
        return new R<>(CommonConstant.SUCCESS, "修改成功", data);
    }

    public static R<Boolean> postSuccess() {
        return new R<>(CommonConstant.SUCCESS, "添加成功", true);
    }

    public static<T> R<T> postSuccess(T data) {
        return new R(CommonConstant.SUCCESS, "添加成功", data);
    }

    public static<T> R<T> postSuccess(T data, String message) {
        return new R(CommonConstant.SUCCESS, message, data);
    }
}
