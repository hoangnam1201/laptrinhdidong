package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;
import androidx.fragment.app.FragmentManager;
import androidx.fragment.app.FragmentTransaction;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.View;
import android.view.animation.Animation;
import android.view.animation.AnimationUtils;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.example.busstation.Sup.ChangePassword;
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

public class AccountSetting extends AppCompatActivity {
    DrawerLayout drawerLayout;
    EditText edtFullname, edtUserName, edtEmail;
    TextView tvName, tvEmail;
    Button btnChangePass;
    View loading;
    static Context context;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account_setting);
        tvName = this.findViewById(R.id.tvNameUser);
        tvEmail = this.findViewById(R.id.tvEmail);
        loading = this.findViewById(R.id.loadingLayout);
        HomeNavigation.info(tvName, tvEmail);
        //
        Animation animation = AnimationUtils.loadAnimation(this, R.anim.rotate_animation);
        findViewById(R.id.imageView).startAnimation(animation);
        //
        context = this;

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

        findViewById(R.id.btnSave).setOnClickListener(v -> {
            ChangeInfo();
        });
        ShowInfo();


    }

    public void ShowInfo() {
        this.loading.setVisibility(View.VISIBLE);
        RetrofitService.create(UserService.class).getInfo("Token " + SharedPreferencesController.getStringValueByKey(context, "accessToken")).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful() && response.body() != null) {
                    loading.setVisibility(View.INVISIBLE);
                    edtFullname.setText(response.body().getFullname());
                    edtEmail.setText(response.body().getEmail());
                    edtUserName.setText(response.body().getUsername());
                    return;
                } else {
                    RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                        @Override
                        public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                            if (response.isSuccessful() && response.body() != null) {
                                SharedPreferencesController.setStringValue(context, "accessToken", response.body().getAccessToken());
                                ShowInfo();
                            } else {
                                SharedPreferencesController.clear(context);
                                finishAffinity();
                                redirectActivity((Activity) context, MainActivity.class);
                            }
                        }

                        @Override
                        public void onFailure(Call<AccessToken> call, Throwable t) {
                            SharedPreferencesController.clear(context);
                            finishAffinity();
                            redirectActivity((Activity) context, MainActivity.class);
                        }
                    });
                }
            }
            @Override
            public void onFailure(Call<User> call, Throwable t) {
                SharedPreferencesController.clear(context);
                finishAffinity();
                redirectActivity((Activity) context, MainActivity.class);
            }
        });
    }

    public void ChangeInfo() {
        findViewById(R.id.loadingLayout).setVisibility(View.VISIBLE);
        TextView tvError = findViewById(R.id.tvError);
        RetrofitService.create(UserService.class).ChangeInfo("Token " + SharedPreferencesController.getStringValueByKey(this, "accessToken"),
                edtEmail.getText().toString(),
                edtFullname.getText().toString(),
                edtUserName.getText().toString()).enqueue(new Callback<User>() {
            @Override
            public void onResponse(Call<User> call, Response<User> response) {
                if (response.isSuccessful()) {
                    tvName.setText(response.body().getFullname());
                    tvEmail.setText(response.body().getEmail());
                    tvError.setText("");
                    findViewById(R.id.loadingLayout).setVisibility(View.GONE);
                } else {
                    if(response.code() == 401){
                        RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                            @Override
                            public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                                if (response.isSuccessful() && response.body() != null) {
                                    SharedPreferencesController.setStringValue(context, "accessToken", response.body().getAccessToken());
                                    ChangeInfo();
                                } else {
                                    SharedPreferencesController.clear(context);
                                    finishAffinity();
                                    redirectActivity((Activity) context, MainActivity.class);
                                }
                            }
                            @Override
                            public void onFailure(Call<AccessToken> call, Throwable t) {
                            }
                        });
                    }
                    else{
                        findViewById(R.id.loadingLayout).setVisibility(View.GONE);
                        try {
                            JSONObject jObjError = new JSONObject(response.errorBody().string());
                            tvError.setText(jObjError.getString("err"));

                        } catch (Exception e) {
                            tvError.setText(e.getMessage());
                        }
                    }
                }
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
        redirectActivity(this, HomeNavigation.class);

    }

    public void ClickSearchBus(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this, SearchBus.class);
    }

    public void ClickDashBoard(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this, Dashboard.class);
    }

    public void ClickAboutUs(View view) {
        HomeNavigation.openDrawer(drawerLayout);
        redirectActivity(this, AboutUs.class);
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