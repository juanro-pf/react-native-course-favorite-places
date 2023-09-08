import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Text } from "react-native";
import { Image } from "react-native";
import { Alert } from "react-native";
import { StyleSheet, View } from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../ui/OutlinedButton";

export default function ImagePicker({ onTakeImage }) {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
    const [pickedImage, setPickedImage] = useState();

    async function verifyPermissions() {
        if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insuficient permissions", "Camera is needed for using this app.");
            return false;
        }
        return true;
    };

    async function takeImageHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        const image = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16, 9],
            quality: 0.5
        });

        setPickedImage(image.uri);
        onTakeImage(image.uri);
    };

    let imagePreview = <Text>No image taken.</Text>;

    if(pickedImage) {
        imagePreview = <Image source={{ uri: pickedImage }} style={styles.image} />
    }

    return (
        <View>
            <View style={styles.imagePreview} >
                { imagePreview }
            </View>
            <OutlinedButton onPress={takeImageHandler} icon="camera" >Take image</OutlinedButton>
        </View>
    );
};

const styles = StyleSheet.create({
    imagePreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    image: {
        width: "100%",
        height: "100%"
    }
});