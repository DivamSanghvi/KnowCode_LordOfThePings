package com.study.cropsproject;

public class Pet {
    private String name;
    private String animalType;
    private String breed;
    private int age;
    private double weight;
    private String gender;
    private String medicalHistory;
    private boolean disability;
    private String disabilityType;

    // Default constructor required for Firestore
    public Pet() {
    }
    public Pet(String name, String type, int age) {
        this.name = name;
        this.animalType = type;
        this.age = age;
    }
    // Constructor
    public Pet(String name,String animalType, String breed, int age, double weight, String gender, String medicalHistory, boolean disability, String disabilityType) {
        this.name = name;
        this.animalType = animalType;
        this.breed = breed;
        this.age = age;
        this.weight = weight;
        this.gender = gender;
        this.medicalHistory = medicalHistory;
        this.disability = disability;
        this.disabilityType = disabilityType;
    }

    // Getters and Setters
    public String getAnimalType() {
        return animalType;
    }

    public void setAnimalType(String animalType) {
        this.animalType = animalType;
    }

    public String getBreed() {
        return breed;
    }

    public void setBreed(String breed) {
        this.breed = breed;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public double getWeight() {
        return weight;
    }

    public void setWeight(double weight) {
        this.weight = weight;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getMedicalHistory() {
        return medicalHistory;
    }

    public void setMedicalHistory(String medicalHistory) {
        this.medicalHistory = medicalHistory;
    }

    public boolean isDisability() {
        return disability;
    }

    public void setDisability(boolean disability) {
        this.disability = disability;
    }

    public String getDisabilityType() {
        return disabilityType;
    }

    public void setDisabilityType(String disabilityType) {
        this.disabilityType = disabilityType;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
