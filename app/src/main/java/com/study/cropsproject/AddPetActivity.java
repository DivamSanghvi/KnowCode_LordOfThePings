package com.study.cropsproject;

import android.os.Bundle;
import android.text.TextUtils;
import android.view.View;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.RadioButton;
import android.widget.RadioGroup;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;

public class AddPetActivity extends AppCompatActivity {
    private EditText edtAnimalType, edtBreed, edtAge, edtWeight, edtDisabilityType, edtMedicalHistory, edt_animal_name;
    private RadioGroup radioGroupGender;
    private CheckBox checkboxDisability;
    private Button btnSubmit;
    private FirebaseFirestore firestore;
    private FirebaseAuth firebaseAuth;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_pet);

        // Initialize Firebase
        firestore = FirebaseFirestore.getInstance();
        firebaseAuth = FirebaseAuth.getInstance();

        // Initialize UI elements
        edtAnimalType = findViewById(R.id.edt_animal_type);
        edtBreed = findViewById(R.id.edt_breed);
        edtAge = findViewById(R.id.edt_age);
        edtWeight = findViewById(R.id.edt_weight);
        edt_animal_name = findViewById(R.id.edt_animal_name);
        radioGroupGender = findViewById(R.id.radio_group_gender);
        checkboxDisability = findViewById(R.id.checkbox_disability);
        edtDisabilityType = findViewById(R.id.edt_disability_type);
        edtMedicalHistory = findViewById(R.id.edt_medical_history);
        btnSubmit = findViewById(R.id.btn_submit);

        // Handle visibility of Disability Type field
        checkboxDisability.setOnCheckedChangeListener((buttonView, isChecked) -> {
            edtDisabilityType.setVisibility(isChecked ? View.VISIBLE : View.GONE);
        });

        // Submit button logic
        btnSubmit.setOnClickListener(v -> addPetToFirestore());
    }

    private void addPetToFirestore() {
        // Get current user ID
        String userId = firebaseAuth.getCurrentUser().getUid();

        // Get input data
        String name = edt_animal_name.getText().toString().trim();
        String animalType = edtAnimalType.getText().toString().trim();
        String breed = edtBreed.getText().toString().trim();
        String age = edtAge.getText().toString().trim();
        String weight = edtWeight.getText().toString().trim();
        String medicalHistory = edtMedicalHistory.getText().toString().trim();
        String disabilityType = checkboxDisability.isChecked() ? edtDisabilityType.getText().toString().trim() : null;

        // Get selected gender
        int selectedGenderId = radioGroupGender.getCheckedRadioButtonId();
        String gender = selectedGenderId != -1 ? ((RadioButton) findViewById(selectedGenderId)).getText().toString() : null;

        // Validate input
        if (TextUtils.isEmpty(animalType) || TextUtils.isEmpty(breed) || TextUtils.isEmpty(age) || TextUtils.isEmpty(weight) || TextUtils.isEmpty(gender)) {
            Toast.makeText(this, "Please fill in all required fields", Toast.LENGTH_SHORT).show();
            return;
        }

        // Create a Pet object
        Pet pet = new Pet(
                name,
                animalType,
                breed,
                Integer.parseInt(age),
                Double.parseDouble(weight),
                gender,
                medicalHistory,
                checkboxDisability.isChecked(),
                disabilityType
        );

        // Save to Firestore under user -> pet -> multiple pets
        firestore.collection("users")
                .document(userId)
                .collection("pets")
                .add(pet)
                .addOnSuccessListener(documentReference -> {
                    Toast.makeText(AddPetActivity.this, "Pet added successfully!", Toast.LENGTH_SHORT).show();
                    finish(); // Close activity after successful submission
                })
                .addOnFailureListener(e -> {
                    Toast.makeText(AddPetActivity.this, "Failed to add pet: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
    }
}
