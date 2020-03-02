package com.bs.system.vo;

import com.bs.common.utils.ValidatorUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@ApiModel
public class CodeVo {

    @NotBlank(message = "手机号不能为空")
    @Pattern(regexp = ValidatorUtil.REGEX_MOBILE, message = "手机号格式不正确")
    @ApiModelProperty("手机号")
    @ApiParam("手机号")
    private String Phone;
}
