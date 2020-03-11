package com.bs.system.service;

import com.bs.common.exception.GlobalException;
import com.bs.system.vo.RegisterVo;
import com.bs.system.entity.SysUser;
import com.baomidou.mybatisplus.extension.service.IService;
import com.bs.system.vo.UserEditVo;
import com.bs.system.vo.UserVo;

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
     * @throws GlobalException 异常信息
     */
    String login(String phone, String password) throws Exception;

    /**
     * 注册
     * @param registerVo 注册数据
     * @throws GlobalException 异常信息
     */
    void register(RegisterVo registerVo) throws Exception;

    /**
     * 根据手机号查询用户
     * @param phone 手机号
     * @return 用户
     * @throws Exception 异常信息
     */
    SysUser getUserByPhone(String phone) throws Exception;

    /**
     * 修改密码
     * @param userId 用户ID
     * @param oldPassword 旧密码
     * @param newPassword 新密码
     * @throws Exception 异常信息
     */
    void updatePassword(String userId, String oldPassword, String newPassword) throws Exception;

    /**
     * 修改个人资料
     * @param userId 用户id
     * @param userEditVo 资料信息
     * @throws Exception 异常信息
     */
    void updateInfo(String userId, UserEditVo userEditVo) throws Exception;
}
