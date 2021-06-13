package com.example.busstation.controllers;

import android.app.Activity;
import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.RelativeLayout;
import android.widget.TextView;

import com.example.busstation.MainActivity;
import com.example.busstation.R;
import com.example.busstation.models.AccessToken;
import com.example.busstation.models.Buses;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

import static com.example.busstation.HomeNavigation.redirectActivity;

public class BusAdapter extends BaseAdapter implements Filterable {

    private Context context;
    private int layout;
    private List<Buses> busList;
    private List<Buses> busListOld;
    private int mode;

    public BusAdapter(Context context, int layout, List<Buses> busList, int mode) {
        this.context = context;
        this.layout = layout;
        this.busList = busList;
        this.busListOld = busList;
        this.mode = mode;
    }

    @Override
    public int getCount() {
        return busList.size();
    }

    @Override
    public Object getItem(int position) {
        return null;
    }

    @Override
    public long getItemId(int position) {
        return 0;
    }

    @Override
    public View getView(int position, View convertView, ViewGroup parent) {
        LayoutInflater layoutInflater = (LayoutInflater) context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
        convertView = layoutInflater.inflate(layout, null);
        TextView txtMaSo = (TextView) convertView.findViewById(R.id.textViewMaSo);
        TextView txtTuyenXe = (TextView) convertView.findViewById(R.id.textViewBus);
        ImageView imgBus = (ImageView) convertView.findViewById(R.id.imgHinh);
        ImageView imgLike = convertView.findViewById(R.id.imgLike);
        Buses buses = busList.get(position);

        if(mode == 1){
            buses.setFavorite(true);
        }

        imgLike.setOnClickListener(v -> {
            v.setEnabled(false);
            if (!buses.getFavorite()) {
                AddFavorite(buses, v);
            } else {
                DeleteFavorite(buses, v);
            }
        });

        if (buses.getFavorite()) {
            imgLike.setImageResource(R.drawable.heart);
        } else {
            imgLike.setImageResource(R.drawable.heart_off);
        }

        txtMaSo.setText(buses.getId());
        txtTuyenXe.setText(buses.getName());
        imgBus.setImageResource(R.drawable.ic_bus);
        return convertView;
    }

    @Override
    public Filter getFilter() {

        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                String strSearch = constraint.toString();
                if (strSearch.isEmpty()) {
                    busList = busListOld;
                } else {
                    List<Buses> list = new ArrayList<>();
                    for (Buses buses : busListOld) {
                        if (buses.getName().toLowerCase().contains(strSearch.toLowerCase())) {
                            list.add(buses);
                            continue;
                        }
                        if (buses.getId().toLowerCase().contains(strSearch.toLowerCase())) {
                            list.add(buses);
                        }
                    }
                    busList = list;
                }
                FilterResults filterResults = new FilterResults();
                filterResults.values = busList;
                return filterResults;
            }

            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                busList = (List<Buses>) results.values;
                notifyDataSetChanged();
            }
        };
    }

    private void AddFavorite(Buses buses, View v) {
        RetrofitService.create(UserService.class).AddFavorite("Token " + SharedPreferencesController.getStringValueByKey(context, "accessToken"), buses.get_id()).enqueue(new Callback<List<Buses>>() {
            @Override
            public void onResponse(Call<List<Buses>> call, Response<List<Buses>> response) {
                Log.d("kiemtra", "onResponse: " + response.code());
                if (response.isSuccessful()) {
                    busList = response.body();
                    RelativeLayout parent = (RelativeLayout) v.getParent();
                    ImageView img = (ImageView) parent.getChildAt(3);
                    img.setImageResource(R.drawable.heart);
                    buses.setFavorite(true);
                    v.setEnabled(true);
                    return;
                }
                RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                    @Override
                    public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            SharedPreferencesController.setStringValue(context, "accessToken", response.body().getAccessToken());
                            AddFavorite(buses, v);
                        } else {
                            SharedPreferencesController.clear(context);
                            redirectActivity((Activity) context, MainActivity.class);
                        }
                    }

                    @Override
                    public void onFailure(Call<AccessToken> call, Throwable t) {
                        Log.d("kiemtra", "search: " + t.getMessage());
                    }
                });
                return;
            }

            @Override
            public void onFailure(Call<List<Buses>> call, Throwable t) {
                v.setEnabled(true);
            }
        });
    }

    private void DeleteFavorite(Buses buses, View v) {
        RetrofitService.create(UserService.class).DeleteFavorite("Token " + SharedPreferencesController.getStringValueByKey(context, "accessToken"), buses.get_id()).enqueue(new Callback<List<Buses>>() {
            @Override
            public void onResponse(Call<List<Buses>> call, Response<List<Buses>> response) {
                Log.d("kiemtra", "onResponse: " + response.code());
                if (response.isSuccessful()) {
                    busList = response.body();
                    RelativeLayout parent = (RelativeLayout) v.getParent();
                    ImageView img = (ImageView) parent.getChildAt(3);
                    img.setImageResource(R.drawable.heart_off);
                    buses.setFavorite(false);
                    v.setEnabled(true);
                    return;
                }
                RetrofitService.create(UserService.class).refreshToken(SharedPreferencesController.getStringValueByKey(context, "refreshToken")).enqueue(new Callback<AccessToken>() {
                    @Override
                    public void onResponse(Call<AccessToken> call, Response<AccessToken> response) {
                        if (response.isSuccessful() && response.body() != null) {
                            SharedPreferencesController.setStringValue(context, "accessToken", response.body().getAccessToken());
                            AddFavorite(buses, v);
                        } else {
                            SharedPreferencesController.clear(context);
                            redirectActivity((Activity) context, MainActivity.class);
                        }
                    }

                    @Override
                    public void onFailure(Call<AccessToken> call, Throwable t) {
                        Log.d("kiemtra", "search: " + t.getMessage());
                    }
                });
                return;
            }

            @Override
            public void onFailure(Call<List<Buses>> call, Throwable t) {
                v.setEnabled(true);
            }
        });
    }
}
