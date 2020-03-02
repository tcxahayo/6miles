package com.bs.bus.entity;

import java.math.BigDecimal;
import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import com.bs.system.entity.SysUser;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;
import org.apache.commons.lang3.StringUtils;

import javax.validation.constraints.Digits;
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

    public static final int STATUS_NORMAL = 1; // 状态：正常
    public static final int STATUS_LOCK = 2; // 状态：锁定
    public static final int STATUS_SELL = 3; // 状态：售出

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
    @ApiParam("分类ID")
    @NotNull(message = "分类不能为空")
    private String categoryId;

    /**
     * 商品标题
     */
    @NotBlank(message = "商品标题不能为空")
    @ApiModelProperty(value = "商品标题", required = true)
    @ApiParam("商品标题")
    private String title;

    /**
     * 商品价格
     */
    @NotNull(message = "商品价格不能为空")
    @Digits(integer = 10, fraction = 2, message = "金额不正常")
    @ApiModelProperty(value = "商品价格", required = true)
    @ApiParam("商品价格")
    private BigDecimal price;

    /**
     * 商品图片，多图使用半角逗号隔开
     */
    @NotBlank(message = "请上传商品图片")
    @ApiModelProperty(value = "商品图片", required = true)
    @ApiParam("商品图片")
    private String images;

    /**
     * 商品描述
     */
    @ApiModelProperty(value = "商品描述")
    @ApiParam("商品描述")
    @TableField("`desc`")
    private String desc;

    /**
     * 经度
     */
    @ApiModelProperty(value = "经度")
    @ApiParam("经度")
    private BigDecimal longitude;

    /**
     * 纬度
     */
    @ApiModelProperty(value = "纬度")
    @ApiParam("纬度")
    private BigDecimal latitude;

    /**
     * 地区
     */
    @ApiModelProperty(value = "地区")
    @ApiParam("地区")
    private String area;

    /**
     * 状态，1:正常，2:锁定，3:已售出
     */
    @ApiModelProperty(value = "状态，1:正常，2:锁定，3:已售出", hidden = true)
    @ApiParam(value = "状态，1:正常，2:锁定，3:已售出", hidden = true)
    private Integer status;

    /**
     * 是否收藏
     */
    @ApiModelProperty(value = "是否收藏")
    @TableField(exist = false)
    private boolean collection;

    public void setCollection(String collection) {
        this.collection = true;
        if (StringUtils.isBlank(collection)) {
            this.collection = false;
        }
    }

    @ApiModelProperty(value = "商品发布人")
    @TableField(exist = false)
    private SysUser user;
}
