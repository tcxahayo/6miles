package com.bs.system.controller;


import com.bs.common.base.BaseController;
import com.bs.common.exception.GlobalException;
import com.bs.common.utils.R;
import com.bs.system.entity.SysUser;
import com.bs.system.service.ISysUserService;
import com.bs.vo.RegisterVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

/**
 * <p>
 * 用户表 前端控制器
 * </p>
 *
 * @author tcx
 * @since 2020-02-03
 */
@RestController
@RequestMapping("/user")
public class SysUserController extends BaseController {

    private ISysUserService sysUserService;

    @Autowired
    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @GetMapping
    public R<List<SysUser>> list() {
        List<SysUser> users = sysUserService.list();
        return new R<>(users, "查询成功");
    }

    @PostMapping("/register")
    public R<Boolean> register(@Valid RegisterVo registerVo) {
        Boolean result = sysUserService.register(registerVo);
        if (!result) {
            throw new GlobalException("注册失败");
        }
        return new R<>(true, "注册成功");
    }
}
