package com.example.busstation.services;

import android.content.Context;
import android.location.Address;
import android.location.Geocoder;
import android.os.Bundle;
import android.os.Message;

import com.google.android.gms.maps.model.LatLng;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.function.DoubleBinaryOperator;
//import java.util.logging.Handler;
import android.os.Handler;
import retrofit2.Call;
import retrofit2.http.GET;

public class GoogleLocationService {

    public static void getAddress(String locationAddress, Context context, Handler handler){
        Thread thread = new Thread(){
            @Override
            public void run() {
                Geocoder geocoder = new Geocoder(context, Locale.getDefault());
                Double la = 0.0;
                Double log = 0.0;
                try{
                    List addressList =  geocoder.getFromLocationName(locationAddress, 1);
                    if(addressList != null && addressList.size() >=0){
                        Address address = (Address) addressList.get(0);
                        StringBuilder stringBuilder = new StringBuilder();
                        la = address.getLatitude();
                        log = address.getLongitude();

                    }
                } catch (IOException e) {
                    e.printStackTrace();
                }finally {
                    Message message = Message.obtain();
                    message.setTarget(handler);
                    if (la != null && log != null){
                        message.what = 1;
                        Bundle bundle = new Bundle();
                        bundle.putDouble("la",la);
                        bundle.putDouble("log",log);
                        message.setData(bundle);
                    }
                    message.sendToTarget();
                }
            }
        };
    }
}
