package com.example.busstation.models;

import java.util.List;

public class BusStop {
    String _id;
    String name, locationName;
    Double latitude, longitude;
    List<String> buses;

    public String get_id() {
        return _id;
    }

    public List<String> getBuses() {
        return buses;
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
}
