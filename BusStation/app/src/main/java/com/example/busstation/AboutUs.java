package com.example.busstation;

import androidx.appcompat.app.AppCompatActivity;
import androidx.drawerlayout.widget.DrawerLayout;

import android.os.Bundle;
import android.view.View;

public class AboutUs extends AppCompatActivity {
    DrawerLayout drawerLayout;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_about_us);
        HomeNavigation.info(this.findViewById(R.id.tvNameUser),this.findViewById(R.id.tvEmail));
        drawerLayout=findViewById(R.id.drawer_layout);
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
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,SearchBus.class);
    }

    public void ClickDashBoard(View view){
        HomeNavigation.openDrawer(drawerLayout);
        HomeNavigation.redirectActivity(this,Dashboard.class);
    }

    public void ClickAboutUs(View view){
        recreate();
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