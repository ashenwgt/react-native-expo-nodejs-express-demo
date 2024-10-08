import React, { useState } from 'react';
import { Text, View, StyleSheet, Button, Image, Alert, TouchableOpacity, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function Index() {
    const [selectedImage, setSelectedImage] = useState<string | undefined>(undefined);

    // Function to pick an image from the gallery
    const pickImageAsync = async () => {
        let result = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (result.granted === false) {
            alert('Permission to access gallery is required!');
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!pickerResult.canceled) {
            setSelectedImage(pickerResult.assets[0].uri);
        } else {
            alert('You did not select any image.');
        }
    };

    // Convert image URI to Base64 (for mobile platforms only)
    const convertToBase64 = async (uri: string) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64}`; // Prepend the base64 string with this prefix
        } catch (error) {
            console.error('Error converting to Base64:', error);
            return null;
        }
    };

    // Function to handle image upload
    const uploadImage = async () => {
        if (!selectedImage) {
            console.log('No image selected', 'Please select an image first.');
            return;
        }

        let base64Image;

        // Check if the platform is web; if not, convert to Base64
        if (Platform.OS !== 'web') {
            base64Image = await convertToBase64(selectedImage);
            if (!base64Image) {
                console.log('Failed to convert image to Base64');
                return;
            }
        } else {
            base64Image = selectedImage; // On web, use the selected image URI directly
        }

        try {
            const response = await fetch('http://localhost:3000/upload', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    image: base64Image // Send the Base64 encoded image
                })
            });

            const result = await response.json();
            if (result.success) {
                console.log('Image uploaded successfully:', result.filePath);
            } else {
                console.log('Upload failed. Error from server:', result.message);
            }
        } catch (error) {
            console.error('Error uploading the image:', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Welcome to the App</Text>
            <Text style={styles.subtitle}>Upload an Image</Text>

            {/* Button to trigger image picker */}
            <TouchableOpacity style={styles.pickImageButton} onPress={pickImageAsync}>
                <Text style={styles.pickImageText}>Pick an Image</Text>
            </TouchableOpacity>

            {/* Show the selected image */}
            {selectedImage && (
                <Image source={{ uri: selectedImage }} style={styles.imagePreview} />
            )}

            {/* Upload button */}
            <TouchableOpacity style={styles.uploadButton} onPress={uploadImage}>
                <Text style={styles.uploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F6FA',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: '600',
        color: '#1F2D56',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 18,
        fontWeight: '400',
        color: '#4C5C7E',
        marginBottom: 20,
    },
    pickImageButton: {
        backgroundColor: '#3B71F3',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    pickImageText: {
        color: '#fff',
        fontSize: 16,
    },
    imagePreview: {
        width: 200,
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    uploadButton: {
        backgroundColor: '#28A745',
        padding: 10,
        borderRadius: 5,
    },
    uploadButtonText: {
        color: '#fff',
        fontSize: 16,
    },
});
