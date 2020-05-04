package com.bs.bus.service;

import com.bs.bus.entity.Category;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.bus.vo.CategoryVo;
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
     * @param categoryVo 分类vo
     * @throws Exception
     */
    void addCategory(CategoryVo categoryVo) throws Exception;

    /**
     * 修改分类
     * @param categoryVo 分类vo
     * @throws Exception
     */
    void updateCategory(CategoryVo categoryVo) throws Exception;

    /**
     * 删除分类
     * @param id
     * @throws Exception
     */
    void deleteCategory(String id) throws Exception;

    /**
     * 查询树级分类
     * @return 树分类
     * @throws GlobalException 自定义异常
     */
    List<Category> getCategory() throws Exception;
}
