package com.bs.bus.service;

import com.bs.bus.entity.Goods;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.common.exception.GlobalException;

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
     * @throws GlobalException 自定义异常
     */
    void addGoods(Goods goods) throws GlobalException;
}
