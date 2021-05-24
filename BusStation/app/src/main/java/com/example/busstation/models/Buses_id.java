package com.example.busstation.models;

import java.util.List;

public class Buses_id {

    String _id;
    String operatingTime;
    String timeDistance;
    String id;
    String name;
    int price;
    int seats;
    List<String> busstops;

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
