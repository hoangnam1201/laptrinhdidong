package com.example.busstation;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.example.busstation.controllers.SharedPreferencesController;
import com.google.android.gms.common.api.Status;
import com.google.android.libraries.places.api.Places;
import com.google.android.libraries.places.api.model.Place;
import com.google.android.libraries.places.widget.Autocomplete;
import com.google.android.libraries.places.widget.AutocompleteActivity;
import com.google.android.libraries.places.widget.model.AutocompleteActivityMode;

import java.util.Arrays;
import java.util.List;

import static com.example.busstation.HomeNavigation.redirectActivity;

public class SearchRoute extends AppCompatActivity {
    DrawerLayout drawerLayout;
    EditText editText1, editText2;
    Button btnSearch;
    EditText currentFocus;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_route2);
        anhxa();
        drawerLayout=findViewById(R.id.drawer_layout);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));
        getIntent();
        Places.initialize(getApplicationContext(),getString(R.string.search_key));
        editText1.setFocusable(false);
        editText1.setOnClickListener(v -> {
            currentFocus = editText1;
            List<Place.Field> fieldList = Arrays.asList(Place.Field.ADDRESS,Place.Field.NAME);
            Log.d("kiemtra", "onCreate: ");
            Intent intent = new Autocomplete.IntentBuilder(AutocompleteActivityMode.OVERLAY,
                    fieldList).build(SearchRoute.this);
            startActivityForResult(intent,100);
        });
        editText2.setFocusable(false);
        editText2.setOnClickListener(v -> {
            currentFocus = editText2;
            List<Place.Field> fieldList = Arrays.asList(Place.Field.ADDRESS,
                    Place.Field.LAT_LNG,Place.Field.NAME);
            Intent intent = new Autocomplete.IntentBuilder(AutocompleteActivityMode.OVERLAY,
                    fieldList).build(SearchRoute.this);
            startActivityForResult(intent,100);
        });
        btnSearch.setOnClickListener(v->{
            currentFocus = editText2;
            SharedPreferencesController.setStringValue(this, "modeFollow", "router");
            SharedPreferencesController.setStringValue(this, "origin", editText1.getText().toString());
            SharedPreferencesController.setStringValue(this, "dest", editText2.getText().toString());
            Intent i = new Intent(this, HomeNavigation.class);
            startActivity(i);
        });

    }



    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        if (requestCode == 100 && resultCode == RESULT_OK){
            Place place = Autocomplete.getPlaceFromIntent(data);
            if(currentFocus == editText1){
                editText1.setText(place.getAddress());
            }else{
                editText2.setText(place.getAddress());
            }
        }
        else if (resultCode == AutocompleteActivity.RESULT_ERROR){
            Status status = Autocomplete.getStatusFromIntent(data);
            Toast.makeText(getApplicationContext(),status.getStatusMessage(),Toast.LENGTH_SHORT).show();
        }
        super.onActivityResult(requestCode, resultCode, data);
    }

    private void anhxa(){
        editText1 = (EditText) findViewById(R.id.searchAdress1);
        editText2 = (EditText) findViewById(R.id.searchAdress2);
        btnSearch = (Button) findViewById(R.id.btnTimDuong);

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

}