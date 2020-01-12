package com.bs.server.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController("/")
public class index {

    @GetMapping("/")
    public Map<String, String> index() {
        Map<String, String> result = new HashMap<>();
        result.put("key", "value");
        return  result;
    }
}
