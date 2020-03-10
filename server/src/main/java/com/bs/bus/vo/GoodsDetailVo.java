package com.bs.bus.vo;

import com.bs.bus.entity.Goods;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel(value = "商品详情")
public class GoodsDetailVo {

    @ApiModelProperty(value = "商品详情")
    private Goods details;

    @ApiModelProperty(value = "相关推荐")
    private List<Goods> relatedList;
}
