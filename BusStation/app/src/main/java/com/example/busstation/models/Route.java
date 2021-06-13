package com.example.busstation.models;

import com.google.android.gms.maps.model.LatLng;

public class Route {
    LatLng origin;
    LatLng dest;

    public Route(LatLng origin, LatLng dest) {
        this.origin = origin;
        this.dest = dest;
    }
}
