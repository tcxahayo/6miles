package com.bs.system.controller;


import com.bs.common.base.BaseController;
import com.bs.common.utils.R;
import com.bs.common.utils.ValidatorUtil;
import com.bs.system.service.ISysCodeService;
import com.bs.system.vo.CodeVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import javax.validation.constraints.Pattern;

/**
 * <p>
 * 用户短信验证码 前端控制器
 * </p>
 *
 * @author tcx
 * @since 2020-02-06
 */
@RestController
@Validated
@RequestMapping("/code")
@Api(tags = "短信验证码", value = "登陆")
public class SysCodeController extends BaseController {

    private ISysCodeService codeService;

    @Autowired
    public void setCodeService(ISysCodeService codeService) {
        this.codeService = codeService;
    }

    @GetMapping
    @ApiOperation(value = "获取短信验证码", notes = "用于用户注册")
    @ApiImplicitParam(name = "phone", value = "手机号")
    public R<Boolean> code(@RequestParam("phone") @Pattern(regexp = ValidatorUtil.REGEX_MOBILE, message = "手机号格式不正确") String phone) {
        codeService.sendCode(phone);
        return R.success(true, "发送成功");
    }
}
