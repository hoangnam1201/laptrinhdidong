package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;
import android.os.PatternMatcher;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.ProgressBar;
import android.widget.ShareActionProvider;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.models.User;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import java.io.IOException;
import java.util.List;
import java.util.regex.Pattern;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;
import retrofit2.Retrofit;
import retrofit2.converter.gson.GsonConverterFactory;

public class SignUpActivity extends AppCompatActivity {

    TextView login, tvError;
    ProgressBar progressBar;

    EditText edtFullName, edtUsername, edtPassword, edtEmail, edtRepeatPassword;
    Button btnApply;

    @Override
    public void onBackPressed() {
//        Toast.makeText(this, , Toast.LENGTH_SHORT).show();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup);

        AnhXa();

        login = (TextView) findViewById(R.id.tv_login);

        login.setOnClickListener(v -> openLogin());

        btnApply.setOnClickListener(v -> {
            if (!Pattern.matches("[a-zA-z\\s]{3,}", edtFullName.getText().toString().trim())) {
                tvError.setText("invalid full name");
                return;
            }
            if (!Pattern.matches("^[a-z][a-z0-9_\\.]{5,32}@[a-z0-9]{2,}(\\.[a-z0-9]{2,4}){1,2}$", edtEmail.getText().toString().trim())) {
                tvError.setText("invalid email");
                return;
            }
            if (!Pattern.matches("[a-zA-z0-9\\_]{5,}", edtUsername.getText().toString().trim())) {
                tvError.setText("invalid sername");
                return;
            }
            if (edtPassword.getText().toString().length() < 8) {
                tvError.setText("The minimum length of the password is 8 characters ");
                return;
            }
            if (!edtRepeatPassword.getText().toString().trim().equals(edtPassword.getText().toString())) {
                tvError.setText("repeat passwords that are not the same as passwords ");
                return;
            }
            progressBar.setVisibility(View.VISIBLE);
            tvError.setText("");
            v.setEnabled(false);
            createUser();
        });

    }

    public void createUser() {
        RetrofitService.create(UserService.class).checkExistUsername(edtUsername.getText().toString().trim()).enqueue(new Callback<Boolean>() {
            @Override
            public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                if (response.body()) {
                    progressBar.setVisibility(View.INVISIBLE);
                    tvError.setText("Username already exist");
                    btnApply.setEnabled(true);
                    return;
                }
                RetrofitService.create(UserService.class).checkExistEmail(edtEmail.getText().toString().trim()).enqueue(new Callback<Boolean>() {
                    @Override
                    public void onResponse(Call<Boolean> call, Response<Boolean> response) {
                        if (response.body()) {
                            progressBar.setVisibility(View.INVISIBLE);
                            btnApply.setEnabled(true);
                            tvError.setText("Email already exist");
                            return;
                        }
                        RetrofitService.create(UserService.class).createUser(
                                edtFullName.getText().toString().trim(),
                                edtUsername.getText().toString().trim(),
                                edtEmail.getText().toString().trim(),
                                edtPassword.getText().toString().trim()
                        ).enqueue(new Callback<List<User>>() {
                            @Override
                            public void onResponse(Call<List<User>> call, Response<List<User>> response) {

                                Intent intent = new Intent(getApplicationContext(), MainActivity.class);
                                startActivity(intent);
                            }

                            @Override
                            public void onFailure(Call<List<User>> call, Throwable t) {
                                progressBar.setVisibility(View.INVISIBLE);
                                btnApply.setEnabled(true);
                                tvError.setText("Error! An error occurred. Please try again later");
                            }
                        });
                    }

                    @Override
                    public void onFailure(Call<Boolean> call, Throwable t) {
                        progressBar.setVisibility(View.INVISIBLE);
                        btnApply.setEnabled(true);
                        tvError.setText("Error! An error occurred. Please try again later");
                    }
                });
            }

            @Override
            public void onFailure(Call<Boolean> call, Throwable t) {
                progressBar.setVisibility(View.INVISIBLE);
                btnApply.setEnabled(true);
                tvError.setText("Error! An error occurred. Please try again later");
            }
        });
    }

    public void AnhXa() {
        progressBar = findViewById(R.id.progressBar);
        tvError = findViewById(R.id.tvError);
        btnApply = findViewById(R.id.btn_Apply);
        edtFullName = findViewById(R.id.edtFullName);
        edtUsername = findViewById(R.id.edtUsername);
        edtEmail = findViewById(R.id.edtEmail);
        edtPassword = findViewById(R.id.edtPassword);
        edtRepeatPassword = findViewById(R.id.edtRepeatPassword);
    }

    public void openLogin() {

        Intent intent = new Intent(this, MainActivity.class);
        startActivity(intent);
    }
}