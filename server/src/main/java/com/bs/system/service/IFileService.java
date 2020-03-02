package com.bs.system.service;

import org.springframework.web.multipart.MultipartFile;

public interface IFileService {

    /**
     * 文件上传
     * @param file 文件
     * @return 路径
     */
    String fileUpload(MultipartFile file) throws Exception;
}
