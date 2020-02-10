package com.bs.bus.controller;


import com.bs.bus.entity.Category;
import com.bs.bus.service.ICategoryService;
import com.bs.common.base.BaseController;
import com.bs.common.utils.R;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import java.util.List;

/**
 * <p>
 * 商品分类 前端控制器
 * </p>
 *
 * @author tcx
 * @since 2020-02-07
 */
@Validated
@RequestMapping("/category")
@RestController
@Api(tags = "商品分类模块", value = "商品")
public class CategoryController extends BaseController {

    private ICategoryService categoryService;

    @Autowired
    public void setCategoryService(ICategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @ApiOperation(value = "获取商品分类", notes = "首页左侧商品分类")
    public R<List<Category>> getCategory() {
        List<Category> treeCategory = categoryService.getCategory();
        return new R<>(treeCategory, "查询成功");
    }

    @PostMapping
    @ApiOperation(value = "添加商品分类", notes = "添加首页左侧商品分类")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "parentId", value = "父级分类id，顶级菜单不需要传"),
            @ApiImplicitParam(name = "icon", value = "分类图标"),
            @ApiImplicitParam(name = "title", value = "分类标题", required = true),
            @ApiImplicitParam(name = "sort", value = "分类排序权重，越小越靠前")
    })
    public R<Boolean> addCategory(String parentId, @NotBlank(message = "标题不能为空") String title, String icon, @Max(99) @Min(-99) Integer sort) {
        categoryService.addCategory(parentId, title, icon, sort);
        return new R<>(true, "添加成功");
    }
}
