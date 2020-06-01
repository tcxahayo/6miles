package com.bs.bus.entity;

import com.baomidou.mybatisplus.annotation.TableName;
import com.baomidou.mybatisplus.annotation.TableField;
import com.bs.common.base.BaseEntity;
import io.swagger.annotations.ApiModel;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.util.List;

/**
 * <p>
 * 商品分类
 * </p>
 *
 * @author tcx
 * @since 2020-02-07
 */
 //@Data相当于@Getter @Setter @RequiredArgsConstructor @ToString @EqualsAndHashCode这5个注解的合集
@Data
@EqualsAndHashCode(callSuper = true)//这个注解的作用就是自动的给model bean实现equals方法和hashcode方法，有@Data就要有这个，不然数据库会出错
@Accessors(chain = true)//通过该注解可以控制getter和setter方法的形式，chain 若为true，则setter方法返回当前对象
@TableName("bus_category")
public class Category extends BaseEntity {

    private static final long serialVersionUID = 1L;

    /**
     * 父id
     */
    @TableField("parentId")
    private String parentId;

    /**
     * 父标题
     */
    @TableField("parentTitle")
    private String parentTitle;

    /**
     * 标题
     */
    private String title;

    /**
     * 分类图标
     */
    private String icon;

    /**
     * 排序权重，数字越小越靠前
     */
    private Integer sort;

    /**
     * 子菜单
     */
    @TableField(exist = false)
    private List<Category> children;
}
