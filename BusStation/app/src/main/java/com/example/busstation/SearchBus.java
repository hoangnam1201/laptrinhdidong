package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.drawerlayout.widget.DrawerLayout;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;

import com.example.busstation.controllers.BusAdapter;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.AccessToken;
import com.example.busstation.models.Buses;
import com.example.busstation.services.BusesService;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.busstation.HomeNavigation.redirectActivity;

public class SearchBus extends AppCompatActivity {
    DrawerLayout drawerLayout;

    ListView lvBus;
    List<Buses> arrayBuses;
    BusAdapter adapter;
    SearchView searchView;
    List<String> arrComplete;
    static Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_bus);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));

        context = this;

        anhxa();
        drawerLayout=findViewById(R.id.drawer_layout);
        filterSearchView();
        lvBus.setOnItemLongClickListener((adapterView, view, i, l)->{
            SharedPreferencesController.setBooleanValue(this, "myPosition", false);
            SharedPreferencesController.setStringValue(this, "modeFollow", "buses");
            SharedPreferencesController.setStringValue(this, "followIdItem", arrayBuses.get(i).get_id().toString());
            Intent intent = new Intent(this, HomeNavigation.class);
            startActivity(intent);
            return true;
        });

    }


    private void filterSearchView(){
        searchView = (SearchView) findViewById(R.id.searchView);
        searchView.setOnQueryTextListener(new SearchView.OnQueryTextListener() {
            @Override
            public boolean onQueryTextSubmit(String query) {
                return false;
            }

            @Override
            public boolean onQueryTextChange(String newText) {
                adapter.getFilter().filter(newText);
                return false;
            }
        });
    }
    private void anhxa(){
        lvBus = (ListView) findViewById(R.id.lvBuses);
        arrayBuses = new ArrayList<>();
        uploadBuses();

    }
    private void uploadBuses(){
        RetrofitService.create(BusesService.class).GetAll("Token " + SharedPreferencesController.getStringValueByKey(getApplicationContext(),"accessToken")).enqueue(new Callback<List<Buses>>() {
            @Override
            public void onResponse(Call<List<Buses>> call, Response<List<Buses>> response) {
                Log.d("kiemtra", "buses: " + response.code());
                if(response.isSuccessful()){
                    arrayBuses = response.body();
                    adapter =new BusAdapter(getApplicationContext(),R.layout.activity_list_bus,arrayBuses, 0);
                    lvBus.setAdapter(adapter);
                    return;
                }
                if(response.code() == 401){
                    RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                        @Override
                        public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                            if (response.isSuccessful() && response.body() != null) {
                                SharedPreferencesController.setStringValue(context, "accessToken", response.body().getAccessToken());
                                uploadBuses();
                            } else {
                                SharedPreferencesController.clear(context);
                                redirectActivity((Activity) context, MainActivity.class);
                            }
                        }

                        @Override
                        public void onFailure(Call<AccessToken> call, Throwable t) {
                            Log.d("kiemtra", "search: " + t.getMessage());
                        }
                    });
                    return;
                }
            }

            @Override
            public void onFailure(Call<List<Buses>> call, Throwable t) {
                Log.d("kiemtra1", "onFailure: " + t.getMessage());
            }
        });
    }



    public void ClickMenu(View view){
        HomeNavigation.openDrawer(drawerLayout);
    }

    public void ClickLogo(View view){
        HomeNavigation.closeDrawer(drawerLayout);
    }

    public void ClickHome(View view){
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this,HomeNavigation.class);
    }

    public void ClickSearchBus(View view){
        recreate();
    }

    public void ClickDashBoard(View view){
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this,Dashboard.class);
    }

    public void ClickAboutUs(View view){
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this,AboutUs.class);
    }

    public void ClickSetUp(View view){
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this,AccountSetting.class);
    }

    public void ClickLogout(View view){
        HomeNavigation.logout(this);
    }

    @Override
    protected void onPause() {
        super.onPause();

        HomeNavigation.closeDrawer(drawerLayout);
    }
}