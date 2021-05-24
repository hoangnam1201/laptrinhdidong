package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.CompoundButton;
import android.widget.EditText;
import android.widget.ProgressBar;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.User;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class MainActivity extends AppCompatActivity {

    TextView signup, forgot, tvError;
    Button btnLogin;
    EditText edtUsername, edtPassword;
    ProgressBar progressBar;
    CheckBox rememberme;
    private SharedPreferences loginPreferences;
    private SharedPreferences.Editor loginPrefsEditor;
    private Boolean saveLogin;

    @Override
    public void onBackPressed() {
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        Animation animation = AnimationUtils.loadAnimation(this, R.anim.rotate_animation);
        findViewById(R.id.imageView).startAnimation(animation);


        anhXa();
        checkUserID();

        //btnLogin.setOnClickListener(v -> onLogin());
        signup.setOnClickListener(v -> openSignUp());
        forgot.setOnClickListener(v -> openForgot());

        //Ghi nhớ tài tài khoan
        btnLogin.setOnClickListener(this::onClick);
        loginPreferences = getSharedPreferences("loginPrefs", MODE_PRIVATE);
        loginPrefsEditor = loginPreferences.edit();
        saveLogin = loginPreferences.getBoolean("saveLogin", false);
        if (saveLogin == true) {
            edtUsername.setText(loginPreferences.getString("username", ""));
            edtPassword.setText(loginPreferences.getString("password", ""));
            rememberme.setChecked(true);}
    }
    //Ghi nhớ TK
    public void onClick(View view) {
        if (view == btnLogin) {
            InputMethodManager imm = (InputMethodManager)getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.hideSoftInputFromWindow(edtUsername.getWindowToken(), 0);
            String username = edtUsername.getText().toString();
            String password = edtPassword.getText().toString();
            if (rememberme.isChecked()) {
                loginPrefsEditor.putBoolean("saveLogin", true);
                loginPrefsEditor.putString("username", username);
                loginPrefsEditor.putString("password", password);
                loginPrefsEditor.commit();
            } else {
                loginPrefsEditor.clear();
                loginPrefsEditor.commit();
            }
            onLogin();
        }
    }

    public void checkUserID() {
        if (SharedPreferencesController.getStringValueByKey(this, "userAuthId") != null) {
            findViewById(R.id.loadingLayout).setVisibility(View.VISIBLE);
            RetrofitService.create(UserService.class).getUser(SharedPreferencesController.getStringValueByKey(this, "userAuthId")).enqueue(new Callback<User>() {
                @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    if (response.body() != null) {
                        Intent intent = new Intent(getApplicationContext(), HomeNavigation.class);
                        startActivity(intent);
                        return;
                    }
                    btnLogin.setVisibility(View.INVISIBLE);
                    findViewById(R.id.loadingLayout).setVisibility(View.GONE);
                }

                @Override
                public void onFailure(Call<User> call, Throwable t) {
                    btnLogin.setVisibility(View.VISIBLE);
                    findViewById(R.id.loadingLayout).setVisibility(View.GONE);
                }
            });
            return;
        }
        btnLogin.setVisibility(View.VISIBLE);

    }

    public void anhXa() {
        signup = findViewById(R.id.tv_signup);
        btnLogin = findViewById(R.id.btn_login);
        edtUsername = findViewById(R.id.edtUsernamelg);
        edtPassword = findViewById(R.id.edtPasswordlg);
        tvError = findViewById(R.id.tvErrorlg);
        progressBar = this.findViewById(R.id.progressBar);
        rememberme = findViewById(R.id.remeber);
        forgot = findViewById(R.id.forgotpass);
    }

    public void openSignUp() {
        Intent intent = new Intent(this, SignUpActivity.class);
        startActivity(intent);
    }

    public void onLogin() {
        progressBar.setVisibility(View.VISIBLE);
        tvError.setText("");
        RetrofitService.create(UserService.class).login(edtUsername.getText().toString(), edtPassword.getText().toString()).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.body() == null) {
                    progressBar.setVisibility(View.INVISIBLE);
                    tvError.setText("invalid username or password");
                    return;
                }

                Intent intent = new Intent(getApplicationContext(), HomeNavigation.class);
                startActivity(intent);

                User user = response.body();
                SharedPreferencesController.setStringValue(getApplicationContext(), "userAuthId", user.get_id());
            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {
                tvError.setText("Error! An error occurred. Please try again later");
                progressBar.setVisibility(View.INVISIBLE);
            }
        });

    }

    public void openForgot() {
        Intent intent = new Intent(this, ForgotPasword.class);
        startActivity(intent);
    }
}