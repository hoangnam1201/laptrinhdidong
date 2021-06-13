package com.example.busstation.Sup;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.app.Activity;
import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.AccountSetting;
import com.example.busstation.MainActivity;
import com.example.busstation.R;
import com.example.busstation.controllers.ProgressDialogController;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.AccessToken;
import com.example.busstation.models.User;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import org.json.JSONObject;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.busstation.HomeNavigation.redirectActivity;

public class ChangePassword extends AppCompatActivity {
    Button btnSave, btnok;
    ProgressDialogController progressDialogController;
    View v;
    DrawerLayout drawerLayout;
    EditText currentPass, newPass, rpPass;
    TextView error;
    static Context context;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_change_password);

        context = this;
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

        findViewById(R.id.back).setOnClickListener(v -> {
            super.onBackPressed();
        });

        progressDialogController.init(this);

        btnSave.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                onChangePassword();
            }
        });

    }

    public void onChangePassword() {
        if (newPass.getText().toString().length() < 8) {
            error.setText("The minimum length of the password is 8 characters ");
            return;
        }
        if (!rpPass.getText().toString().trim().equals(newPass.getText().toString())) {
            error.setText("repeat passwords that are not the same as passwords ");
            return;
        }
        progressDialogController.show();
        RetrofitService.create(UserService.class).ChangePassword("Token " + SharedPreferencesController.getStringValueByKey(getApplicationContext(), "accessToken"), currentPass.getText().toString(), newPass.getText().toString()).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                Log.d("kiemtra", "onResponse: " + response.code() +" "+ response.body());
                if (response.isSuccessful()) {
                    progressDialogController.cancel();
                    Toast.makeText(ChangePassword.this, "Password was changed", Toast.LENGTH_SHORT).show();
                    Intent intent = new Intent(getApplicationContext(), AccountSetting.class);
                    finish();
                    startActivity(intent);
                } else {
                    if(response.code() != 401){
                        try {
                            progressDialogController.cancel();
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            error.setText(jObjError.getString("err"));
                        } catch (Exception e) {
                            error.setText(e.getMessage());
                            progressDialogController.cancel();
                        }
                    }
                    else{
                        RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                            @Override
                            public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                                if(response.isSuccessful() && response.body() != null){
                                    SharedPreferencesController.setStringValue(context,"accessToken", response.body().getAccessToken());
                                    onChangePassword();
                                }
                                else{
                                    SharedPreferencesController.clear(context);
                                    redirectActivity((Activity) context, MainActivity.class);
                                }
                            }

                            @Override
                            public void onFailure(Call<AccessToken> call, Throwable t) {
                                Toast.makeText(context,t.getMessage(),Toast.LENGTH_LONG).show();
                            }
                        });
                    }
                }
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                progressDialogController.cancel();
            }
        });
    }

    public void onBackPressed() {
        super.onBackPressed();
        progressDialogController.cancel();
        finish();
    }
}