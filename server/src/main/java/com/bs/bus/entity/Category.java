package com.bs.bus.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

/**
 * <p>
 * 商品分类
 * </p>
 *
 * @author tcx
 * @since 2020-02-07
 */
@Data
@EqualsAndHashCode(callSuper = true)
@Accessors(chain = true)
@TableName("bus_category")
public class Category extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 父id
     */
    @TableField("parentId")
    private String parentId;

    /**
     * 标题
     */
    private String title;


}
