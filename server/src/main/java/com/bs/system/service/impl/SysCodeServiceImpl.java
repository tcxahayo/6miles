package com.bs.system.service.impl;

import com.bs.system.entity.SysCode;
import com.bs.system.mapper.SysCodeMapper;
import com.bs.system.service.ISysCodeService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

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

}
