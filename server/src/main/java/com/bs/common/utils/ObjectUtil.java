package com.bs.common.utils;

import com.bs.common.exception.GlobalException;
import org.apache.commons.lang3.ObjectUtils;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.BeanUtils;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.Arrays;

/**
 * 对象工具类
 */
public class ObjectUtil {

    public static<S, T> T copyProperties(S source, Class<T> tClass) throws Exception {
        if(ObjectUtils.isEmpty(source)) {
            throw new GlobalException("数据源对象为空");
        }

        // 获取源对象的类的详情信息
        Class<?> sClass = source.getClass();
        // 获取源对象的所有属性
        Field[] tFields = tClass.getDeclaredFields();

        T target;
        try {
            target = tClass.newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            throw new GlobalException("目标对象创建失败");
        }
        for (Field tField : tFields) {
            String fieldName = tField.getName();
            try {
                Field sField = sClass.getDeclaredField(fieldName);
                boolean typeEqual = sField.getType().equals(tField.getType());
                if (!typeEqual) {
                    throw new ClassCastException(fieldName + "属性源对象和目标对象类型不一致");
                }

                String sMethodName = "get" + StringUtils.capitalize(sField.getName());
                Object sFieldValue = null;
                try {
                    // 获得源对象属性的get方法
                    Method sMethod = sClass.getMethod(sMethodName);
                    // 调用get方法
                    sFieldValue = sMethod.invoke(source);
                } catch (NoSuchMethodException e) {
                    throw e;
                }
                try {
                    // 获取目标对象属性的set方法
                    String tMethodName = "set" + StringUtils.capitalize(tField.getName());
                    Method tMethod = tClass.getMethod(tMethodName, tField.getType());
                    // 调用get方法
                    tMethod.invoke(target, sFieldValue);
                } catch (NoSuchMethodException e) {
                    throw e;
                }
            } catch (NoSuchFieldException e) {

            }
        }
        return target;
    }
}
