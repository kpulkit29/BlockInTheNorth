package com.hackinthenorth.blockinthenorth;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.View;

public class FrontPage extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_front_page);
    }
    public void next(View v)
    {
        Intent i=new Intent(this,Register.class);
        startActivity(i);
    }
}
