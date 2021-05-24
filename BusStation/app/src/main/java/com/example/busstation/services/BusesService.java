package com.example.busstation.services;

import com.example.busstation.models.Buses;
import com.example.busstation.models.Buses_Favorite;
import com.example.busstation.models.Buses_id;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface BusesService {
    @GET("buses")
    Call<List<Buses_id>> GetAllBuses();

    @POST("buses/{iduser}")
    Call<List<Buses_Favorite>> GetBusesFavorite(@Path("iduser") String iduser);

    @GET("buses/{id}")
    Call<Buses> GetByID(@Path("id") String id);

    @GET("buses-search")
    Call<List<Buses>> Search(@Query("name") String name);


    @GET("buses-name")
    Call<List<String>> GetNameID();
}