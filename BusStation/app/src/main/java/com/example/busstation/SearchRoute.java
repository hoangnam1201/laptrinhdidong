package com.example.busstation;

import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
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

public class SearchRoute extends AppCompatActivity {
    EditText editText1, editText2;
    Button btnSearch;
    EditText currentFocus;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search_route2);
        anhxa();
        getIntent();
        Places.initialize(getApplicationContext(),getString(R.string.map_api_key));
        editText1.setFocusable(false);
        editText1.setOnClickListener(v -> {
            currentFocus = editText1;
            List<Place.Field> fieldList = Arrays.asList(Place.Field.ADDRESS,
                    Place.Field.LAT_LNG,Place.Field.NAME);
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
            Intent i = new Intent(this, HomeNavigation.class);
            startActivity(i);
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {

        super.onActivityResult(requestCode, resultCode, data);
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
    }

    private void anhxa(){
        editText1 = (EditText) findViewById(R.id.searchAdress1);
        editText2 = (EditText) findViewById(R.id.searchAdress2);
        btnSearch = (Button) findViewById(R.id.btnTimDuong);

    }
}