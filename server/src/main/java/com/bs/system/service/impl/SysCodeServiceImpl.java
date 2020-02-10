package com.bs.system.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.bs.common.exception.GlobalException;
import com.bs.common.utils.SendSms;
import com.bs.system.entity.SysCode;
import com.bs.system.entity.SysUser;
import com.bs.system.mapper.SysCodeMapper;
import com.bs.system.service.ISysCodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

/**
 * <p>
 * 用户短信验证码 服务实现类
 * </p>
 *
 * @author tcx
 * @since 2020-02-06
 */
@Service
public class SysCodeServiceImpl extends ServiceImpl<SysCodeMapper, SysCode> implements ISysCodeService {

    @Override
    public void sendCode(String phone) throws GlobalException {
        QueryWrapper<SysCode> queryWrapper = new QueryWrapper<SysCode>().eq("phone", phone);
        SysCode sysCode = this.getOne(queryWrapper);

        // 当该手机号码已经发送过验证码时，计算时间差，小于一分钟，抛出异常
        if (ObjectUtils.isNotEmpty(sysCode)) {
            Duration duration = Duration.between(sysCode.getUpdateDate(), LocalDateTime.now());
            long millis = duration.toMillis();
            if (millis < 60000) {
                throw new GlobalException("短信发送太频繁，请稍后再试。");
            }
        }

        // 生成短信验证码
        String code = String.valueOf(Math.round((Math.random() * 9 + 1) * 1000));
        // 发送短信验证码
//        SendSms.send(phone, code);
        // 保存验证码
        if (ObjectUtils.isEmpty(sysCode)) {
            sysCode = new SysCode();
        }
        sysCode.setCode(code);
        sysCode.setPhone(phone);
        this.saveOrUpdate(sysCode);
    }
}
