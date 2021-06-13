package com.example.busstation.services;

import com.example.busstation.models.BusesDetail;
import com.example.busstation.models.Buses;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface BusesService {
    @POST("buses/get-favorite-bus")
    Call<List<Buses>> GetAll(@Header("Authorization") String authorization);

    @GET("buses/get-by-id/{id}")
    Call<BusesDetail> GetByID(@Path("id") String id, @Header("Authorization") String authorization);

    @GET("buses-search")
    Call<List<BusesDetail>> Search(@Query("name") String name);

    @GET("buses-name")
    Call<List<String>> GetNameID();
}