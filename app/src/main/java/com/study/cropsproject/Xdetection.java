package com.study.cropsproject;

import android.content.pm.PackageManager;
import android.graphics.Color;
import android.graphics.Paint;
import android.os.Bundle;
import android.util.Log;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.OptIn;
import androidx.appcompat.app.AppCompatActivity;
import androidx.camera.core.CameraSelector;
import androidx.camera.core.ExperimentalGetImage;
import androidx.camera.core.ImageAnalysis;
import androidx.camera.core.ImageProxy;
import androidx.camera.core.Preview;
import androidx.camera.lifecycle.ProcessCameraProvider;
import androidx.camera.view.PreviewView;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;

import com.google.mlkit.vision.common.InputImage;
import com.google.mlkit.vision.objects.DetectedObject;
import com.google.mlkit.vision.objects.ObjectDetection;
import com.google.mlkit.vision.objects.defaults.ObjectDetectorOptions;

import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class Xdetection extends AppCompatActivity {

    private PreviewView cameraPreview;
    private TextView labelText;
    private ExecutorService cameraExecutor;
    private Paint paint;
    private OverlayView overlayView; // Custom view for drawing bounding boxes

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_xdetection);

        // Check and request camera permissions
        if (ContextCompat.checkSelfPermission(this, android.Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, new String[]{android.Manifest.permission.CAMERA}, 100);
        }

        cameraPreview = findViewById(R.id.camera_preview);
        labelText = findViewById(R.id.label_text);
        overlayView = findViewById(R.id.overlay_view); // Initialize overlay
        cameraExecutor = Executors.newSingleThreadExecutor();

        // Initialize paint for drawing bounding box
        paint = new Paint();
        paint.setColor(Color.RED);
        paint.setStyle(Paint.Style.STROKE);
        paint.setStrokeWidth(8);

        startCamera();
    }

    private void startCamera() {
        ProcessCameraProvider.getInstance(this).addListener(() -> {
            try {
                ProcessCameraProvider cameraProvider = ProcessCameraProvider.getInstance(this).get();

                CameraSelector cameraSelector = new CameraSelector.Builder()
                        .requireLensFacing(CameraSelector.LENS_FACING_BACK)
                        .build();

                // Create Preview
                Preview preview = new Preview.Builder().build();
                preview.setSurfaceProvider(cameraPreview.getSurfaceProvider());

                // Create ImageAnalysis
                ImageAnalysis imageAnalysis = new ImageAnalysis.Builder()
                        .setBackpressureStrategy(ImageAnalysis.STRATEGY_KEEP_ONLY_LATEST)
                        .build();

                imageAnalysis.setAnalyzer(cameraExecutor, this::processImage);

                // Bind the camera use cases
                cameraProvider.bindToLifecycle(this, cameraSelector, preview, imageAnalysis);
            } catch (Exception e) {
                Log.e("CameraX", "Use case binding failed", e);
            }
        }, ContextCompat.getMainExecutor(this));
    }

    @OptIn(markerClass = ExperimentalGetImage.class)
    private void processImage(ImageProxy imageProxy) {
        try {
            InputImage inputImage = InputImage.fromMediaImage(imageProxy.getImage(), imageProxy.getImageInfo().getRotationDegrees());
            ObjectDetection.getClient(new ObjectDetectorOptions.Builder()
                            .setDetectorMode(ObjectDetectorOptions.STREAM_MODE)
                            .build())
                    .process(inputImage)
                    .addOnSuccessListener(detectedObjects -> {
                        StringBuilder detectedLabels = new StringBuilder();

                        // Clear the overlay before drawing new boxes
                        overlayView.clearCanvas();

                        for (DetectedObject detectedObject : detectedObjects) {
                            String text = detectedObject.getLabels().toString();
                            float confidence = detectedObject.getLabels().size();
                            detectedLabels.append(text).append(" (")
                                    .append(String.format("%.2f", confidence * 100))
                                    .append("%)\n");

                            // Get bounding box coordinates for the object
                            float left = detectedObject.getBoundingBox().left;
                            float top = detectedObject.getBoundingBox().top;
                            float right = detectedObject.getBoundingBox().right;
                            float bottom = detectedObject.getBoundingBox().bottom;

                            // Draw bounding box on the overlay
                            overlayView.drawBoundingBox(left, top, right, bottom, paint);
                        }

                        runOnUiThread(() -> labelText.setText(detectedLabels.toString()));
                    })
                    .addOnFailureListener(e -> Log.e("ObjectDetection", "Detection failed", e))
                    .addOnCompleteListener(task -> imageProxy.close());
        } catch (Exception e) {
            Log.e("ImageProcessing", "Error processing image", e);
            imageProxy.close();
        }
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        cameraExecutor.shutdown();
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == 100 && grantResults.length > 0 && grantResults[0] == PackageManager.PERMISSION_GRANTED) {
            startCamera();
        } else {
            Log.e("CameraPermission", "Permission denied!");
        }
    }
}
