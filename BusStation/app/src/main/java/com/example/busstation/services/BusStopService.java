package com.example.busstation.services;

import com.example.busstation.models.BusStop;
import com.example.busstation.models.BusstopDetail;
import com.example.busstation.models.Route;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface BusStopService {

    @GET("busstops/get-all")
    Call<List<BusStop>> getAll(@Header("Authorization") String authorization);

    @GET("busstops/get-all-name")
    Call<List<String>> getAllName(@Header("Authorization") String authorization);

    @GET("busstops/search")
    Call<BusStop> searchBusStop(@Query("value") String value, @Header("Authorization") String authorization);

    @GET("busstops/get-by-id/{id}")
    Call<BusstopDetail> getByID(@Path("id") String id, @Header("Authorization") String authorization);

    @POST("busstops/around")
    Call<List<BusStop>> getBusStopAround(@Body Route body, @Header("Authorization") String authorization);
}
