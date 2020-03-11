package com.bs.system.vo;

import com.bs.common.utils.ValidatorUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@ApiModel
public class UpdatePasswordVo {

    @ApiModelProperty("新密码")
    @NotBlank(message = "新密码不能为空")
    @Pattern(regexp = ValidatorUtil.REGEX_PASSWORD, message = "密码只能包含数字和字母，长度在6～16位之间")
    private String newPassword;


    @ApiModelProperty("旧密码")
    @NotBlank(message = "旧密码不能为空")
    private String oldPassword;
}
