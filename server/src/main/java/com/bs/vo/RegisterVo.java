package com.bs.dto;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * 注册
 */
@Getter
@Setter
public class RegisterDto {
    @NotNull
    private String email;

    @NotNull
    private String password;

    @NotNull
    private String nickName;
}
