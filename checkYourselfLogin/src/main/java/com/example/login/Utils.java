package com.example.login;

public class Utils {
    public static String removeHtmlCode(String text){
        text = text.replaceAll("<.*?>", "");
        text = text.replaceAll("&quot;", "");
        return text.replaceAll("\n", "");
    }
}
