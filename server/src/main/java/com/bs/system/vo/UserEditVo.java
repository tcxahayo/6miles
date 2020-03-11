package com.bs.system.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

@Getter
@Setter
@ApiModel
public class UserEditVo {
    @ApiModelProperty("头像")
    @NotBlank(message = "头像不能为空")
    private String avatar;

    @NotBlank(message = "昵称不能为空")
    @Size(min = 1, max = 8, message = "昵称长度在1～8位之间")
    @ApiParam("昵称")
    @ApiModelProperty("昵称")
    private String nickname;

    @Email(message = "邮箱格式不正确")
    @ApiParam("昵称")
    @ApiModelProperty("邮箱")
    private String email;
}
