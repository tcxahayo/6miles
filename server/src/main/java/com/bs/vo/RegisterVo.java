package com.bs.vo;

import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotNull;

/**
 * 注册
 */
@Getter
@Setter
public class RegisterVo {
    @NotNull(message = "手机号不能为空")
    private String phone;

    @NotNull(message = "密码不能为空")
    private String password;

    @NotNull(message = "昵称不能为空")
    private String nickName;

    @NotNull(message = "验证码不能为空")
    private String code;
}
