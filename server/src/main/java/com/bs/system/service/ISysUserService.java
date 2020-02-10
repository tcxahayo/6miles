package com.bs.system.service;

import com.bs.common.exception.GlobalException;
import com.bs.vo.RegisterVo;
import com.bs.system.entity.SysUser;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 用户表 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-02-03
 */
public interface ISysUserService extends IService<SysUser> {

    /**
     * 登陆
     * @param phone 手机号
     * @param password 密码
     * @return token
     * @throws GlobalException 自定义异常
     */
    String login(String phone, String password) throws GlobalException;

    /**
     * 注册
     * @param registerVo 注册数据
     * @return 注册结果
     * @throws GlobalException 自定义异常
     */
    Boolean register(RegisterVo registerVo) throws GlobalException;
}
