package com.example.busstation.services;

import com.example.busstation.models.AccessToken;
import com.example.busstation.models.Buses;
import com.example.busstation.models.Token;
import com.example.busstation.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.Header;
import retrofit2.http.POST;
import retrofit2.http.PUT;

public interface UserService {

    @FormUrlEncoded
    @POST("users/add")
    Call<User> addUser(
            @Field("fullname") String fullname,
            @Field("username") String username,
            @Field("email") String email,
            @Field("password") String password
    );

    @FormUrlEncoded
    @POST("auth/login")
    Call<Token> login(
            @Field("username") String username,
            @Field("password") String password
    );


    @POST("users/get-infor")
    Call<User> getInfo(@Header("Authorization") String authorization);

    @FormUrlEncoded
    @POST("auth/refresh")
    Call<AccessToken> refreshToken(@Field("refreshToken") String refreshToken);

    @FormUrlEncoded
    @PUT("users/update-infomation")
    Call<User> ChangeInfo(
            @Header("Authorization") String authorization,
            @Field("email") String email,
            @Field("fullname") String fullname,
            @Field("username") String username
    );

    @FormUrlEncoded
    @PUT("users/update-password")
    Call<User> ChangePassword(
            @Header("Authorization") String authorization,
            @Field("oldPassword") String oldPassword,
            @Field("password") String password
    );

    @FormUrlEncoded
    @PUT("users/add-favorite-bus")
    Call<List<Buses>> AddFavorite(@Header("Authorization") String authorization, @Field("idBuses") String idBuses);


    @FormUrlEncoded
    @PUT("users/delete-favorite-bus")
    Call<List<Buses>> DeleteFavorite(@Header("Authorization") String authorization, @Field("idBuses") String idBuses);

    @POST("users/get-favorite-bus")
    Call<List<Buses>> GetFavorite(@Header("Authorization") String authorization);
}
