package com.bs.bus.service;

import com.bs.bus.entity.Order;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.bus.vo.OrderPayVo;

import java.util.List;

/**
 * <p>
 * 用户订单表 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-03-01
 */
public interface IOrderService extends IService<Order> {
    /**
     * 创建订单
     * @param order 订单信息
     * @return 订单编号
     * @throws Exception 异常信息
     */
    String createOrder(Order order) throws Exception;

    /**
     * 支付订单
     * @param orderPayVo 支付信息
     * @throws Exception 异常信息
     */
    void orderPay(OrderPayVo orderPayVo) throws Exception;

    /**
     * 查询订单列表
     * @param userId 用户id
     * @param status 订单状态
     * @return 订单列表
     * @throws Exception 异常信息
     */
    List<Order> getOrderList(String userId, Integer status) throws Exception;

    /**
     * 查询订单详情
     * @param id 订单id
     * @return 订单详情
     * @throws Exception 异常信息
     */
    Order getOrderDetail(String userId, String id) throws Exception;
}
