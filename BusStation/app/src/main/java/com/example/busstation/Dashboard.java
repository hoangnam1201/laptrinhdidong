package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ListView;

import com.example.busstation.controllers.BusAdapter;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.Buses;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class Dashboard extends AppCompatActivity {

    DrawerLayout drawerLayout;
    ListView lvFavo;
    List<Buses> arrayBuses;
    BusAdapter adapter;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_dashboard);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));
        drawerLayout=findViewById(R.id.drawer_layout);
        Log.d("kiemtra", "onCreate: " + "aa");
        anhxa();
        lvFavo.setOnItemLongClickListener((adapterView, view, i, l)->{
            SharedPreferencesController.setBooleanValue(this, "myPosition", false);
            SharedPreferencesController.setStringValue(this, "modeFollow", "buses");
            SharedPreferencesController.setStringValue(this, "followIdItem", arrayBuses.get(i).get_id().toString());
            Intent intent = new Intent(this, HomeNavigation.class);
            startActivity(intent);
            return true;
        });
    }

    private void anhxa(){
        lvFavo = (ListView) findViewById(R.id.lvFavo);
        arrayBuses = new ArrayList<>();
        RetrofitService.create(UserService.class).GetFavorite("Token " + SharedPreferencesController.getStringValueByKey(this,"accessToken")).enqueue(new Callback<List<Buses>>() {
            @Override
            public void onResponse(Call<List<Buses>> call, Response<List<Buses>> response) {
                Log.d("kiemtra", "onResponse: " + response.code());
                if(response.isSuccessful()){
                    arrayBuses = response.body();
                    Log.d("kiemtra", "onResponse: " + response.body().size());
                    adapter =new BusAdapter(getApplicationContext(),R.layout.activity_list_bus,arrayBuses,1);
                    lvFavo.setAdapter(adapter);
                }
            }

            @Override
            public void onFailure(Call<List<Buses>> call, Throwable t) {
                Log.d("kiemtra", "onResponse: " + t.getLocalizedMessage());
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
        HomeNavigation.redirectActivity(this,HomeNavigation.class);
    }

    public void ClickSearchBus(View view){
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,SearchBus.class);
    }

    public void ClickDashBoard(View view){
        recreate();
    }

    public void ClickAboutUs(View view){
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,AboutUs.class);
    }

    public void ClickSetUp(View view){
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,AccountSetting.class);
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