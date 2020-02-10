package com.bs.bus.service.impl;

import com.bs.bus.entity.Goods;
import com.bs.bus.mapper.GoodsMapper;
import com.bs.bus.service.IGoodsService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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

}
