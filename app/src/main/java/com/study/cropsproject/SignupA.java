package com.study.cropsproject;

import android.content.Intent;
import android.content.pm.PackageManager;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.provider.MediaStore;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;
import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.text.Text;
import com.google.mlkit.vision.text.TextRecognition;
import com.google.mlkit.vision.text.TextRecognizer;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import android.Manifest;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.mlkit.vision.text.latin.TextRecognizerOptions;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class SignupA extends AppCompatActivity {

    private FirebaseAuth mAuth;
    private FirebaseFirestore db;
    private TextView nameTextView, dobTextView, genderTextView, aadhaarTextView;
    private ImageView aadhaarImageView;
    private Button captureAadhaarButton, loginButton;

    private ActivityResultLauncher<Intent> cameraLauncher;

    private ActivityResultLauncher<Intent> filePickerLauncher;
    String name;
    String aadhaar;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_signup2);

        mAuth = FirebaseAuth.getInstance();
        db = FirebaseFirestore.getInstance();

        nameTextView = findViewById(R.id.nameTextView);
        dobTextView = findViewById(R.id.dobTextView);
        genderTextView = findViewById(R.id.genderTextView);
        aadhaarTextView = findViewById(R.id.aadhaarTextView);
        aadhaarImageView = findViewById(R.id.aadhaarImageView);
        captureAadhaarButton = findViewById(R.id.captureAadhaarButton);
        loginButton = findViewById(R.id.loginButton);

        // File picker intent launcher
        filePickerLauncher = registerForActivityResult(
                new ActivityResultContracts.StartActivityForResult(),
                result -> {
                    if (result.getResultCode() == RESULT_OK && result.getData() != null) {
                        try {
                            // Get the selected image URI
                            Bitmap selectedImage = MediaStore.Images.Media.getBitmap(
                                    this.getContentResolver(),
                                    result.getData().getData()
                            );
                            aadhaarImageView.setImageBitmap(selectedImage);
                            extractTextFromImage(selectedImage);
                        } catch (Exception e) {
                            Toast.makeText(this, "Failed to load image: " + e.getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });

        captureAadhaarButton.setOnClickListener(v -> openFilePicker());

        loginButton.setOnClickListener(v -> loginWithFirebase());
    }

    // Open file picker
    private void openFilePicker() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        filePickerLauncher.launch(intent);
    }


    private void openCamera() {
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        cameraLauncher.launch(cameraIntent);
    }

    private void extractTextFromImage(Bitmap bitmap) {
        InputImage image = InputImage.fromBitmap(bitmap, 0);
        TextRecognizer recognizer = TextRecognition.getClient(TextRecognizerOptions.DEFAULT_OPTIONS);

        recognizer.process(image)
                .addOnSuccessListener(this::processExtractedText)
                .addOnFailureListener(e -> Toast.makeText(this, "Text recognition failed: " + e.getMessage(), Toast.LENGTH_SHORT).show());
    }

    private void processExtractedText(@NonNull Text result) {
        String rawText = result.getText();
        name = extractName(rawText);
        String dob = extractDOB(rawText);
        String gender = extractGender(rawText);
        aadhaar = extractAadhaarNumber(rawText);

        nameTextView.setText("Name: " + (name != null ? name : "Not Found"));
        dobTextView.setText("DOB: " + (dob != null ? dob : "Not Found"));
        genderTextView.setText("Gender: " + (gender != null ? gender : "Not Found"));
        aadhaarTextView.setText("Aadhaar: " + (aadhaar != null ? aadhaar : "Not Found"));
    }

    private String extractName(String text) {
        // Match names with three properly capitalized words (e.g., Dikshant Anand Badawagi)
        Pattern pattern = Pattern.compile("\\b([A-Z][a-z]+(?: [A-Z][a-z]+){1,2})\\b");
        Matcher matcher = pattern.matcher(text);

        while (matcher.find()) {
            String possibleName = matcher.group(1).trim();

            // Validate the extracted name (e.g., 3 words with capitalized initials)
            if (isValidName(possibleName)) {
                return possibleName;
            }
        }

        return null; // Return null if no valid name is found
    }

    private boolean isValidName(String name) {
        // Ensure name contains at least 2-3 words, all starting with capital letters
        return name.matches("^[A-Z][a-z]+( [A-Z][a-z]+){1,2}$");
    }



    private String extractDOB(String text) {
        Pattern pattern = Pattern.compile("DOB[:\\s]*(\\d{2}/\\d{2}/\\d{4})");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group(1) : null;
    }

    private String extractGender(String text) {
        if (text.toLowerCase().contains("male")) return "Male";
        if (text.toLowerCase().contains("female")) return "Female";
        return null;
    }

    private String extractAadhaarNumber(String text) {
        Pattern pattern = Pattern.compile("(\\d{4} \\d{4} \\d{4})");
        Matcher matcher = pattern.matcher(text);
        return matcher.find() ? matcher.group(1) : null;
    }

    private void loginWithFirebase() {
        String nameWithoutSpaces = name.replace(" ", "");
        String email = nameWithoutSpaces + "@gmail.com";
        String password = aadhaar;

        mAuth.createUserWithEmailAndPassword(email, password)
                .addOnCompleteListener(task -> {
                    if (task.isSuccessful()) {
                        // Account created successfully
                        Toast.makeText(this, "Account created and logged in successfully: " + email, Toast.LENGTH_SHORT).show();
                        navigateToIntermediateScreen();
                    } else {
                        // Account creation failed
                        if (task.getException() != null && task.getException().getMessage().contains("email address is already in use")) {
                            // If email is already in use, try logging in the user
                            mAuth.signInWithEmailAndPassword(email, password)
                                    .addOnCompleteListener(signInTask -> {
                                        if (signInTask.isSuccessful()) {
                                            Toast.makeText(this, "Logged in successfully: " + email, Toast.LENGTH_SHORT).show();
                                            navigateToIntermediateScreen();
                                        } else {
                                            Toast.makeText(this, "Login failed: " + signInTask.getException().getMessage(), Toast.LENGTH_SHORT).show();
                                        }
                                    });
                        } else {
                            // Handle other errors during account creation
                            Toast.makeText(this, "Account creation failed: " + task.getException().getMessage(), Toast.LENGTH_SHORT).show();
                        }
                    }
                });
    }

    private void navigateToIntermediateScreen() {
        Intent intent = new Intent(SignupA.this, Intermediate.class);
        startActivity(intent);
        finish();
    }



    private static final int CAMERA_PERMISSION_REQUEST_CODE = 101;

    private void requestCameraPermission() {
        if (ContextCompat.checkSelfPermission(this, Manifest.permission.CAMERA)
                != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(
                    this,
                    new String[]{Manifest.permission.CAMERA},
                    CAMERA_PERMISSION_REQUEST_CODE
            );
        } else {
            openCamera(); // If permission is already granted
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);

        if (requestCode == CAMERA_PERMISSION_REQUEST_CODE) {
            if (grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
                Toast.makeText(this, "Camera Permission Granted", Toast.LENGTH_SHORT).show();
                openCamera();
            } else {
                Toast.makeText(this, "Camera Permission Denied", Toast.LENGTH_SHORT).show();
            }
        }
    }

}