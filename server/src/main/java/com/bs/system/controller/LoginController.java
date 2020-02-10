package com.bs.system.controller;

import com.bs.common.base.BaseController;
import com.bs.common.utils.R;
import com.bs.system.service.ISysUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController  extends BaseController {

    private ISysUserService sysUserService;

    @Autowired
    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @PostMapping()
    public R<String> login(@RequestParam("phone") String phone, @RequestParam("password") String password) {
        String token = sysUserService.login(phone, password);
        return new R<>(token, "登陆成功");
    }

}
