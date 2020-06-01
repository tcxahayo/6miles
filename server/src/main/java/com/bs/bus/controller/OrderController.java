package com.bs.bus.controller;


import com.bs.bus.entity.Goods;
import com.bs.bus.entity.Order;
import com.bs.bus.service.IOrderService;
import com.bs.bus.vo.OrderPayVo;
import com.bs.common.jwt.Authentication;
import com.bs.common.utils.R;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.bs.common.base.BaseController;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import java.util.List;

/**
 * <p>
 * 用户订单表 前端控制器，就是想颜色变一哈而已
 * </p>
 *
 * @author tcx
 * @since 2020-03-01
 */
@RestController
@RequestMapping("/order")
@Api(tags = "订单模块")
@Validated
public class OrderController extends BaseController {
    private IOrderService orderService;

    @Autowired
    public void setOrderService(IOrderService orderService) {
        this.orderService = orderService;
    }

    @GetMapping
    @Authentication
    @ApiOperation(value = "订单列表", notes = "用户订单列表")
    @ApiImplicitParam(name = "status", value = "订单状态：1:待支付，2:已支付", paramType = "query")
    public R<List<Order>> list(@Max(value = 2, message = "类型不正确") @Min(value = 1, message = "类型不正确")  Integer status, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        List<Order> result = orderService.getOrderList(userId, status);
        return R.selectSuccess(result);
    }

    @GetMapping("/{id}")
    @Authentication
    @ApiOperation(value = "订单详情", notes = "用户订单详情")
    @ApiImplicitParam(name = "id", value = "订单id", paramType = "path")
    public R<Order> list(@PathVariable("id") String id , HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        Order result = orderService.getOrderDetail(userId, id);
        return R.selectSuccess(result);
    }


    @PostMapping
    @Authentication
    @ApiOperation(value = "创建订单", notes = "创建购买订单")
    public R<String> createOrder(@Valid @RequestBody Order order, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        order.setUserId(userId);
        String number = orderService.createOrder(order);
        return R.postSuccess(number, "创建成功");
    }

    @PostMapping("/pay")
    @Authentication
    @ApiOperation(value = "支付订单", notes = "支付购买订单")
    public R<Boolean> payOrder(@Valid @RequestBody OrderPayVo orderPayVo, HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        orderPayVo.setUserId(userId);
        orderService.orderPay(orderPayVo);
        return R.success("支付成功");
    }

    @Authentication
    @GetMapping("/cancel/{number}")
    @ApiOperation(value = "支付订单", notes = "支付购买订单")
    @ApiImplicitParam(name = "number", value = "订单编号", paramType = "path")
    public R<Boolean> payOrder(@PathVariable("number") String number , HttpServletRequest request) throws Exception {
        String userId = this.getUserIdByToken(request);
        orderService.orderCancel(number, userId);
        return R.success("订单取消成功");
    }
}
