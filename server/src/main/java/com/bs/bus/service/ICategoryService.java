package com.bs.bus.service;

import com.bs.bus.entity.Category;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.common.exception.GlobalException;

import java.util.List;

/**
 * <p>
 * 商品分类 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-02-07
 */
public interface ICategoryService extends IService<Category> {

    /**
     * 添加分类
     * @param parentId 父id（null时为顶级菜单）
     * @param title 分类名
     * @param icon 分类图标
     * @param sort 排序
     * @throws GlobalException 自定义异常
     */
    void addCategory(String parentId, String title, String icon, Integer sort) throws GlobalException;

    /**
     * 查询树级分类
     * @return 树分类
     * @throws GlobalException 自定义异常
     */
    List<Category> getCategory() throws GlobalException;
}
