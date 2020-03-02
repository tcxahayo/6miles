package com.bs.common.constants;

import lombok.Getter;

/**
 * 常用系统常量
 */
public interface CommonConstant {
    /**
     * 成功标记
     */
    int SUCCESS = 200;

    /**
     * 错误标记
     */
    int ERROR = 500;

    /**
     * 认证失败标题
     */
    int AUTHORIZATION_ERROR = 302;

    /**
     * 参数错误
     */
    int PARAM_ERROR = 401;

    /**
     * 前后端分离，前端携带的Token标识
     */
    String AUTHORIZATION_FLAG = "token";

    /**
     * UTF-8编码
     */
    String UTF8 = "UTF-8";
}
