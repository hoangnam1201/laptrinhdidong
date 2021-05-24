package com.example.busstation.Sup;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.app.Application;
import android.app.ProgressDialog;
import android.content.Context;
import android.os.Bundle;
import android.util.Log;
import android.view.Gravity;
import android.view.LayoutInflater;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.AccountSetting;
import com.example.busstation.HomeNavigation;
import com.example.busstation.R;
import com.example.busstation.SearchBus;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.User;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class ChangePassword extends AppCompatActivity {
    Button btnSave, btnok;
    ProgressDialog progressDialog;
    View v;
    DrawerLayout drawerLayout;
    EditText currentPass, newPass, rpPass;
    TextView error;



    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_change_password);

        //Anhxa
        btnSave = this.findViewById(R.id.btnSaveNewPass);
        currentPass = this.findViewById(R.id.edtCurrentPass);
        newPass = this.findViewById(R.id.edtNewPass);
        rpPass = this.findViewById(R.id.edtRepeatNewPass);
        error = this.findViewById(R.id.tvError);

        //Truy cap phan tu xml khac
        LayoutInflater inflater = getLayoutInflater();
        View myView = inflater.inflate(R.layout.activity_loading, null);
//        btnok = (Button) myView.findViewById(R.id.btnOK);

        findViewById(R.id.back).setOnClickListener(v->{
            super.onBackPressed();
        });

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (newPass.getText().toString().length() < 8) {
                    error.setText("The minimum length of the password is 8 characters ");
                    return;
                }
                if (!rpPass.getText().toString().trim().equals(newPass.getText().toString())) {
                    error.setText("repeat passwords that are not the same as passwords ");
                    return;
                }
                progressDialog = new ProgressDialog(ChangePassword.this);
                progressDialog.show();
                progressDialog.setContentView(R.layout.progress_dialog);
                progressDialog.getWindow().setBackgroundDrawableResource(
                        android.R.color.transparent
                );
                RetrofitService.create(UserService.class)
                        .CheckPassword(SharedPreferencesController
                                .getStringValueByKey(getApplicationContext(), "userAuthId"), currentPass.getText().toString()).enqueue(new Callback<Boolean>() {
                    @Override
                    public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                        if(!response.body()){
                            error.setText("Wrong current Password !");
                            progressDialog.cancel();

                            return;
                        }
                        Log.d("Checkpas",newPass.getText().toString());
                        RetrofitService.create(UserService.class).ChangePassword(SharedPreferencesController.getStringValueByKey(getApplicationContext(),"userAuthId"), newPass.getText().toString()).enqueue(new Callback<User>() {
                            @Override
                            public void onResponse(Call<User> call, Response<User> response) {
                                Toast.makeText(ChangePassword.this, "Password was changed", Toast.LENGTH_SHORT).show();
                                progressDialog.cancel();
                                finish();
                            }

                            @Override
                            public void onFailure(Call<User> call, Throwable t) {
                                progressDialog.cancel();

                            }
                        });
                    }

                    @Override
                    public void onFailure(Call<Boolean> call, Throwable t) {

                    }
                });


            }
        });
    }

    public void onBackPressed() {
        super.onBackPressed();
        progressDialog.dismiss();
        finish();
    }
}