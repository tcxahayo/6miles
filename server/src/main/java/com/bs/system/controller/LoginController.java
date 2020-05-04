package com.bs.system.controller;

import com.bs.common.base.BaseController;
import com.bs.common.utils.R;
import com.bs.system.service.ISysUserService;
import com.bs.system.vo.LoginVo;
import com.bs.system.vo.RegisterVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiImplicitParams;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@Validated
@RequestMapping("/login")
@Api(tags = "登陆模块", value = "登陆")
public class LoginController  extends BaseController {

    private ISysUserService sysUserService;

    @Autowired
    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @PostMapping()
    @ApiOperation(value = "用户登陆", notes = "用于用户登陆")
    public R<String> login(@RequestBody @Valid LoginVo loginVo) throws Exception {
        String token = sysUserService.login(loginVo.getPhone(), loginVo.getPassword(), loginVo.getType());
        return R.success(token, "登陆成功");
    }

}
