package com.bs.bus.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Setter
@ApiModel
public class CollectVo {
    @NotNull(message = "类型不能为空")
    @ApiModelProperty("类型，1：收藏，2：取消收藏")
    @ApiParam("类型，1：收藏，2：取消收藏")
    private Integer type;

    @NotBlank(message = "商品id不能为空")
    @ApiModelProperty("商品id")
    @ApiParam("商品id")
    private String goodsId;
}
