package com.squoshi.packdev.arcafirma.utils;

import java.net.URL;
import java.net.URLConnection;

public class OnlineUtils {
    public static boolean checkOnlineStatus() {
        try {
            URL url = new URL("http://www.google.com");
            URLConnection connection = url.openConnection();
            connection.connect();
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}