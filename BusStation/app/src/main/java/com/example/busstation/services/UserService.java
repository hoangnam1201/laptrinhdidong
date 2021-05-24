package com.example.busstation.services;

import com.example.busstation.models.Buses_Favorite;
import com.example.busstation.models.User;

import java.util.List;

import retrofit2.Call;
import retrofit2.http.Field;
import retrofit2.http.FormUrlEncoded;
import retrofit2.http.GET;
import retrofit2.http.POST;
import retrofit2.http.PUT;
import retrofit2.http.Path;

public interface UserService {
    @GET("user-username/{username}")
    Call<Boolean> checkExistUsername(@Path("username") String username);

    @GET("user-email/{email}")
    Call<Boolean> checkExistEmail(@Path("email") String email);

    @FormUrlEncoded
    @POST("users")
    Call<List<User>> createUser(
            @Field("fullname") String fullname,
            @Field("username") String username,
            @Field("email") String email,
            @Field("password") String password
    );

    @FormUrlEncoded
    @POST("user-login")
    Call<User> login(
            @Field("username") String username,
            @Field("password") String password
    );

    @FormUrlEncoded
    @POST("user")
    Call<User> getUser(
            @Field("id") String id
    );

    @FormUrlEncoded
    @PUT("user/{id}")
    Call<User> ChangeInfo(
      @Path("id") String id,
      @Field("email") String email,
      @Field("fullname") String fullname,
      @Field("username") String username
    );

    @FormUrlEncoded
    @POST("user-checkpassword")
    Call<Boolean> CheckPassword(
           @Field("id") String id,
           @Field("password") String password
    );

    @FormUrlEncoded
    @PUT("/api/user-password/{id}")
    Call<User> ChangePassword(
            @Path("id") String id,
            @Field("password") String password
    );

    @FormUrlEncoded
    @PUT("users-addFavoriteBuses/{id}")
    Call<List<Buses_Favorite>> addFavorite(@Path("id") String id, @Field("idBuses") String idBuses);


    @FormUrlEncoded
    @PUT("users-deleteFavoriteBuses/{id}")
    Call<List<Buses_Favorite>> DeleteFavorite(@Path("id") String id, @Field("idBuses") String idBuses);

    @POST("user-favoriteBuses/{id}")
    Call<List<Buses_Favorite>> GetFavorite(@Path("id") String id);
}
