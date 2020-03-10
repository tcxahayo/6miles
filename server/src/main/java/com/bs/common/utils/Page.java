package com.bs.common.utils;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel
public class Page<T> {
    @ApiModelProperty("每页的条数")
    private int size;

    @ApiModelProperty("当前页码")
    private int page;

    @ApiModelProperty("总条数")
    private int totalSize;

    @ApiModelProperty("总页码")
    private int totalPage;

    @ApiModelProperty("列表数据")
    private T list;
}
