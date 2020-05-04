package com.bs.common.jwt;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

/**
 * 需要登陆才能访问
 */
@Retention(RetentionPolicy.RUNTIME)
public @interface Authentication {
    boolean value() default true; // 是否需要登陆访问

    boolean isAdmin() default false; // 是否需要管理员身份访问
}
