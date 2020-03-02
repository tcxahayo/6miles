package com.bs.bus.mapper;

import com.bs.bus.entity.Order;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 * 用户订单表 Mapper 接口
 * </p>
 *
 * @author tcx
 * @since 2020-03-01
 */
public interface OrderMapper extends BaseMapper<Order> {

    /**
     * 查询订单列表
     * @param o 查询条件
     * @return 订单列表
     * @throws Exception 异常信息
     */
    List<Order> selectOrderList(Order o)  throws Exception;
}
