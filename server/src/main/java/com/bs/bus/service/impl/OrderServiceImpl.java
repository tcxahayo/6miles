package com.bs.bus.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bs.bus.entity.Goods;
import com.bs.bus.entity.Order;
import com.bs.bus.mapper.OrderMapper;
import com.bs.bus.service.IGoodsService;
import com.bs.bus.service.IOrderService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.bus.vo.OrderPayVo;
import com.bs.common.exception.GlobalException;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;


/**
 * <p>
 * 用户订单表 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-03-01
 */
@Service
public class OrderServiceImpl extends ServiceImpl<OrderMapper, Order> implements IOrderService {

    private IGoodsService goodsService;
    private OrderMapper orderMapper;

    @Autowired
    public void setGoodsService(IGoodsService goodsService) {
        this.goodsService = goodsService;
    }
    @Autowired
    public void setOrderMapper(OrderMapper orderMapper) {
        this.orderMapper = orderMapper;
    }

    @Override
    @Transactional
    public String createOrder(Order order) throws Exception {
        QueryWrapper<Goods> wrapper = new QueryWrapper<Goods>().eq("id", order.getGoodsId());
        Goods goods = goodsService.getOne(wrapper);
        if (ObjectUtils.isEmpty(goods)) {
            throw new GlobalException("订单创建失败，商品信息不存在");
        }
        if (goods.getUserId().equals(order.getUserId())) {
            throw new GlobalException("订单创建失败，无法购买自己出售的商品");
        }
        if (goods.getStatus() != Goods.STATUS_NORMAL) {
            throw new GlobalException("订单创建失败，非待出售商品");
        }
        goods.setStatus(Goods.STATUS_LOCK);
        boolean updateResult = goodsService.updateById(goods);
        if (!updateResult) {
            throw new GlobalException("订单创建失败，商品锁定失败");
        }

        long timeStamp = System.currentTimeMillis();
        int random = RandomUtils.nextInt(1000, 9999);
        String number = "" + timeStamp + random;
        order.setNumber(number);
        order.setStatus(Order.STATUS_WAIT);
        order.setPrice(goods.getPrice());
        boolean result = this.save(order);
        if (!result) {
            throw new GlobalException("订单创建失败，请稍后再试");
        }
        return number;
    }

    @Override
    @Transactional
    public void orderPay(OrderPayVo orderPayVo) throws Exception {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<Order>().eq("number", orderPayVo.getNumber()).eq("userId", orderPayVo.getUserId());
        Order order = this.getOne(queryWrapper);
        if (ObjectUtils.isEmpty(order)) {
            throw new GlobalException("订单信息不存在");
        }
        if (order.getStatus() != Order.STATUS_WAIT) {
            throw new GlobalException("订单异常");
        }
        order.setStatus(Order.STATUS_PAID);
        order.setPayType(orderPayVo.getType());
        order.setPayDate(LocalDateTime.now());
        boolean result = this.updateById(order);
        if (!result) {
            throw new GlobalException("订单支付失败，请稍后再试");
        }
        QueryWrapper<Goods> wrapper = new QueryWrapper<Goods>().eq("id", order.getGoodsId());
        Goods goods = goodsService.getOne(wrapper);
        goods.setStatus(Goods.STATUS_SELL);
        boolean updateResult = goodsService.updateById(goods);
        if (!updateResult) {
            throw new GlobalException("订单支付失败，请稍后再试");
        }
    }

    @Override
    @Transactional
    public void orderCancel(String number, String userId) throws Exception {
        QueryWrapper<Order> queryWrapper = new QueryWrapper<Order>().eq("number", number).eq("userId", userId);
        Order order = this.getOne(queryWrapper);
        if (ObjectUtils.isEmpty(order)) {
            throw new GlobalException("订单信息不存在");
        }
        if (order.getStatus() != Order.STATUS_WAIT) {
            throw new GlobalException("订单不允许取消");
        }
        order.setStatus(Order.STATUS_CANCEL);
        boolean result = this.updateById(order);
        if (!result) {
            throw new GlobalException("订单取消失败，请稍后再试");
        }
        QueryWrapper<Goods> wrapper = new QueryWrapper<Goods>().eq("id", order.getGoodsId());
        Goods goods = goodsService.getOne(wrapper);
        goods.setStatus(Goods.STATUS_NORMAL);
        boolean updateResult = goodsService.updateById(goods);
        if (!updateResult) {
            throw new GlobalException("订单支付失败，请稍后再试");
        }
    }

    @Override
    public List<Order> getOrderList(String userId, Integer status) throws Exception {
        Order order = new Order();
        order.setUserId(userId);
        order.setStatus(status);
        return orderMapper.selectOrderList(order);
    }

    @Override
    public Order getOrderDetail(String userId, String id) throws Exception {
        Order order = new Order();
        order.setUserId(userId);
        order.setId(id);
        List<Order> orders = orderMapper.selectOrderList(order);
        if (orders.size() == 0) {
            throw new GlobalException("订单不存在");
        }
        return orders.get(0);
    }
}
