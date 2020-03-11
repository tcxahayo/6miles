package com.bs.bus.controller;


import com.bs.bus.entity.Goods;
import com.bs.bus.service.ICollectService;
import com.bs.bus.service.IGoodsService;
import com.bs.bus.vo.CollectVo;
import com.bs.bus.vo.GoodsDetailVo;
import com.bs.common.constants.CommonConstant;
import com.bs.common.jwt.Authentication;
import com.bs.common.jwt.JwtUtil;
import com.bs.common.utils.Page;
import com.bs.common.utils.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.bs.common.base.BaseController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.websocket.server.PathParam;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private ICollectService collectService;

    @Autowired
    public void setGoodsService(IGoodsService goodsService) {
        this.goodsService = goodsService;
    }
    @Autowired
    public void setCollectService(ICollectService collectService) {
        this.collectService = collectService;
    }

    @GetMapping
    @ApiOperation(value = "获取商品列表", notes = "商品列表")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, paramType = "query", dataType="Integer"),
            @ApiImplicitParam(name = "size", value = "条数", required = true, paramType = "query", dataType="Integer"),
            @ApiImplicitParam(name = "categoryId", value = "分类id", paramType = "query"),
            @ApiImplicitParam(name = "keyword", value = "关键字", paramType = "query"),
    })
    public R<Page<List<Goods>>> list(
            HttpServletRequest request,
            String categoryId,
            String keyword,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size
    ) throws Exception {
        String userId = null;
        try {
            String token = request.getHeader(CommonConstant.AUTHORIZATION_FLAG);
            userId = JwtUtil.getUserId(token);
        } catch (Exception e) {}
        Map<String, Object> params = new HashMap<>();
        params.put("status", Goods.STATUS_NORMAL);
        params.put("categoryId", categoryId);
        params.put("userId", userId);
        if (StringUtils.isNoneBlank(keyword)) {
            String[] keywordArr = keyword.split("\\s+");
            params.put("keywords", keywordArr);
        }
        Page<List<Goods>> pageData = goodsService.getGoodsList(params, page, size);
        return R.selectSuccess(pageData);
    }

    @GetMapping("/{id}")
    @ApiOperation(value = "获取商品详情", notes = "商品详情")
    @ApiImplicitParam(paramType = "path", name = "id", value = "商品id")
    public R<GoodsDetailVo> getById(@PathVariable("id") String id, HttpServletRequest request) throws Exception {
        String userId = null;
        try {
            String token = request.getHeader(CommonConstant.AUTHORIZATION_FLAG);
            userId = JwtUtil.getUserId(token);
        } catch (Exception e) {}
        GoodsDetailVo goodsDetailVo = goodsService.getGoodsById(id, userId);
        return R.selectSuccess(goodsDetailVo);
    }


    @PostMapping
    @Authentication
    @ApiOperation(value = "发布商品", notes = "用户发布商品")
    public R<Boolean> save(@Valid @RequestBody Goods goods, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        goods.setUserId(userId);
        goodsService.addGoods(goods);
        return R.postSuccess();
    }

    @Authentication
    @GetMapping("/sellList")
    @ApiOperation(value = "获取发布的商品列表", notes = "商品列表")
    public R<List<Goods>> getSellList(HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        List<Goods> goods = goodsService.getSellList(userId);
        return R.selectSuccess(goods);
    }

    @PostMapping("/collect")
    @Authentication
    @ApiOperation(value = "收藏/取消商品", notes = "用户收藏/取消商品")
    public R<Boolean> collect(@Valid @RequestBody CollectVo collectVo, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        if (collectVo.getType() == 1) {
            collectService.collect(collectVo.getGoodsId(), userId);
            return R.success("收藏成功");
        } else {
            collectService.unCollect(collectVo.getGoodsId(), userId);
            return R.success("取消收藏成功");
        }
    }

    @GetMapping("/collect")
    @Authentication
    @ApiOperation(value = "收藏列表", notes = "用户收藏的商品列表")
    public R<List<Goods>> collectList(HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        List<Goods> list = goodsService.getCollectList(userId);
        return R.selectSuccess(list);
    }

}
