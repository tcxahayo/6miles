package com.bs.bus.controller;


import com.bs.bus.entity.Goods;
import com.bs.bus.service.IGoodsService;
import com.bs.common.jwt.RequiresAuthentication;
import com.bs.common.utils.R;
import io.swagger.annotations.Api;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bs.common.base.BaseController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import java.util.List;

/**
 * <p>
 * 商品表 前端控制器
 * </p>
 *
 * @author tcx
 * @since 2020-02-08
 */
@RestController
@RequestMapping("/goods")
@Api(tags = "商品模块")
public class GoodsController extends BaseController {

    private IGoodsService goodsService;

    @Autowired
    public void setGoodsService(IGoodsService goodsService) {
        this.goodsService = goodsService;
    }


    @PostMapping
    @RequiresAuthentication
    public R<Boolean> addGoods(@Valid Goods goods, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        goods.setUserId(userId);
        goodsService.addGoods(goods);
        return new R<>(true, "添加成功");
    }

    @GetMapping
    public R<List<Goods>> getGoods(HttpServletRequest request) {
        String token = request.getHeader("token");


        return null;
    }

}
