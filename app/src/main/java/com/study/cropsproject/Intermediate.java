package com.study.cropsproject;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.ImageButton;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseUser;


import androidx.appcompat.app.AppCompatActivity;

public class Intermediate extends AppCompatActivity {
    private ImageButton btnFarmer, btnPetOwner;
    private FirebaseAuth mAuth;
    Button logout;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_intermediate);
        mAuth = FirebaseAuth.getInstance();
        FirebaseUser currentUser = mAuth.getCurrentUser();
        if (currentUser == null) {
            // User is not logged in, redirect to LoginActivity
            Intent intent = new Intent(Intermediate.this, login.class);
            intent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK | Intent.FLAG_ACTIVITY_CLEAR_TASK); // Clear activity stack
            startActivity(intent);
            finish();
        }
        // Initialize buttons
        btnFarmer = findViewById(R.id.btnFarmer);
        btnPetOwner = findViewById(R.id.btnPetOwner);
        logout = findViewById(R.id.logout);

        // Set click listeners for the buttons
        btnFarmer.setOnClickListener(v -> {
            // Navigate to Farmer-related activity
            Intent intent = new Intent(Intermediate.this, MainActivity.class);
            startActivity(intent);
        });

        btnPetOwner.setOnClickListener(v -> {
            // Navigate to Pet Owner-related activity
            Intent intent = new Intent(Intermediate.this, PetOwnerActivity.class);
            startActivity(intent);
        });

        logout.setOnClickListener(v -> {

            FirebaseAuth.getInstance().signOut();
            // Navigate to Pet Owner-related activity
            Intent intent = new Intent(Intermediate.this, login.class);
            startActivity(intent);
        });
    }
}