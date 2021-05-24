package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;

import android.os.Bundle;
import android.view.Menu;
import android.view.MenuItem;
import android.widget.ArrayAdapter;
import android.widget.ListView;
import android.widget.SearchView;

import com.google.android.gms.maps.CameraUpdateFactory;
import com.google.android.gms.maps.GoogleMap;
import com.google.android.gms.maps.MapFragment;
import com.google.android.gms.maps.OnMapReadyCallback;
import com.google.android.gms.maps.model.LatLng;
import com.google.android.gms.maps.model.MarkerOptions;

import java.util.ArrayList;
import java.util.List;

public class HomeActivity extends AppCompatActivity {
    GoogleMap map;

    ArrayAdapter<String> arrayAdapter;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));
        MapFragment mapFragment = (MapFragment) getFragmentManager().findFragmentById(R.id.myMap);

        mapFragment.getMapAsync(this::onMapReady);

    }


    public  void onMapReady(GoogleMap googleMap)
    {
        map = googleMap;
        LatLng ute = new LatLng(10.856622070058867, 106.77260894553581);
        googleMap.moveCamera(CameraUpdateFactory.newLatLngZoom(ute,20));
        googleMap.addMarker(new MarkerOptions()
                .position(ute)
                .title("Đại học Sư Phạm Kỹ Thuật TP.HCM"));
    }
}