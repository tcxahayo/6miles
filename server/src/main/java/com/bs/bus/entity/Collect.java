package com.bs.bus.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 用户收藏表
 * </p>
 *
 * @author tcx
 * @since 2020-02-26
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("bus_collect")
public class Collect extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     *  商品id
     */
    @TableField("goodsId")
    private String goodsId;

    /**
     * 用户id
     */
    @TableField("userId")
    private String userId;
}
