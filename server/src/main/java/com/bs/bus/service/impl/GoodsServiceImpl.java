package com.bs.bus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bs.bus.entity.Goods;
import com.bs.bus.mapper.GoodsMapper;
import com.bs.bus.service.IGoodsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.bus.vo.GoodsDetailVo;
import com.bs.common.exception.GlobalException;
import com.bs.common.utils.Page;
import com.bs.system.entity.SysCode;
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
    public void updateGoodsInfo(Goods goods) throws Exception {
        QueryWrapper<Goods> queryWrapper = new QueryWrapper<Goods>().eq("id", goods.getId()).eq("userId", goods.getUserId());
        Goods oldGoods = this.getOne(queryWrapper);
        if (ObjectUtils.isEmpty(oldGoods)) {
            throw new GlobalException("商品信息不存在");
        }
        goods.setCreateDate(oldGoods.getCreateDate());
        goods.setStatus(oldGoods.getStatus());
        this.updateById(goods);
    }

    @Override
    public GoodsDetailVo getDetailsAndRelated(String id, String  userId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("goodsId", id);
        params.put("userId", userId);
        List<Goods> list = goodsMapper.selectGoodsList(params);
        if (list.size() == 0) {
            throw new GlobalException("商品信息不存在");
        }
        Goods details = list.get(0);
        Map<String, Object> newParams = new HashMap<>();
        // 排除当前的这个id
        newParams.put("excludeGoodsId", id);
        newParams.put("userId", userId);
        newParams.put("status", Goods.STATUS_NORMAL);
        newParams.put("categoryId", details.getCategoryId());
        // 只加载8条
        newParams.put("index", 0);
        newParams.put("size", 4);
        List<Goods> relatedList = goodsMapper.selectGoodsList(newParams);

        GoodsDetailVo goodsDetailVo = new GoodsDetailVo();
        goodsDetailVo.setDetails(details);
        goodsDetailVo.setRelatedList(relatedList);
        return goodsDetailVo;
    }

    @Override
    public Goods getDetails(String id, String userId) throws Exception {
        Map<String, Object> params = new HashMap<>();
        params.put("goodsId", id);
        params.put("userId", userId);
        params.put("index", 0);
        params.put("size", 1);
        List<Goods> list = goodsMapper.selectGoodsList(params);
        if (list.size() == 0) {
            throw new GlobalException("商品信息不存在");
        }
        return list.get(0);
    }

    @Override
    public Page<List<Goods>> getGoodsList(Map<String, Object> params, Integer page, Integer size) throws Exception {
        Integer totalCount = goodsMapper.selectGoodsListCount(params);
        params.put("index", (page - 1) * size);
        params.put("size", size);
        List<Goods> list = goodsMapper.selectGoodsList(params);

        Page<List<Goods>> pageData = new Page<>();
        pageData.setPage(page);
        pageData.setSize(size);
        pageData.setTotalSize(totalCount);

        pageData.setTotalPage((int)Math.ceil(Math.ceil((double)totalCount / (double)size)));
        pageData.setList(list);
        return pageData;
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
