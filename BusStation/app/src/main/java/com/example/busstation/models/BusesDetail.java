package com.example.busstation.models;

import java.util.List;

public class BusesDetail {
    String _id;
    String operatingTime;
    String timeDistance;
    String id;
    String name;
    int price;
    int seats;
    List<BusStop> busstops;

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getSeats() {
        return seats;
    }

    public List<BusStop> getBusstops() {
        return busstops;
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

    public void setName(String name) {
        this.name = name;
    }
}
