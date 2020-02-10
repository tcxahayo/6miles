package com.bs.bus.service.impl;

import com.bs.bus.entity.Category;
import com.bs.bus.mapper.CategoryMapper;
import com.bs.bus.service.ICategoryService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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

}
