package com.bs.bus.service;

import com.bs.bus.entity.Goods;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.common.exception.GlobalException;

import java.util.List;

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
     * 根据商品ID获取商品详情
     * @param id 商品id
     * @param userId 用户id
     * @return 商品详情
     * @throws Exception 异常信息
     */
    Goods getGoodsById(String id, String  userId) throws Exception;

    /**
     * 查询商品
     * @return 商品列表
     * @throws Exception 自定义异常
     */
    List<Goods> getGoodsList(String userId) throws Exception;

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
