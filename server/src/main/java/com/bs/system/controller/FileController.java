package com.bs.system.controller;

import com.bs.common.utils.R;
import com.bs.system.service.IFileService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/file")
@Api(tags = "文件上传", value = "商品")
public class FileController {

    private IFileService fileService;

    @Autowired
    public void setFileService(IFileService fileService) {
        this.fileService = fileService;
    }

    @PostMapping("/upload")
    @ApiOperation(value = "上传文件", notes = "用于用户上传图片")
    @ApiImplicitParam(name = "file", value = "文件")
    public R<String> updateAvatar(MultipartFile file) throws Exception{
        String filePath = fileService.fileUpload(file);
        return R.success(filePath, "上传成功");
    }

}
