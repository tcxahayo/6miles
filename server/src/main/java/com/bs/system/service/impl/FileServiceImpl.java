package com.bs.system.service.impl;

import com.bs.common.utils.FtpUtil;
import com.bs.system.service.IFileService;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class FileServiceImpl implements IFileService {
    @Override
    public String fileUpload(MultipartFile file) throws Exception{
        return FtpUtil.uploadFile(file);
    }
}
