package com.study.cropsproject;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.widget.Button;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;
import com.google.android.material.floatingactionbutton.ExtendedFloatingActionButton;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;

import java.util.ArrayList;

public class PetOwnerActivity extends AppCompatActivity {

    private static final String TAG = "PetOwnerActivity";

    private RecyclerView recyclerViewPets;
    private PetAdapter petAdapter;
    private ArrayList<Pet> petList;
    private FirebaseFirestore db;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_pet_owner);

        recyclerViewPets = findViewById(R.id.recyclerViewPets);
        ExtendedFloatingActionButton fabAddPet = findViewById(R.id.fabAddPet);
        Button btnDiagnosis = findViewById(R.id.btnDiagnosis);

        // Initialize Firebase
        db = FirebaseFirestore.getInstance();
        firebaseAuth = FirebaseAuth.getInstance();

        // Set up RecyclerView
        petList = new ArrayList<>();
        petAdapter = new PetAdapter(petList);
        recyclerViewPets.setLayoutManager(new LinearLayoutManager(this));
        recyclerViewPets.setAdapter(petAdapter);

        // Fetch pets from Firestore
        fetchPetsFromFirestore();

        // Floating button click: Add Pet
        fabAddPet.setOnClickListener(view -> {
            Intent intent = new Intent(PetOwnerActivity.this, AddPetActivity.class);
            startActivity(intent);
        });

        // Diagnosis button click
        btnDiagnosis.setOnClickListener(view -> {
            Intent intent = new Intent(PetOwnerActivity.this, DiagnosisActivity.class);
            startActivity(intent);
        });
    }

    private void fetchPetsFromFirestore() {
        // Get current user ID
        String userId = firebaseAuth.getCurrentUser() != null ? firebaseAuth.getCurrentUser().getUid() : null;
        if (userId == null) {
            Log.e(TAG, "User not logged in.");
            return;
        }

        // Real-time listener for pet updates
        db.collection("users")
                .document(userId)
                .collection("pets")
                .addSnapshotListener((value, error) -> {
                    if (error != null) {
                        Log.e(TAG, "Error listening for pet updates: ", error);
                        return;
                    }

                    if (value != null) {
                        petList.clear();
                        for (QueryDocumentSnapshot document : value) {
                            Pet pet = document.toObject(Pet.class);
                            petList.add(pet);
                        }
                        petAdapter.notifyDataSetChanged();
                    }
                });
    }

}
