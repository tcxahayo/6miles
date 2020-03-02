package com.bs.common.utils;

import com.bs.common.exception.GlobalException;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPReply;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.util.UUID;

@Component
public class FtpUtil {

    public static String host = "182.92.210.231";
    public static int prop = 21;
    public static String username = "admin";
    public static String password = "cong19970926";
    public static String dir = "/root/app/6miles/images/";
    public static String url = "http://182.92.210.231:81/";


    public static String uploadFile(MultipartFile file) throws Exception {
        //获取图片或文件的后缀名
        String suffix = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));
        //拼接图片或文件名称，32位随机uuid+后缀名
        String fileName = UUID.randomUUID().toString().replace("-", "").toLowerCase() + suffix;
        InputStream inputStream = file.getInputStream();
        FTPClient ftp = new FTPClient();
        ftp.setControlEncoding("GBK");
        try {
            int reply;
            ftp.connect(FtpUtil.host, FtpUtil.prop);// 连接FTP服务器
            ftp.login(FtpUtil.username, FtpUtil.password);// 登录
            reply = ftp.getReplyCode();
            if (!FTPReply.isPositiveCompletion(reply)) {
                ftp.disconnect();
                throw new GlobalException("上传失败，无法连接ftp服务器");
            }
            ftp.setFileType(FTPClient.BINARY_FILE_TYPE);
            ftp.makeDirectory(FtpUtil.dir);
            ftp.changeWorkingDirectory(FtpUtil.dir);
            ftp.enterLocalPassiveMode(); // 关键代码，设置为被动模式
            boolean result = ftp.storeFile(fileName, inputStream);
            if (!result) {
                throw new GlobalException("文件上传失败");
            }
            inputStream.close();
            ftp.logout();
        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalException("上传失败，" + e.getMessage());
        } finally {
            if (ftp.isConnected()) {
                try {
                    ftp.disconnect();
                } catch (IOException ioe) {
                }
            }
        }
        return FtpUtil.url + fileName;
    }
}
