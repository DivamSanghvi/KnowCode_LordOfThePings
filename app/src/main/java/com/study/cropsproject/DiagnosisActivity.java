package com.study.cropsproject;

import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Bundle;
import android.provider.MediaStore;
import android.speech.tts.TextToSpeech;
import android.util.Log;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.TextView;
import android.widget.Toast;

import androidx.appcompat.app.AppCompatActivity;

import com.google.ai.client.generativeai.GenerativeModel;
import com.google.ai.client.generativeai.java.GenerativeModelFutures;
import com.google.ai.client.generativeai.type.BlockThreshold;
import com.google.ai.client.generativeai.type.Content;
import com.google.ai.client.generativeai.type.GenerateContentResponse;
import com.google.ai.client.generativeai.type.GenerationConfig;
import com.google.ai.client.generativeai.type.HarmCategory;
import com.google.ai.client.generativeai.type.SafetySetting;
import com.google.common.util.concurrent.FutureCallback;
import com.google.common.util.concurrent.Futures;
import com.google.common.util.concurrent.ListenableFuture;
import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.DocumentSnapshot;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.firestore.QueryDocumentSnapshot;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Locale;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;

public class DiagnosisActivity extends AppCompatActivity implements TextToSpeech.OnInitListener{

    private static final String TAG = "DiagnosisActivity";

    private Spinner petSpinner;
    private EditText diagnosisInput, durationInput, dietInput;
    private Button submitDiagnosisButton;
    private TextView outputText;
    private FirebaseFirestore firestore;
    private FirebaseAuth firebaseAuth;
    private FirebaseFirestore db;
    private ArrayList<String> petNames;
    private static final int IMAGE_PICK_REQUEST = 1;
    private static final String API_KEY = "AIzaSyBv0w-GuxAbukZ3QX2tWsyKBG5zqRDNKcY";
    private ImageView petImageView;
    private Button uploadImageButton;
    private Executor executor = Executors.newSingleThreadExecutor();
    boolean sel = false;
    private TextToSpeech textToSpeech;
    private Button convertToSpeechButton;
    private Bitmap bitmap;
    String petName;
    String petAnimalType;
    String petBreed;
    String petAge;
    String petWeight;
    String petMedicalHistory;
    String petDisabilityType;
    String petGender;
    String selectedPet;
    String symptonDetails;
    String durationDetails;
    String dietDetails;
    String prompt;

    String geminiResponse;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_diagnosis);

        petSpinner = findViewById(R.id.petSpinner);
        diagnosisInput = findViewById(R.id.diagnosisInput);
        durationInput = findViewById(R.id.durationEditText);
        dietInput = findViewById(R.id.dietEditText);
        submitDiagnosisButton = findViewById(R.id.submitDiagnosisButton);
        outputText = findViewById(R.id.outputtxt);
        firestore = FirebaseFirestore.getInstance();
        firebaseAuth = FirebaseAuth.getInstance();
        // Initialize Firebase
        db = FirebaseFirestore.getInstance();
        firebaseAuth = FirebaseAuth.getInstance();
        textToSpeech = new TextToSpeech(this, this);
        convertToSpeechButton = findViewById(R.id.convertToSpeechButton);

        petNames = new ArrayList<>();
        petImageView = findViewById(R.id.petImageView);
        uploadImageButton = findViewById(R.id.uploadImageButton);

        // Upload image button click logic
        // Fetch pet names for the spinner
        fetchPetNamesFromFirestore();
        uploadImageButton.setOnClickListener(view -> openImagePicker());

        // Submit diagnosis
        submitDiagnosisButton.setOnClickListener(view -> submitDiagnosis());

        convertToSpeechButton.setOnClickListener(v -> convertTextToSpeech());

    }

    private void openImagePicker() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        intent.setType("image/*");
        startActivityForResult(intent, IMAGE_PICK_REQUEST);
    }


    private void fetchPetNamesFromFirestore() {
        // Get current user ID
        String userId = firebaseAuth.getCurrentUser() != null ? firebaseAuth.getCurrentUser().getUid() : null;
        if (userId == null) {
            Log.e(TAG, "User not logged in.");
            return;
        }

        db.collection("users")
                .document(userId)
                .collection("pets")
                .get()
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful() && task.getResult() != null) {
                        petNames.clear();
                        for (QueryDocumentSnapshot document : task.getResult()) {
                            String petName = document.getString("name");
                            if (petName != null) {
                                petNames.add(petName);
                            }
                        }

                        if (petNames.isEmpty()) {
                            petNames.add("No pets found");
                        }

                        // Set up spinner adapter
                        ArrayAdapter<String> adapter = new ArrayAdapter<>(this, android.R.layout.simple_spinner_item, petNames);
                        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
                        petSpinner.setAdapter(adapter);
                    } else {
                        Log.e(TAG, "Error fetching pet names: ", task.getException());
                    }
                });
    }

    private void submitDiagnosis() {
        selectedPet = petSpinner.getSelectedItem().toString();
        symptonDetails = diagnosisInput.getText().toString().trim();
        durationDetails = durationInput.getText().toString().trim();
        dietDetails = dietInput.getText().toString().trim();

        if ("No pets found".equals(selectedPet)) {
            Toast.makeText(this, "No pets available to diagnose", Toast.LENGTH_SHORT).show();
            return;
        }

        if (symptonDetails.isEmpty()) {
            Toast.makeText(this, "Please enter diagnosis details", Toast.LENGTH_SHORT).show();
            return;
        }

        if (durationDetails.isEmpty()) {
            Toast.makeText(this, "Please enter duration details", Toast.LENGTH_SHORT).show();
            return;
        }

        if (dietDetails.isEmpty()) {
            Toast.makeText(this, "Please enter dietary information", Toast.LENGTH_SHORT).show();
            return;
        }

        // Fetch pet details from Firestore
        fetchPetDetails(selectedPet);

        prompt = "If an image is provided, please refer to it and provide a comprehensive diet plan and meal chart for the pet based on the following details. If exact recommendations cannot be determined, provide a generalized diet plan suitable for the given type and condition of the pet. Ensure the response is specific, actionable, and focuses on promoting the pet's health and well-being:\n\n" +
                "Pet Name: " + petName + "\n" +
                "Animal Type: " + petAnimalType + "\n" +
                "Breed: " + petBreed + "\n" +
                "Age: " + petAge + " years\n" +
                "Weight: " + petWeight + " kg\n" +
                "Medical History: " + petMedicalHistory + "\n" +
                "Disability Type: " + petDisabilityType + "\n" +
                "Gender: " + petGender + "\n\n" +
                "Selected Pet: " + selectedPet + "\n\n" +
                "Meals Per Day: " + symptonDetails + "\n" +
                "Meal Timing: " + durationDetails + "\n" +
                "Diet Information: " + dietDetails + "\n\n" +
                "Based on this information, please recommend:\n\n" +
                "1. A detailed diet plan suitable for the pet's current health condition, or a generalized plan if specifics cannot be determined.\n" +
                "2. A specific meal chart with appropriate timings and quantities for optimal nutrition.\n" +
                "3. Preventive measures to ensure the pet's health remains stable and to avoid potential complications.\n\n" +
                "Use Numbering for points.Even for subpoints using numbering,but dont provide anything in table format.Ensure the response is always constructive and provides useful recommendations without stating inability or negativity. Always aim to offer practical solutions or guidance.";

        diagnosePet();
    }

    private void fetchPetDetails(String PetName) {
        // Get the current user's ID
        String userId = firebaseAuth.getCurrentUser().getUid();

        // Create an object to hold the pet details
        final Pet petDetails = new Pet();

        // Query Firestore to find the pet by its name
        firestore.collection("users")
                .document(userId)
                .collection("pets")
                .whereEqualTo("name", PetName) // Match pet name with the parameter PetName
                .get()
                .addOnSuccessListener(queryDocumentSnapshots -> {
                    if (!queryDocumentSnapshots.isEmpty()) {
                        // Pet found, retrieve the details
                        for (DocumentSnapshot document : queryDocumentSnapshots.getDocuments()) {
                            // Assuming your Pet object is similar to the one you are storing
                            Pet pet = document.toObject(Pet.class);



                            // You can log or display the variables as needed
                            petName = pet.getName();
                            petAnimalType = pet.getAnimalType();
                            petBreed = pet.getBreed();
                            petAge = String.valueOf(pet.getAge());
                            petWeight = String.valueOf(pet.getWeight());
                            petMedicalHistory = pet.getMedicalHistory();
                            petDisabilityType = pet.isDisability() ? pet.getDisabilityType() : "No Disability";
                            petGender = pet.getGender();

                        }
                    } else {
                        // Pet not found
                        Toast.makeText(DiagnosisActivity.this, "No pet found with the name " + PetName, Toast.LENGTH_SHORT).show();
                    }
                })
                .addOnFailureListener(e -> {
                    // Handle failure
                    Toast.makeText(DiagnosisActivity.this, "Failed to fetch pet details: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == IMAGE_PICK_REQUEST && resultCode == RESULT_OK && data != null) {
            Uri selectedImageUri = data.getData();
            if (selectedImageUri != null) {
                try {
                    // Convert the URI into a Bitmap and display it in the ImageView
                    sel = true;
                    bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), selectedImageUri);
                    petImageView.setImageBitmap(bitmap);
                } catch (IOException e) {
                    e.printStackTrace();
                    Toast.makeText(this, "Failed to load image", Toast.LENGTH_SHORT).show();
                }
            }
        }
    }

    private void diagnosePet() {
        // Create Content with both Text and Image


            Content content;

            if (sel){

                content= new Content.Builder()
                        .addText(prompt)
                        .addImage(bitmap)
                        .build();
            }else {
                content= new Content.Builder()
                        .addText(prompt)
                        .build();
            }


        // Initialize the Gemini Model (Gemini-1.5-flash-001 is an example model)
        GenerationConfig.Builder configBuilder = new GenerationConfig.Builder();
        configBuilder.temperature = 0.15f;
        configBuilder.topK = 32;
        configBuilder.topP = 1f;
        configBuilder.maxOutputTokens = 4096;

        ArrayList<SafetySetting> safetySettings = new ArrayList<>();
        safetySettings.add(new SafetySetting(HarmCategory.HARASSMENT, BlockThreshold.MEDIUM_AND_ABOVE));
        safetySettings.add(new SafetySetting(HarmCategory.HATE_SPEECH, BlockThreshold.MEDIUM_AND_ABOVE));
        safetySettings.add(new SafetySetting(HarmCategory.SEXUALLY_EXPLICIT, BlockThreshold.MEDIUM_AND_ABOVE));
        safetySettings.add(new SafetySetting(HarmCategory.DANGEROUS_CONTENT, BlockThreshold.MEDIUM_AND_ABOVE));

        // Initialize GenerativeModel with the required parameters
        GenerativeModel generativeModel = new GenerativeModel(
                "gemini-1.5-flash-001",  // Model name
                API_KEY,  // API Key
                configBuilder.build(),  // Model configuration
                safetySettings  // Safety settings
        );

        // Create the GenerativeModelFutures object
        GenerativeModelFutures modelFutures = GenerativeModelFutures.from(generativeModel);

        // Generate content asynchronously
        ListenableFuture<GenerateContentResponse> responseFuture = modelFutures.generateContent(content);

        // Handle the response using Futures callback
        Futures.addCallback(responseFuture, new FutureCallback<GenerateContentResponse>() {
            @Override
            public void onSuccess(GenerateContentResponse result) {
                // Ensure the response is displayed on the UI thread
                runOnUiThread(() -> {
                    String resultText = result.getText();
                    geminiResponse = resultText;
                    geminiResponse = geminiResponse.replace("*", "");
                    outputText.setText(geminiResponse);  // Display the result in the TextView
                });
            }

            @Override
            public void onFailure(Throwable t) {
                runOnUiThread(() -> {
                    outputText.setText("Failed to generate response.");
                    Toast.makeText(DiagnosisActivity.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }
        }, executor);
    }

    @Override
    public void onInit(int status) {
        if (status == TextToSpeech.SUCCESS) {
            int langResult = textToSpeech.setLanguage(Locale.US);
            if (langResult == TextToSpeech.LANG_MISSING_DATA | langResult == TextToSpeech.LANG_NOT_SUPPORTED) {
                // Handle the case when the language is not supported
            }
        } else {
            // Initialization failed
        }
    }


    private void convertTextToSpeech() {
        String text = outputText.getText().toString();
        if (!text.isEmpty()) {
            textToSpeech.speak(text, TextToSpeech.QUEUE_FLUSH, null, null);
        }
    }

    @Override
    protected void onDestroy() {
        if (textToSpeech != null) {
            textToSpeech.stop();
            textToSpeech.shutdown();
        }
        super.onDestroy();
    }
}
