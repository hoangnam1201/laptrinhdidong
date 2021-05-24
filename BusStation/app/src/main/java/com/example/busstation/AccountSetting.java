package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.Sup.ChangePassword;
import com.example.busstation.controllers.SharedPreferencesController;
import com.example.busstation.models.User;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class AccountSetting extends AppCompatActivity {
    DrawerLayout drawerLayout;
    EditText edtFullname, edtUserName, edtEmail;
    TextView tvName, tvEmail;
    Button btnChangePass;
    View loading;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account_setting);
        tvName =this.findViewById(R.id.tvNameUser);
        tvEmail =this.findViewById(R.id.tvEmail);
        loading = this.findViewById(R.id.loadingLayout);
        HomeNavigation.info(tvName,tvEmail);

        //
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.rotate_animation);
        findViewById(R.id.imageView).startAnimation(animation);

        drawerLayout = findViewById(R.id.drawer_layout);
        edtFullname = this.findViewById(R.id.edtFullname);
        edtUserName = this.findViewById(R.id.edtUser);
        edtEmail = this.findViewById(R.id.edtEmail);
        tvName = this.findViewById(R.id.tvNameUser);
        btnChangePass = this.findViewById(R.id.btnChangePassWord);

        btnChangePass.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(AccountSetting.this, ChangePassword.class);
                startActivity(intent);
            }
        });

        findViewById(R.id.btnSave).setOnClickListener(v->{
            ChangeInfo();
        });
        ShowInfo();


    }

    public void ShowInfo() {
        this.loading.setVisibility(View.VISIBLE);
        RetrofitService.create(UserService.class).getUser(SharedPreferencesController.getStringValueByKey(this, "userAuthId")).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.body() == null) {
                    return;
                }
                edtFullname.setText(response.body().getFullname());
                edtEmail.setText(response.body().getEmail());
                edtUserName.setText(response.body().getUsername());
                loading.setVisibility(View.GONE);



            }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
    }

    public void ChangeInfo() {
        findViewById(R.id.loadingLayout).setVisibility(View.VISIBLE);

        RetrofitService.create(UserService.class).ChangeInfo(SharedPreferencesController.getStringValueByKey(this, "userAuthId"),
                edtEmail.getText().toString(),
                edtFullname.getText().toString(),
                edtUserName.getText().toString()).enqueue(new Callback<User>() {
            @Override
                public void onResponse(Call<User> call, Response<User> response) {
                    findViewById(R.id.loadingLayout).setVisibility(View.GONE);

                    tvName.setText(response.body().getFullname());
                    tvEmail.setText(response.body().getEmail());
                }

            @Override
            public void onFailure(Call<User> call, Throwable t) {

            }
        });
    }

    public void ClickMenu(View view) {
        HomeNavigation.openDrawer(drawerLayout);
    }

    public void ClickLogo(View view) {
        HomeNavigation.closeDrawer(drawerLayout);
    }

    public void ClickHome(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this, HomeNavigation.class);

    }

    public void ClickSearchBus(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this, SearchBus.class);
    }

    public void ClickDashBoard(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this, Dashboard.class);
    }

    public void ClickAboutUs(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this, AboutUs.class);
    }

    public void ClickSetUp(View view) {
        recreate();
    }

    public void ClickLogout(View view) {
        HomeNavigation.logout(this);
    }

    @Override
    protected void onPause() {
        super.onPause();

        HomeNavigation.closeDrawer(drawerLayout);
    }
}