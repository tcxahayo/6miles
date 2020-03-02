package com.bs.system.service;

import com.bs.common.exception.GlobalException;
import com.bs.system.entity.SysCode;
import com.baomidou.mybatisplus.extension.service.IService;

/**
 * <p>
 * 用户短信验证码 服务类
 * </p>
 *
 * @author tcx
 * @since 2020-02-06
 */

public interface ISysCodeService extends IService<SysCode> {

    /**
     * 发送短信验证码
     * @param phone 手机号
     * @throws GlobalException 异常
     */
    void sendCode(String phone) throws GlobalException;
}
