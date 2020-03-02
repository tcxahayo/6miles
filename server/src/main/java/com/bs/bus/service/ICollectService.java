package com.bs.bus.service;

import com.bs.bus.entity.Collect;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 用户收藏表 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-02-26
 */
public interface ICollectService extends IService<Collect> {

    /**
     * 商品收藏
     * @param goodsId 商品id
     * @param userId 用户id
     */
    void collect(String goodsId, String userId) throws Exception;

    /**
     * 商品取消收藏
     * @param goodsId 商品id
     * @param userId 用户id
     */
    void unCollect(String goodsId, String userId) throws Exception;
}
