package com.bs.common.base;

import com.baomidou.mybatisplus.annotation.FieldFill;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiParam;
import org.springframework.format.annotation.DateTimeFormat;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.time.LocalDateTime;


@Data
@EqualsAndHashCode(callSuper = false)
@Accessors(chain = true)
public class BaseEntity implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId
    @ApiModelProperty(value = "主键", hidden = true)
    @ApiParam(value = "主键", hidden = true)
    private String id;

    /**
     * 创建时间
     */
    @ApiModelProperty(value = "创建时间", hidden = true)
    @ApiParam(value = "创建时间", hidden = true)
    @TableField(value = "createDate", fill = FieldFill.INSERT)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createDate;

    /**
     * 更新时间
     */
    @ApiModelProperty(value = "修改时间", hidden = true)
    @ApiParam(value = "修改时间", hidden = true)
    @TableField(value = "updateDate", fill = FieldFill.INSERT_UPDATE)
    @DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updateDate;

    /**
     * 备用1
     */
    @ApiModelProperty(value = "备用1", hidden = true)
    @ApiParam(value = "备用1", hidden = true)
    private String reserve1;

    /**
     * 备用2
     */
    @ApiModelProperty(value = "备用2", hidden = true)
    @ApiParam(value = "备用2", hidden = true)
    private String reserve2;

}
