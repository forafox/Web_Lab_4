package com.forafox.web_lab_4.exception;

public class DotNotFoundException extends   RuntimeException {
    public DotNotFoundException(){
        super("Could not found the dot");
    }
}
