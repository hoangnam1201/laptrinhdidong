package com.example.busstation.services;

import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class RetrofitService {
    private static Retrofit Builder() {
        return new Retrofit.Builder()
                .baseUrl("https://busapbe.herokuapp.com/api/")
                .addConverterFactory(GsonConverterFactory.create())
                .build();
    }
    public static <T> T create(final Class<T> service){
        return Builder().create(service);
    }
}
