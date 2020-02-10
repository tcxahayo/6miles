package com.bs.server.common.constants;

public interface CommonConstant {
    /**
     * 前后端分离，前端携带的Token标识
     */
    public final static String AUTHORIZATION = "Authorization";

    public final static String REFERENCED_SESSION_ID_SOURCE = "Stateless request";

    /**
     * 成功标记
     */
    public final static int SUCCESS = 200;

    /**
     * 错误标记
     */
    public final static int ERROR = 500;

    /**
     * UTF-8编码
     */
    public final static String UTF8 = "UTF-8";
}
