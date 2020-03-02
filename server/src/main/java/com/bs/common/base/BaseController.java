package com.bs.common.base;


import com.bs.common.constants.CommonConstant;
import com.bs.common.exception.GlobalException;
import com.bs.common.jwt.JwtUtil;
import org.apache.commons.lang3.StringUtils;

import javax.servlet.http.HttpServletRequest;

public class BaseController {

    /**
     * 获取token中包含的用户id
     * @param request 请求
     * @return 用户id
     */
    protected String getUserIdByToken(HttpServletRequest request) {
        String token = request.getHeader(CommonConstant.AUTHORIZATION_FLAG);
        String userId = JwtUtil.getUserId(token);
        if (StringUtils.isEmpty(userId)) {
            throw new GlobalException("token失效");
        }
        return userId;
    }

}
