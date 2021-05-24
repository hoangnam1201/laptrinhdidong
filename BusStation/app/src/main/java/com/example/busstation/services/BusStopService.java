package com.example.busstation.services;

import com.example.busstation.models.BusStop;
import com.example.busstation.models.Busstop_Detail;
import com.google.android.gms.common.internal.HideFirstParty;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.GET;
import retrofit2.http.Path;
import retrofit2.http.Query;

public interface BusStopService {

    @GET("busstops")
    Call<List<BusStop>> getAllBusStops();

    @GET("busstops-getAllName")
    Call<List<String>> getName(@Query("value") String value);

    @GET("busstops-searchname")
    Call<Busstop_Detail> searchBusStop(@Query("name") String name);

    @GET("busstops/{id}")
    Call<Busstop_Detail> getByID(@Path("id") String id);

}
