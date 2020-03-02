package com.bs.common.utils;

import org.springframework.util.DigestUtils;

/**
 * md5加密工具类
 */
public class MD5Util {
    /**
     * 加密
     * @param arg 要加密的字符串
     * @return 加密后的字符串
     */
    public static String encryption(String arg) {
        return DigestUtils.md5DigestAsHex(arg.getBytes());
    }
}
