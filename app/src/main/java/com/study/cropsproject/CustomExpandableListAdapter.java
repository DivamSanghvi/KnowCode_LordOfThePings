package com.study.cropsproject;

import android.content.Context;
import android.content.Intent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.BaseExpandableListAdapter;
import android.widget.CheckBox;
import android.widget.ImageView;
import android.widget.TextView;

import java.util.HashMap;
import java.util.List;

public class CustomExpandableListAdapter extends BaseExpandableListAdapter {

    private Context context;
    private List<String> listDataHeader;
    private HashMap<String, List<String>> listDataChild;
    private HashMap<String, Boolean> childCheckStates;
    private OnItemCheckListener onItemCheckListener;

    public CustomExpandableListAdapter(Context context, List<String> listDataHeader,
                                       HashMap<String, List<String>> listChildData) {
        this.context = context;
        this.listDataHeader = listDataHeader;
        this.listDataChild = listChildData;
        this.childCheckStates = new HashMap<>();

        // Initialize all child items as unchecked
        for (List<String> group : listChildData.values()) {
            for (String child : group) {
                childCheckStates.put(child, false);
            }
        }
    }

    @Override
    public int getGroupCount() {
        return this.listDataHeader.size();
    }

    @Override
    public int getChildrenCount(int groupPosition) {
        return this.listDataChild.get(this.listDataHeader.get(groupPosition)).size();
    }

    @Override
    public Object getGroup(int groupPosition) {
        return this.listDataHeader.get(groupPosition);
    }

    @Override
    public Object getChild(int groupPosition, int childPosition) {
        return this.listDataChild.get(this.listDataHeader.get(groupPosition)).get(childPosition);
    }

    @Override
    public long getGroupId(int groupPosition) {
        return groupPosition;
    }

    @Override
    public long getChildId(int groupPosition, int childPosition) {
        return childPosition;
    }

    @Override
    public boolean hasStableIds() {
        return false;
    }

    @Override
    public View getGroupView(int groupPosition, boolean isExpanded, View convertView, ViewGroup parent) {
        String headerTitle = (String) getGroup(groupPosition);
        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_group_item, null);
        }

        TextView listItemTextView = convertView.findViewById(R.id.listItemTextView);
        listItemTextView.setText(headerTitle);

        ImageView expandIcon = convertView.findViewById(R.id.expandIcon);
        expandIcon.setImageResource(isExpanded ? R.drawable.ic_expand_less : R.drawable.ic_expand_more);

        return convertView;
    }

    @Override
    public View getChildView(final int groupPosition, final int childPosition, boolean isLastChild, View convertView, ViewGroup parent) {
        final String childText = (String) getChild(groupPosition, childPosition);

        if (convertView == null) {
            LayoutInflater inflater = (LayoutInflater) this.context.getSystemService(Context.LAYOUT_INFLATER_SERVICE);
            convertView = inflater.inflate(R.layout.list_child_item, null);
        }

        TextView childTextView = convertView.findViewById(R.id.childTextView);
        childTextView.setText(childText);

        final CheckBox childCheckBox = convertView.findViewById(R.id.childCheckBox);
        childCheckBox.setChecked(childCheckStates.get(childText));

        // Checkbox click listener
        childCheckBox.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                boolean isChecked = childCheckBox.isChecked();
                childCheckStates.put(childText, isChecked);
                if (onItemCheckListener != null) {
                    onItemCheckListener.onItemCheck(groupPosition, childPosition, isChecked);
                }
            }
        });

        // Add click listener to the child text to navigate to another page
        childTextView.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if(childText.equals("Soil T     esting")){
                    Intent intent = new Intent(context, SoilTesting.class);
                    intent.putExtra("groupName", listDataHeader.get(groupPosition));
                    intent.putExtra("childName", childText);
                    context.startActivity(intent);
                }

            }
        });

        return convertView;
    }


    @Override
    public boolean isChildSelectable(int groupPosition, int childPosition) {
        return true;
    }

    public boolean isChildChecked(String childText) {
        return childCheckStates.get(childText);
    }

    public void setOnItemCheckListener(OnItemCheckListener listener) {
        this.onItemCheckListener = listener;
    }

    public interface OnItemCheckListener {
        void onItemCheck(int groupPosition, int childPosition, boolean isChecked);
    }
}