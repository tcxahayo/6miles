package com.bs.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.Wrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.JwtUtil;
import com.bs.common.utils.MD5Util;
import com.bs.system.entity.SysCode;
import com.bs.system.service.ISysCodeService;
import com.bs.system.vo.RegisterVo;
import com.bs.system.entity.SysUser;
import com.bs.system.mapper.SysUserMapper;
import com.bs.system.service.ISysUserService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.bs.system.vo.UserEditVo;
import com.bs.system.vo.UserVo;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.RandomStringUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
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
    public String login(String phone, String password, Integer type) throws Exception {
        Wrapper<SysUser> wrapper = new QueryWrapper<SysUser>().eq("phone", phone);
        SysUser user = this.getOne(wrapper);
        if (user == null) {
            throw new GlobalException("用户名或密码不正确");
        }
        String md5Password = MD5Util.encryption(password + user.getSalt());
        if (!StringUtils.equals(md5Password, user.getPassword())) {
            throw new GlobalException("用户名或密码不正确");
        }
        if (SysUser.USER_ADMIN.equals(type)) {
            if (user.getType().equals(SysUser.USER_ADMIN)) {
                return JwtUtil.adminSign(phone, user.getId());
            } else {
                throw new GlobalException("用户名或密码不正确");
            }
        }
        return JwtUtil.sign(phone, user.getId());
    }

    @Override
    public void register(RegisterVo registerVo) throws Exception {
        String phone = registerVo.getPhone();

        SysUser sysUser = this.getUserByPhone(phone);
        if (ObjectUtils.isNotEmpty(sysUser)) {
            throw new GlobalException("该手机号已经注册");
        }
        Wrapper<SysCode> codeQueryWrapper = new QueryWrapper<SysCode>().eq("phone", phone);
        SysCode sysCode = sysCodeService.getOne(codeQueryWrapper);
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
        String salt = RandomStringUtils.randomGraph(30);
        String md5Password = MD5Util.encryption(registerVo.getPassword() + salt);
        user.setSalt(salt);
        user.setPhone(registerVo.getPhone());
        user.setNickname(registerVo.getNickname());
        user.setPassword(md5Password);
        user.setAvatar(SysUser.defaultAvatar);

        boolean result = this.save(user);
        if (!result) {
            throw new GlobalException("注册失败");
        }
    }

    @Override
    public SysUser getUserByPhone(String phone) throws Exception {
        Wrapper<SysUser> userQueryWrapper = new QueryWrapper<SysUser>().eq("phone", phone);
        return this.getOne(userQueryWrapper);
    }

    @Override
    public void updatePassword(String userId, String oldPassword, String newPassword) throws Exception {
        SysUser sysUser = this.getById(userId);
        String oldMd5Password = MD5Util.encryption(oldPassword + sysUser.getSalt());
        // 判断原密码是否正确
        if (!oldMd5Password.equals(sysUser.getPassword())) {
            throw new GlobalException("原密码不正确");
        }
        // 判断新密码是否和原密码一致
        String nowMd5Password = MD5Util.encryption(newPassword + sysUser.getSalt());
        if (nowMd5Password.equals(oldMd5Password)) {
            throw new GlobalException("新密码不可和原密码相同");
        }
        // 设置新盐和新密码
        String salt = RandomStringUtils.randomGraph(30);
        String newMd5Password = MD5Util.encryption(newPassword + salt);
        sysUser.setPassword(newMd5Password);
        sysUser.setSalt(salt);
        this.updateById(sysUser);
    }

    @Override
    public void updateInfo(String userId, UserEditVo userEditVo) throws Exception {
        SysUser sysUser = this.getById(userId);
        if (ObjectUtils.isEmpty(sysUser)) {
            throw new GlobalException("用户信息不存在");
        }
        sysUser.setAvatar(userEditVo.getAvatar());
        sysUser.setEmail(userEditVo.getEmail());
        sysUser.setNickname(userEditVo.getNickname());
        this.updateById(sysUser);
    }

}
