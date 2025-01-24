package com.study.cropsproject;

import android.os.Bundle;
import android.view.View;
import android.widget.ExpandableListView;
import android.widget.ProgressBar;
import android.widget.TextView;

import androidx.appcompat.app.AppCompatActivity;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class StepsFarming extends AppCompatActivity {

    ExpandableListView expandableListView;
    CustomExpandableListAdapter expandableListAdapter;
    List<String> listDataHeader;
    HashMap<String, List<String>> listDataChild;
    ProgressBar progressBar;
    TextView progressTextView;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_steps_farming);

        expandableListView = findViewById(R.id.expandableListView);
        progressBar = findViewById(R.id.progressBar);
        progressTextView = findViewById(R.id.progressTextView);

        prepareListData();

        expandableListAdapter = new CustomExpandableListAdapter(this, listDataHeader, listDataChild);
        expandableListView.setAdapter(expandableListAdapter);
        expandableListAdapter.setOnItemCheckListener(new CustomExpandableListAdapter.OnItemCheckListener() {
            @Override
            public void onItemCheck(int groupPosition, int childPosition, boolean isChecked) {
                updateProgress();
            }
        });

        updateProgress();
    }

    private void prepareListData() {
        listDataHeader = new ArrayList<>();
        listDataChild = new HashMap<>();

        // Adding header data
        listDataHeader.add("1. Land Preparation");
        listDataHeader.add("2. Seed Selection and Sowing");
        listDataHeader.add("3. Irrigation and Water Management");
        listDataHeader.add("4. Weed Control");
        listDataHeader.add("5. Pest and Disease Management");
        listDataHeader.add("6. Harvesting and Post-Harvest Handling");

        // Adding child data
        List<String> landPreparation = new ArrayList<>();
        landPreparation.add("Soil Testing");
        landPreparation.add("Tillage");
        landPreparation.add("Fertilizer Application");

        List<String> seedSelection = new ArrayList<>();
        seedSelection.add("Variety Selection");
        seedSelection.add("Seed Treatment");
        seedSelection.add("Sowing");

        List<String> irrigation = new ArrayList<>();
        irrigation.add("Irrigation Scheduling");
        irrigation.add("Water Conservation");

        List<String> weedControl = new ArrayList<>();
        weedControl.add("Mechanical Weeding");
        weedControl.add("Chemical Weeding");

        List<String> pestManagement = new ArrayList<>();
        pestManagement.add("Monitoring");
        pestManagement.add("Integrated Pest Management (IPM)");

        List<String> harvesting = new ArrayList<>();
        harvesting.add("Harvesting");
        harvesting.add("Drying");
        harvesting.add("Storage");

        listDataChild.put(listDataHeader.get(0), landPreparation);
        listDataChild.put(listDataHeader.get(1), seedSelection);
        listDataChild.put(listDataHeader.get(2), irrigation);
        listDataChild.put(listDataHeader.get(3), weedControl);
        listDataChild.put(listDataHeader.get(4), pestManagement);
        listDataChild.put(listDataHeader.get(5), harvesting);
    }

    private void updateProgress() {
        int totalItems = 0;
        int checkedItems = 0;

        for (List<String> group : listDataChild.values()) {
            totalItems += group.size();
            for (int i = 0; i < group.size(); i++) {
                if (expandableListAdapter.isChildChecked(group.get(i))) {
                    checkedItems++;
                }
            }
        }

        int progress = (int) ((float) checkedItems / totalItems * 100);
        progressBar.setProgress(progress);
        progressTextView.setText(progress + "%");
    }
}