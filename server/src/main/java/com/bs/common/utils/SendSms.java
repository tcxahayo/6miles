package com.bs.common.utils;

import com.aliyuncs.profile.DefaultProfile;
import com.aliyuncs.CommonRequest;
import com.aliyuncs.CommonResponse;
import com.aliyuncs.DefaultAcsClient;
import com.aliyuncs.IAcsClient;
import com.aliyuncs.exceptions.ClientException;
import com.aliyuncs.exceptions.ServerException;
import com.aliyuncs.http.MethodType;
import com.bs.common.exception.GlobalException;

/**
 * 发送短信
 */
public class SendSms {

    public static void send(String phoneNumbers, String code) throws GlobalException {
        DefaultProfile profile = DefaultProfile.getProfile("cn-hangzhou", "LTAI4FusXAFDEhyiZ5Pq69aS", "N1Z1PX4OQFoLUD9JehkFWiBivkeVFy");
        IAcsClient client = new DefaultAcsClient(profile);

        CommonRequest request = new CommonRequest();
        request.setSysMethod(MethodType.POST);
        request.setSysDomain("dysmsapi.aliyuncs.com");
        request.setSysVersion("2017-05-25");
        request.setSysAction("SendSms");
        request.putQueryParameter("RegionId", "cn-hangzhou");
        request.putQueryParameter("PhoneNumbers", phoneNumbers);
        request.putQueryParameter("SignName", "6miles二手交易平台");
        request.putQueryParameter("TemplateCode", "SMS_183195332");
        request.putQueryParameter("TemplateParam", "{code: "+ code +"}");
        try {
            CommonResponse response = client.getCommonResponse(request);
            System.out.println(response.getData());
        } catch (ClientException e) {
            e.printStackTrace();
            throw new GlobalException("验证码发送失败");
        }
    }
}
