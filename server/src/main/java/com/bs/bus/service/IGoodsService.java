package com.bs.bus.service;

import com.bs.bus.entity.Goods;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.bus.vo.GoodsDetailVo;
import com.bs.common.exception.GlobalException;
import com.bs.common.utils.Page;

import java.util.List;
import java.util.Map;

/**
 * <p>
 * 商品表 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-02-08
 */
public interface IGoodsService extends IService<Goods> {
    /**
     * 添加商品
     * @param goods 商品信息
     * @throws Exception 自定义异常
     */
    void addGoods(Goods goods) throws Exception;

    /**
     * 修改商品信息
     * @param goods 商品信息
     * @throws Exception
     */
    void updateGoodsInfo(Goods goods) throws Exception;

    /**
     * 根据商品ID获取商品详情以及相关推荐
     * @param id 商品id
     * @param userId 用户id
     * @return 商品详情
     * @throws Exception 异常信息
     */
    GoodsDetailVo getDetailsAndRelated(String id, String  userId) throws Exception;

    /**
     * 根据商品ID获取商品详情
     * @param id 商品id
     * @param userId 用户id
     * @return 商品详情
     * @throws Exception 异常信息
     */
    Goods getDetails(String id, String  userId) throws Exception;

    /**
     * 分页查询商品
     * @param params 查询条件
     * @param page 页码
     * @param size 每页的条数
     * @return 分页后的商品列表
     * @throws Exception 自定义异常
     */
    Page<List<Goods>> getGoodsList(Map<String, Object> params, Integer page, Integer size) throws Exception;

    /**
     * 查询用户发布的商品列表
     * @param userId 用户id
     * @return 商品列表
     * @throws Exception 异常信息
     */
    List<Goods> getSellList(String userId) throws Exception;

    /**
     * 查询用户收藏的商品列表
     * @param userId 用户id
     * @return 商品列表
     * @throws Exception 异常信息
     */
    List<Goods> getCollectList(String userId) throws Exception;
}
