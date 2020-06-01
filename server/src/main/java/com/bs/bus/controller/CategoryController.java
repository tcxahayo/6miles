package com.bs.bus.controller;

import com.bs.bus.entity.Category;
import com.bs.bus.service.ICategoryService;
import com.bs.bus.vo.CategoryVo;
import com.bs.common.base.BaseController;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.Authentication;
import com.bs.common.utils.R;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
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
    public R<List<Category>> getCategory() throws Exception {
        List<Category> treeCategory = categoryService.getCategory();
        return R.selectSuccess(treeCategory);
    }

    @PostMapping
    @Authentication(isAdmin = true)
    @ApiOperation(value = "添加商品分类", notes = "添加首页左侧商品分类")
    public R<Boolean> addCategory(@RequestBody @Valid CategoryVo categoryVo) throws Exception {  //R是什么东西啊？R是定义的返回值类型
        categoryService.addCategory(categoryVo);
        return R.postSuccess();
    }

    @PutMapping
    @Authentication(isAdmin = true)
    @ApiOperation(value = "修改商品分类", notes = "修改首页左侧商品分类")
    public R<Boolean> updateCategory(@RequestBody @Valid CategoryVo categoryVo) throws Exception {
        categoryService.updateCategory(categoryVo);
        return R.putSuccess();
    }

    @DeleteMapping("/{id}")
    @Authentication(isAdmin = true)
    @ApiOperation(value = "删除商品分类", notes = "删除首页左侧商品分类")
    public R<Boolean> addCategory(@PathVariable("id") String id) throws Exception {
        categoryService.deleteCategory(id);
        return R.deleteSuccess();
    }
}
