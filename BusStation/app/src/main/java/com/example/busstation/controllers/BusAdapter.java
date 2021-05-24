package com.example.busstation.controllers;

import android.content.Context;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseAdapter;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.ImageView;
import android.widget.LinearLayout;
import android.widget.RelativeLayout;
import android.widget.TextView;

import androidx.appcompat.widget.SearchView;

import com.example.busstation.R;
import com.example.busstation.models.Buses;
import com.example.busstation.models.Buses_Favorite;
import com.example.busstation.models.Buses_id;
import com.example.busstation.services.RetrofitService;
import com.example.busstation.services.UserService;

import java.util.ArrayList;
import java.util.List;

import retrofit2.Call;
import retrofit2.Callback;
import retrofit2.Response;

public class BusAdapter extends BaseAdapter implements Filterable {

    private Context context;
    private int layout;
    private List<Buses_Favorite> busList;
    private List<Buses_Favorite> busListOld;

    public BusAdapter(Context context, int layout, List<Buses_Favorite> busList) {
        this.context = context;
        this.layout = layout;
        this.busList = busList;
        this.busListOld = busList;
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
        convertView = layoutInflater.inflate(layout,null);
        TextView txtMaSo = (TextView) convertView.findViewById(R.id.textViewMaSo);
        TextView txtTuyenXe = (TextView) convertView.findViewById(R.id.textViewBus);
        ImageView imgBus = (ImageView) convertView.findViewById(R.id.imgHinh);
        ImageView imgLike = convertView.findViewById(R.id.imgLike);
        Buses_Favorite buses = busList.get(position);

        imgLike.setOnClickListener(v->{
            if (!buses.getOwner()){
                RetrofitService.create(UserService.class).addFavorite(SharedPreferencesController.getStringValueByKey(context,"userAuthId"),buses.getBuses().get_id()).enqueue(new Callback<List<Buses_Favorite>>() {
                    @Override
                    public void onResponse(Call<List<Buses_Favorite>> call, Response<List<Buses_Favorite>> response) {
                        busList = response.body();
                        RelativeLayout parent = (RelativeLayout) v.getParent();
                        ImageView img =(ImageView) parent.getChildAt(3);
                        img.setImageResource(R.drawable.heart);
                        buses.setOwner(true);
//                        parent.refreshDrawableState();
                    }

                    @Override
                    public void onFailure(Call<List<Buses_Favorite>> call, Throwable t) {

                    }
                });
            }else {

                RetrofitService.create(UserService.class).DeleteFavorite(SharedPreferencesController.getStringValueByKey(context,"userAuthId"),buses.getBuses().get_id()).enqueue(new Callback<List<Buses_Favorite>>() {
                    @Override
                    public void onResponse(Call<List<Buses_Favorite>> call, Response<List<Buses_Favorite>> response) {
                        busList = response.body();
                        RelativeLayout parent = (RelativeLayout) v.getParent();
                        ImageView img =(ImageView) parent.getChildAt(3);
                        img.setImageResource(R.drawable.heart_off);
//                        parent.refreshDrawableState();
                        buses.setOwner(false);
                    }

                    @Override
                    public void onFailure(Call<List<Buses_Favorite>> call, Throwable t) {

                    }
                });
            }
        });

        if (buses.getOwner()){
            imgLike.setImageResource(R.drawable.heart);
        }
        else {
            imgLike.setImageResource(R.drawable.heart_off);
        }

        txtMaSo.setText(buses.getBuses().getId());
        txtTuyenXe.setText(buses.getBuses().getName());
        imgBus.setImageResource(R.drawable.ic_bus);
        return convertView;
    }

    @Override
    public Filter getFilter() {

        return new Filter() {
            @Override
            protected FilterResults performFiltering(CharSequence constraint) {
                String strSearch = constraint.toString();
                if(strSearch.isEmpty()){
                    busList = busListOld;
                }
                else {
                    List<Buses_Favorite> list = new ArrayList<>();
                    for(Buses_Favorite buses: busListOld){
                        if(buses.getBuses().getName().toLowerCase().contains(strSearch.toLowerCase())){
                            list.add(buses);
                        }
                        if(buses.getBuses().getId().toLowerCase().contains(strSearch.toLowerCase())){
                            list.add(buses);
                        }
                    }
                    busList = list;
                }
                FilterResults filterResults = new FilterResults();
                filterResults.values=busList;
                return filterResults;
            }

            @Override
            protected void publishResults(CharSequence constraint, FilterResults results) {
                busList = (List<Buses_Favorite>) results.values;
                notifyDataSetChanged();
            }
        };
    }
}
