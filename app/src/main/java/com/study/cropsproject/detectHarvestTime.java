package com.study.cropsproject;

import android.content.Intent;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.drawable.BitmapDrawable;
import android.os.Bundle;
import android.provider.MediaStore;
import android.speech.tts.TextToSpeech;
import android.view.MotionEvent;
import android.widget.Button;
import android.widget.ImageView;
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


import java.io.InputStream;
import java.util.ArrayList;
import java.util.concurrent.Executor;
import java.util.concurrent.Executors;
import java.util.Locale;

public class detectHarvestTime extends AppCompatActivity implements TextToSpeech.OnInitListener{

    private static final String API_KEY = "AIzaSyBv0w-GuxAbukZ3QX2tWsyKBG5zqRDNKcY";
    private static final int PICK_IMAGE_REQUEST = 1;
    private static final int CAMERA_REQUEST = 2;
    private Executor executor = Executors.newSingleThreadExecutor();
    private ImageView imageView;
    //    private EditText promptEditText;
    private TextView responseTextView;
    private TextToSpeech textToSpeech;
    private Button convertToSpeechButton;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_detect_harvest_time);

        imageView = findViewById(R.id.imageView);
//        promptEditText = findViewById(R.id.promptEditText);
        responseTextView = findViewById(R.id.responseTextView);

        Button selectImageButton = findViewById(R.id.selectImageButton);
        Button cameraButton = findViewById(R.id.cameraButton);
        Button sendPromptButton = findViewById(R.id.sendPromptButton);
        addButtonClickAnimation(findViewById(R.id.selectImageButton));
        addButtonClickAnimation(findViewById(R.id.cameraButton));
        addButtonClickAnimation(findViewById(R.id.sendPromptButton));
        textToSpeech = new TextToSpeech(this, this);

        // Find views
        convertToSpeechButton = findViewById(R.id.convertToSpeechButton2);


        selectImageButton.setOnClickListener(view -> openGallery());

        cameraButton.setOnClickListener(view -> openCamera());

        sendPromptButton.setOnClickListener(view -> {
            Bitmap bitmap = ((BitmapDrawable) imageView.getDrawable()).getBitmap();
            if (bitmap != null) {
                analyzeImage(bitmap);
            } else {
                Toast.makeText(detectHarvestTime.this, "Please select an image first", Toast.LENGTH_SHORT).show();
            }
        });


        convertToSpeechButton.setOnClickListener(v -> convertTextToSpeech());

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
        String text = responseTextView.getText().toString();
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

    // Open Gallery to select an image
    private void openGallery() {
        Intent intent = new Intent(Intent.ACTION_PICK, MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
        startActivityForResult(intent, PICK_IMAGE_REQUEST);
    }

    // Open Camera to take a picture
    private void openCamera() {
        Intent intent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
        startActivityForResult(intent, CAMERA_REQUEST);
    }

    // Handle the selected image from Gallery or Camera
    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == PICK_IMAGE_REQUEST && resultCode == RESULT_OK && data != null) {
            try {
                InputStream inputStream = getContentResolver().openInputStream(data.getData());
                Bitmap selectedImage = BitmapFactory.decodeStream(inputStream);
                imageView.setImageBitmap(selectedImage);
            } catch (Exception e) {
                e.printStackTrace();
            }
        } else if (requestCode == CAMERA_REQUEST && resultCode == RESULT_OK && data != null) {
            Bitmap cameraImage = (Bitmap) data.getExtras().get("data");
            imageView.setImageBitmap(cameraImage);
        }
    }

    private void addButtonClickAnimation(Button button) {
        button.setOnTouchListener((v, event) -> {
            switch (event.getAction()) {
                case MotionEvent.ACTION_DOWN:
                    v.animate().scaleX(0.95f).scaleY(0.95f).setDuration(100).start();
                    break;
                case MotionEvent.ACTION_UP:
                case MotionEvent.ACTION_CANCEL:
                    v.animate().scaleX(1f).scaleY(1f).setDuration(100).start();
                    break;
            }
            return false;
        });
    }

    // Analyze the image using Gemini model
    private void analyzeImage(Bitmap bitmap) {
        // Create Content with both Text and Image
        Content content = new Content.Builder()
                .addText("Analyze the freshness and ripeness of the fruit/vegetable in this image. Check if it is ripe and ready for harvesting.")
                .addImage(bitmap)  // Add the image (as a Bitmap)
                .build();

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
                    resultText = resultText.replace("*", "");
                    responseTextView.setText(resultText);  // Display the result
                });
            }

            @Override
            public void onFailure(Throwable t) {
                runOnUiThread(() -> {
                    responseTextView.setText("Failed to generate response.");
                    Toast.makeText(detectHarvestTime.this, "Error: " + t.getMessage(), Toast.LENGTH_SHORT).show();
                });
            }
        }, executor);
    }
}
