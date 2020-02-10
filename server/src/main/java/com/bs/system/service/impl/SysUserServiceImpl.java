package com.bs.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.JwtUtil;
import com.bs.system.entity.SysCode;
import com.bs.system.service.ISysCodeService;
import com.bs.vo.RegisterVo;
import com.bs.system.entity.SysUser;
import com.bs.system.mapper.SysUserMapper;
import com.bs.system.service.ISysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * <p>
 * 用户表 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-02-03
 */
@Service
public class SysUserServiceImpl extends ServiceImpl<SysUserMapper, SysUser> implements ISysUserService {

    private ISysCodeService sysCodeService;

    @Autowired
    public void setSysCodeService(ISysCodeService sysCodeService) {
        this.sysCodeService = sysCodeService;
    }

    @Override
    public String login(String phone, String password) throws GlobalException {
        Wrapper<SysUser> wrapper = new QueryWrapper<SysUser>().eq("phone", phone);
        SysUser user = this.getOne(wrapper);
        if (user == null) {
            throw new GlobalException("用户名或密码不正确");
        }
        if (!password.equals(user.getPassword())) {
            throw new GlobalException("用户名或密码不正确");
        }
        return JwtUtil.sign(phone, user.getId());
    }

    @Override
    public Boolean register(RegisterVo registerVo) throws GlobalException {
        String phone = registerVo.getPhone();
        Wrapper<SysCode> wrapper = new QueryWrapper<SysCode>().eq("phone", phone);
        SysCode sysCode = sysCodeService.getOne(wrapper);
        // 判断验证码是否存在
        if (ObjectUtils.isEmpty(sysCode)) {
            throw new GlobalException("验证码不正确");
        }
        // 判断验证码发送时间是否超过半个小时
        Duration duration = Duration.between(sysCode.getUpdateDate(), LocalDateTime.now());
        if (duration.toMillis() > 60000 * 30) {
            sysCodeService.removeById(sysCode.getId());
            throw new GlobalException("验证码不正确");
        }
        // 判断验证码是否正确
        if (!sysCode.getCode().equals(registerVo.getCode())) {
            throw new GlobalException("验证码不正确");
        }
        sysCodeService.removeById(sysCode.getId());
        SysUser user = new SysUser();
        user.setPhone(registerVo.getPhone());
        user.setNickname(registerVo.getNickName());
        user.setPassword(registerVo.getPassword());
        return this.save(user);
    }
}
