package com.bs.system.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel
public class LoginVo {

    @NotBlank(message = "手机号不能为空")
    @ApiParam("手机号")
    @ApiModelProperty("手机号")
    private String phone;

    @NotBlank(message = "密码不能为空")
    @ApiParam("密码")
    @ApiModelProperty("密码")
    private String password;


    @ApiParam("类型")
    @ApiModelProperty("类型")
    private Integer type;
}
