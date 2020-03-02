package com.bs.bus.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@ApiModel
@Getter
@Setter
public class OrderPayVo {

    @ApiParam(value = "订单编号")
    @ApiModelProperty(value = "订单编号")
    @NotBlank(message = "订单编号不能为空")
    private String number;


    @ApiParam(value = "支付方式：1:支付宝，2:微信")
    @ApiModelProperty(value = "支付方式：1:支付宝，2:微信")
    @NotNull(message = "请选择支付方式")
    private Integer type;

    @ApiParam(value = "用户id", hidden = true)
    @ApiModelProperty(value = "用户id", hidden = true)
    private String userId;
}
