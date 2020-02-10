package com.bs.system.controller;


import com.bs.common.base.BaseController;
import com.bs.common.utils.R;
import com.bs.system.service.ISysCodeService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * <p>
 * 用户短信验证码 前端控制器
 * </p>
 *
 * @author tcx
 * @since 2020-02-06
 */
@RestController
@RequestMapping("/code")
@Api("短信验证码")
public class SysCodeController extends BaseController {

    private ISysCodeService codeService;

    @Autowired
    public void setCodeService(ISysCodeService codeService) {
        this.codeService = codeService;
    }

    @PostMapping
    @ApiOperation(value = "获取短信验证码")
    public R<Boolean> code(@RequestParam("phone") String phone) {
        codeService.sendCode(phone);
        return new R<>(true, "发送成功");
    }
}
