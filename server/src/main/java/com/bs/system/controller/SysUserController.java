package com.bs.system.controller;


import com.bs.common.base.BaseController;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.Authentication;
import com.bs.common.utils.ObjectUtil;
import com.bs.common.utils.R;
import com.bs.common.utils.ValidatorUtil;
import com.bs.system.entity.SysUser;
import com.bs.system.service.ISysUserService;
import com.bs.system.vo.RegisterVo;
import com.bs.system.vo.UserVo;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
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
@Validated
@RequestMapping("/user")
@Api(tags = "用户模块", value = "商品")
public class SysUserController extends BaseController {

    private ISysUserService sysUserService;

    @Autowired
    public void setSysUserService(ISysUserService sysUserService) {
        this.sysUserService = sysUserService;
    }

    @GetMapping
    @Authentication
    @ApiOperation(value = "查询所有用户", notes = "查询所有用户")
    public R<List<SysUser>> list() throws Exception {
        List<SysUser> users = sysUserService.list();
        return R.selectSuccess(users);
    }

    @Authentication
    @GetMapping("/info")
    @ApiOperation(value = "查询用户信息", notes = "根据token查询用户信息")
    public R<UserVo> getUserInfo(HttpServletRequest request) throws Exception {
        String id = this.getUserIdByToken(request);
        SysUser user = sysUserService.getById(id);
        if (ObjectUtils.isEmpty(user)) {
            throw new GlobalException("用户不存在");
        }
        UserVo userVo = new UserVo();
        BeanUtils.copyProperties(user, userVo);
        return R.selectSuccess(userVo);
    }

    @GetMapping("/userHas")
    @ApiOperation(value = "查询手机号是否已被注册", notes = "用于用户注册")
    @ApiImplicitParam(name = "phone", value = "手机号")
    public R<Boolean> userHas(@RequestParam("phone") @Pattern(regexp = ValidatorUtil.REGEX_MOBILE, message = "手机号格式不正确") String phone) throws Exception {
        SysUser user = sysUserService.getUserByPhone(phone);
        if (ObjectUtils.isNotEmpty(user)) {
            return R.success(true, "该手机号已被注册");
        }
        return R.success(false, "该手机号可用");
    }


    @PostMapping("/register")
    @ApiOperation(value = "用户注册", notes = "用于用户注册")
    @ApiResponse(code = 200, message = "是否注册成功")
    public R<Boolean> register(@RequestBody @Valid RegisterVo registerVo) throws Exception {
        sysUserService.register(registerVo);
        return R.success(true, "注册成功");
    }
}
