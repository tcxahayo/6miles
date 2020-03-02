package com.bs.bus.service.impl;

import com.bs.bus.entity.Goods;
import com.bs.bus.mapper.GoodsMapper;
import com.bs.bus.service.IGoodsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.common.exception.GlobalException;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * <p>
 * 商品表 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-02-08
 */
@Service
public class GoodsServiceImpl extends ServiceImpl<GoodsMapper, Goods> implements IGoodsService {

    private GoodsMapper goodsMapper;

    @Autowired
    public void setGoodsMapper(GoodsMapper goodsMapper) {
        this.goodsMapper = goodsMapper;
    }

    @Override
    public void addGoods( Goods goods) throws Exception {
        boolean result = this.save(goods);
        if (!result) {
            throw new GlobalException("添加失败");
        }
    }

    @Override
    public Goods getGoodsById(String id, String  userId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("goodsId", id);
        params.put("userId", userId);
        List<Goods> list = goodsMapper.selectGoodsList(params);
        if (list.size() == 0) {
            throw new GlobalException("商品信息不存在");
        }
        return list.get(0);
    }

    @Override
    public List<Goods> getGoodsList(String userId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("status", Goods.STATUS_NORMAL);
        params.put("userId", userId);
        return goodsMapper.selectGoodsList(params);
    }

    @Override
    public List<Goods> getSellList(String userId) throws Exception {
        return goodsMapper.selectSellGoodsList(userId);
    }

    @Override
    public List<Goods> getCollectList(String userId) throws Exception {
        return goodsMapper.selectCollectGoods(userId);
    }
}
