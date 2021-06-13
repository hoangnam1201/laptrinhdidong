package com.example.busstation.controllers;

import android.app.ProgressDialog;
import android.content.Context;

import com.example.busstation.R;
import com.example.busstation.Sup.ChangePassword;

public class ProgressDialogController {
    public static ProgressDialog progressDialog;

    public static void  init(Context context){
        progressDialog = new ProgressDialog(context);
        progressDialog.setIndeterminate(true);
    }
    public static void show() {
        progressDialog.show();
        progressDialog.setContentView(R.layout.progress_dialog);
        progressDialog.getWindow().setBackgroundDrawableResource(
                android.R.color.transparent
        );
    }
    public static void cancel() {
        progressDialog.cancel();
        progressDialog.dismiss();
    }
}
