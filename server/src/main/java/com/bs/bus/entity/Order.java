package com.bs.bus.entity;

import com.baomidou.mybatisplus.annotation.TableName;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import com.bs.common.utils.ValidatorUtil;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import javax.validation.constraints.Digits;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;

/**
 * <p>
 * 用户订单表
 * </p>
 *
 * @author tcx
 * @since 2020-03-01
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("bus_order")
@ApiModel("订单")
public class Order extends BaseEntity {

    private static final long serialVersionUID = 1L;

    public static final int STATUS_CANCEL = 0; // 已取消
    public static final int STATUS_WAIT = 1; // 待付款
    public static final int STATUS_PAID = 2; // 已付款


    /**
     * 用户id
     */
    @TableField("userId")
    @ApiModelProperty(value = "用户id", hidden = true)
    @ApiParam(value = "用户id", hidden = true)
    private String userId;

    /**
     * 商品id
     */
    @TableField("goodsId")
    @ApiModelProperty(value = "商品id")
    @NotBlank(message = "商品id不能为空")
    @ApiParam(value = "商品id")
    private String goodsId;

    /**
     * 订单编号
      */
    @ApiModelProperty(value = "商品id", hidden = true)
    @ApiParam(value = "订单编号", hidden = true)
    private String number;

    /**
     * 收货人姓名
     */
    @ApiModelProperty(value = "收货人姓名")
    @ApiParam(value = "收货人姓名", required = true)
    @NotBlank(message = "收货人姓名不能为空")
    private String name;

    /**
     * 收货人手机号
     */
    @ApiModelProperty(value = "收货人手机号")
    @ApiParam(value = "收货人手机号", required = true)
    @NotBlank(message = "收货人手机号不能为空")
    @Pattern(regexp = ValidatorUtil.REGEX_MOBILE, message = "手机号格式不正确")
    private String phone;

    /**
     * 收货地址
     */
    @ApiModelProperty(value = "收货地址")
    @ApiParam(value = "收货地址", required = true)
    @NotBlank(message = "收货地址不能为空")
    private String address;

    /**
     * 订单备注
     */
    @ApiModelProperty(value = "订单备注")
    @ApiParam(value = "订单备注")
    private String remark;


    /**
     * 订单价格
     */
    @ApiModelProperty(value = "商品价格", required = true)
    @ApiParam(value = "商品价格", required = true)
    private BigDecimal price;

    /**
     * 订单状态：1:待支付，2:已支付
     */
    @ApiModelProperty(value = "订单状态：1:待支付，2:已支付", hidden = true)
    @ApiParam(value = "订单状态：1:待支付，2:已支付", hidden = true)
    private Integer status;

    /**
     * 支付时间
     */
    @TableField("payDate")
    @ApiModelProperty(value = "支付时间", hidden = true)
    @ApiParam(value = "支付时间", hidden = true)
    private LocalDateTime payDate;

    /**
     * 支付方式：1:支付宝，2:微信
     */
    @TableField("payType")
    @ApiModelProperty(value = "支付方式：1:支付宝，2:微信", hidden = true)
    @ApiParam(value = "支付方式：1:支付宝，2:微信", hidden = true)
    private Integer payType;

    /**
     * 商品信息
     */
    @ApiModelProperty(value = "商品信息", hidden = true)
    @ApiParam(value = "商品信息", hidden = true)
    @TableField(exist = false)
    private Goods goods;
}
