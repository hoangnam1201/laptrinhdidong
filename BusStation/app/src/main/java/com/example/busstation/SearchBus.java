package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.appcompat.widget.SearchView;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.location.Location;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.ArrayAdapter;
import android.widget.AutoCompleteTextView;
import android.widget.EditText;
import android.widget.ListView;

import com.example.busstation.controllers.BusAdapter;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.BusStop;
import com.example.busstation.models.Buses;
import com.example.busstation.models.Buses_Favorite;
import com.example.busstation.models.Buses_id;
import com.example.busstation.services.BusStopService;
import com.example.busstation.services.BusesService;
import com.example.busstation.services.RetrofitService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class SearchBus extends AppCompatActivity {
    DrawerLayout drawerLayout;

    ListView lvBus;
    List<Buses_Favorite> arrayBuses;
    BusAdapter adapter;
    SearchView searchView;
    List<String> arrComplete;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_bus);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));
        Log.d("kiemtra","init");
        anhxa();
        drawerLayout=findViewById(R.id.drawer_layout);
//        adapter =new BusAdapter(this,R.layout.activity_list_bus,arrayBuses);
//        lvBus.setAdapter(adapter);
        filterSearchView();
        lvBus.setOnItemLongClickListener((adapterView, view, i, l)->{
            SharedPreferencesController.setBooleanValue(this, "myPositionl", false);
            SharedPreferencesController.setStringValue(this, "modeFollow", "buses");
            SharedPreferencesController.setStringValue(this, "followIdItem", arrayBuses.get(i).getBuses().get_id().toString());
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

        Log.d("kiemtra1", "onResponse ---: " + "sssssss");
        Log.d("kiemtra1", "onResponse ---: " + SharedPreferencesController.getStringValueByKey(getApplicationContext(),"userAuthId"));
        RetrofitService.create(BusesService.class).GetBusesFavorite(SharedPreferencesController.getStringValueByKey(getApplicationContext(),"userAuthId")).enqueue(new Callback<List<Buses_Favorite>>() {
            @Override
            public void onResponse(Call<List<Buses_Favorite>> call, Response<List<Buses_Favorite>> response) {
                Log.d("kiemtra1", "onResponse ---: " + response.body().size());
                arrayBuses = response.body();
                adapter =new BusAdapter(getApplicationContext(),R.layout.activity_list_bus,arrayBuses);
                lvBus.setAdapter(adapter);
            }

            @Override
            public void onFailure(Call<List<Buses_Favorite>> call, Throwable t) {
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
        HomeNavigation.redirectActivity(this,HomeNavigation.class);
    }

    public void ClickSearchBus(View view){
        recreate();
    }

    public void ClickDashBoard(View view){
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,Dashboard.class);
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