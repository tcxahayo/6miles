package com.bs.bus.entity;

import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import com.bs.system.entity.SysUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * <p>
 * 商品表
 * </p>
 *
 * @author tcx
 * @since 2020-02-08
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("bus_goods")
@ApiModel
public class Goods extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 用户id
     */
    @TableField("userId")
    @ApiModelProperty(hidden = true)
    private String userId;

    /**
     * 分类id
     */
    @TableField("categoryId")
    @ApiModelProperty(value = "分类ID", required = true)
    @NotBlank(message = "分类不能为空")
    private String categoryId;

    /**
     * 商品标题
     */
    @NotBlank(message = "商品标题不能为空")
    @ApiModelProperty(value = "商品标题", required = true)
    private String title;

    /**
     * 商品价格
     */
    @NotNull(message = "商品价格不能为空")
    @ApiModelProperty(value = "商品标题", required = true)
    private BigDecimal price;

    /**
     * 商品图片，多图使用半角逗号隔开
     */
    @NotBlank(message = "请上传商品图片")
    @ApiModelProperty(value = "商品标题", required = true)
    private String images;

    /**
     * 商品描述
     */
    @ApiModelProperty(value = "商品描述", required = true)
    private String desc;

    /**
     * 经度
     */
    @ApiModelProperty(value = "经度")
    private BigDecimal longitude;

    /**
     * 纬度
     */
    @ApiModelProperty(value = "纬度")
    private BigDecimal latitude;

    /**
     * 地区
     */
    @ApiModelProperty(value = "地区")
    private String area;

    /**
     * 状态
     */
    @ApiModelProperty(hidden = true)
    private Integer status;

    
    private SysUser user;
}
