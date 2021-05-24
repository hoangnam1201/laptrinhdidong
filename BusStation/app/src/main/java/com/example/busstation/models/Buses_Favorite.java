package com.example.busstation.models;


public class Buses_Favorite {
    Buses_id buses;
    Boolean isOwner;

    public Buses_id getBuses() {
        return buses;
    }

    public void setBuses(Buses_id buses) {
        this.buses = buses;
    }

    public void setOwner(Boolean owner) {
        isOwner = owner;
    }

    public Boolean getOwner() {
        return isOwner;
    }
}
