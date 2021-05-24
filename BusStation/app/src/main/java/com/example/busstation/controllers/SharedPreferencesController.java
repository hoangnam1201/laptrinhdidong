package com.example.busstation.controllers;

import android.content.Context;
import android.content.SharedPreferences;

public class SharedPreferencesController {
    private static String PREF_NAME = "myPref";

    public SharedPreferencesController() {
    }

    private static SharedPreferences getSharedPreferences(Context context) {
        return context.getSharedPreferences(PREF_NAME, Context.MODE_PRIVATE);
    }

    public static String getStringValueByKey(Context context, String key){
        return getSharedPreferences(context).getString(key, null);
    }

    public static void setStringValue(Context context, String key, String value){
        SharedPreferences.Editor editor = getSharedPreferences(context).edit();
        editor.putString(key,value);
        editor.commit();
    }
    public static Boolean getBooleanValueByKey(Context context, String key){
        return getSharedPreferences(context).getBoolean(key, false);
    }

    public static void setBooleanValue(Context context, String key, Boolean value){
        SharedPreferences.Editor editor = getSharedPreferences(context).edit();
        editor.putBoolean(key,value);
        editor.commit();
    }
    public static void clear(Context context){
        SharedPreferences.Editor editor = getSharedPreferences(context).edit();
        editor.clear();
        editor.commit();
    }
    public static void removeKey(Context context, String key){
        SharedPreferences.Editor editor = getSharedPreferences(context).edit();
        editor.remove(key);
        editor.commit();
    }

}
