package com.example.busstation.models;

import java.util.List;

public class Busstop_Detail {
    String _id;
    String name, locationName;
    Double latitude, longitude;
    List<Buses_id> buses;

    public String get_id() {
        return _id;
    }

    public String getName() {
        return name;
    }

    public String getLocationName() {
        return locationName;
    }

    public Double getLatitude() {
        return latitude;
    }

    public Double getLongitude() {
        return longitude;
    }

    public List<Buses_id> getBuses() {
        return buses;
    }
}
