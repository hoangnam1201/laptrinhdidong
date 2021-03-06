package com.example.busstation.models;

import java.util.List;

public class Buses {

    String _id;
    String operatingTime;
    String timeDistance;
    String id;
    String name;
    int price;
    int seats;
    List<String> busstops;
    Boolean isFavorite;

    public void setFavorite(Boolean favorite) {
        isFavorite = favorite;
    }
    public Boolean getFavorite() {
        return isFavorite;
    }

    public String get_id() {
        return _id;
    }

    public String getOperatingTime() {
        return operatingTime;
    }

    public String getTimeDistance() {
        return timeDistance;
    }

    public String getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getSeats() {
        return seats;
    }

    public List<String> getBusstops() {
        return busstops;
    }

}
