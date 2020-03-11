package com.bs.system.vo;

import com.bs.common.utils.ValidatorUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;


/**
 * 注册
 */
@Getter
@Setter
@ApiModel
public class RegisterVo {
    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = ValidatorUtil.REGEX_MOBILE, message = "手机号格式不正确")
    @ApiParam("手机号")
    @ApiModelProperty("手机号")
    private String phone;

    @NotBlank(message = "密码不能为空")
    @Pattern(regexp = ValidatorUtil.REGEX_PASSWORD, message = "密码只能包含数字和字母，长度在6～16位之间")
    @ApiParam("密码")
    @ApiModelProperty("密码")
    private String password;

    @NotBlank(message = "昵称不能为空")
    @Size(min = 1, max = 10, message = "昵称长度在1～8位之间")
    @ApiParam("昵称")
    @ApiModelProperty("昵称")
    private String nickname;

    @NotBlank(message = "验证码不能为空")
    @Pattern(regexp = "^\\d{4}$", message = "请输入4位短信验证码")
    @ApiParam("手机验证码")
    @ApiModelProperty("手机验证码")
    private String code;
}
