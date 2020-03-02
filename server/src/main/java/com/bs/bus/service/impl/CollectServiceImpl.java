package com.bs.bus.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.bs.bus.entity.Collect;
import com.bs.bus.mapper.CollectMapper;
import com.bs.bus.service.ICollectService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.common.exception.GlobalException;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;


/**
 * <p>
 * 用户收藏表 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-02-26
 */
@Service
public class CollectServiceImpl extends ServiceImpl<CollectMapper, Collect> implements ICollectService {

    @Override
    public void collect(String goodsId, String userId) throws Exception {
        Collect collect = new Collect();
        collect.setUserId(userId);
        collect.setGoodsId(goodsId);
        boolean result = this.save(collect);
        if (!result) {
            throw new GlobalException("收藏失败");
        }
    }

    @Override
    public void unCollect(String goodsId, String userId) throws Exception {
        Map<String, String> map = new HashMap<>();
        map.put("goodsId", goodsId);
        map.put("userId", userId);
        Wrapper<Collect> wrapper = new UpdateWrapper<Collect>().allEq(map);
        boolean result = this.remove(wrapper);
        if (!result) {
            throw new GlobalException("删除失败");
        }
    }
}
