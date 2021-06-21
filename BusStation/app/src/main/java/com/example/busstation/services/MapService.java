package com.example.busstation.services;

import com.example.busstation.models.myLatLng;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Query;

public interface MapService {
    @GET("map/geocoding")
    Call<myLatLng> geocoding(@Query("text") String text);

}