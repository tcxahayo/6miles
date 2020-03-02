package com.bs.bus.vo;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@ApiModel
public class CategoryVo {

    @ApiModelProperty("父id")
    @ApiParam("父id，为null时为一级菜单")
    private String parentId;

    @NotBlank(message = "标题不能为空")
    @ApiModelProperty("标题")
    @ApiParam("标题")
    private String title;

    @NotBlank(message = "分类图标不能为空")
    @ApiModelProperty("分类图标")
    @ApiParam("分类图标")
    private String icon;

    @ApiModelProperty("排序")
    @ApiParam("排序，越小越靠前，默认0")
    private Integer sort;
}
