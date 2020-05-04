package com.bs.system.controller;


import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.bs.common.base.BaseController;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.Authentication;
import com.bs.common.utils.ObjectUtil;
import com.bs.common.utils.R;
import com.bs.common.utils.ValidatorUtil;
import com.bs.system.entity.SysUser;
import com.bs.system.service.ISysUserService;
import com.bs.system.vo.RegisterVo;
import com.bs.system.vo.UpdatePasswordVo;
import com.bs.system.vo.UserEditVo;
import com.bs.system.vo.UserVo;
import io.swagger.annotations.*;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;
import javax.validation.constraints.Pattern;
import javax.websocket.server.PathParam;
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
    @Authentication(isAdmin = true)
    @ApiOperation(value = "查询所有用户", notes = "查询所有用户")
    @ApiImplicitParams({
            @ApiImplicitParam(name = "page", value = "页码", required = true, paramType = "query", dataType="Integer"),
            @ApiImplicitParam(name = "size", value = "条数", required = true, paramType = "query", dataType="Integer"),
            @ApiImplicitParam(name = "phone", value = "账户", paramType = "query"),
            @ApiImplicitParam(name = "email", value = "邮箱", paramType = "query"),
            @ApiImplicitParam(name = "nickname", value = "昵称", paramType = "query"),
    })
    public R<com.bs.common.utils.Page<List<SysUser>>> list(
            String phone,
            String email,
            String nickname,
            @RequestParam("page") Integer page,
            @RequestParam("size") Integer size) throws Exception {

        Page<SysUser> p = new Page<>(page, size);
        QueryWrapper<SysUser> wrapper = new QueryWrapper<>();
        if (StringUtils.isNoneBlank(phone)) {
            wrapper.eq("phone", phone);
        }
        if (StringUtils.isNoneBlank(email)) {
            wrapper.eq("email", email);
        }
        if (StringUtils.isNoneBlank(nickname)) {
            wrapper.like("nickname", nickname);
        }

        Page<SysUser> pageResult = sysUserService.page(p, wrapper);

        com.bs.common.utils.Page<List<SysUser>> result = new com.bs.common.utils.Page<List<SysUser>>();
        result.setTotalSize((int)pageResult.getTotal());
        result.setTotalPage((int)pageResult.getPages());
        result.setPage(page);
        result.setSize(size);
        result.setList(pageResult.getRecords());
        return R.selectSuccess(result);
    }

    @DeleteMapping("/{id}")
    @Authentication(isAdmin = true)
    @ApiResponse(code = 200, message = "是否删除成功")
    @ApiOperation(value = "管理员删除用户", notes = "管理员在后台删除用户")
    public R<Boolean> delUser(@PathVariable("id") String id) {
        sysUserService.removeById(id);
        return R.deleteSuccess();
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


    @Authentication
    @PutMapping("/password/change")
    @ApiResponse(code = 200, message = "是否修改成功")
    @ApiOperation(value = "修改密码", notes = "用户在个人中心的修改密码")
    public R<Boolean> updatePassword(HttpServletRequest request, @RequestBody @Valid UpdatePasswordVo passwordVo) throws Exception {
        String id = this.getUserIdByToken(request);
        sysUserService.updatePassword(id, passwordVo.getOldPassword(), passwordVo.getNewPassword());
        return R.putSuccess(true);
    }

    @Authentication
    @PutMapping("/info")
    @ApiResponse(code = 200, message = "是否修改成功")
    @ApiOperation(value = "修改用户资料", notes = "用户在个人中心的修改资料")
    public R<Boolean> infoEdit(HttpServletRequest request, @RequestBody @Valid UserEditVo userEditVo) throws Exception {
        String id = this.getUserIdByToken(request);
        sysUserService.updateInfo(id, userEditVo);
        return R.putSuccess(true);
    }

    @PutMapping("/info/admin")
    @Authentication(isAdmin = true)
    @ApiResponse(code = 200, message = "是否修改成功")
    @ApiOperation(value = "管理员修改用户资料", notes = "管理员在后台修改用户资料")
    public R<Boolean> infoEditAdmin(@RequestBody @Valid UserEditVo userEditVo) throws Exception {
        sysUserService.updateInfo(userEditVo.getId(), userEditVo);
        return R.putSuccess(true);
    }
}
