package com.bs.bus.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.bs.bus.entity.Category;
import com.bs.bus.mapper.CategoryMapper;
import com.bs.bus.service.ICategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.bus.vo.CategoryVo;
import com.bs.common.exception.GlobalException;
import org.springframework.beans.BeanUtils;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

/**
 * <p>
 * 商品分类 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-02-07
 */
@Service
public class CategoryServiceImpl extends ServiceImpl<CategoryMapper, Category> implements ICategoryService {
    @Override
    public void addCategory(CategoryVo categoryVo) throws Exception {
        Category category = new Category();
        categoryVo.setId(null);
        BeanUtils.copyProperties(categoryVo, category);//深拷贝
        boolean result = this.save(category);//save--mybaties-plus的插入单条数据方法
        if (!result) {
            throw new GlobalException("添加失败");
        }
    }

    @Override
    public void updateCategory(CategoryVo categoryVo) throws Exception {
        String id = categoryVo.getId();
        Category category = this.getById(id);
        category.setSort(categoryVo.getSort());
        category.setIcon(categoryVo.getIcon());
        category.setTitle(categoryVo.getTitle());
        this.updateById(category);
    }

    @Override
    public void deleteCategory(String id) throws Exception {
        Wrapper<Category> wrapper = new UpdateWrapper<Category>().eq("id", id).or().eq("parentId", id);//eq是mybaties-plus的条件构造器，相当于=
        this.remove(wrapper);
    }

    @Override
    public List<Category> getCategory() throws Exception {
        Wrapper<Category> wrapper = new QueryWrapper<Category>().orderByAsc("sort");
        List<Category> categories = this.list(wrapper);
        return treeCategoryData("0", categories);
    }

    private List<Category> treeCategoryData(String parentId, List<Category> categories) {
        List<Category> parentList = categories.stream().filter(x -> parentId.equals(x.getParentId())).collect(Collectors.toList());//stream数据处理，要使用filter等数据操作，前面就要有
        categories = categories.stream().filter(x -> !parentId.equals(x.getParentId())).collect(Collectors.toList());//equals是否等于
        if (categories.size() == 0) {
            return parentList;
        }
        for (Category c : parentList) {
            c.setChildren(treeCategoryData(c.getId(), categories));//what is c？
        }
        return parentList;
    }
}
