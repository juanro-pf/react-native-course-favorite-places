import { useState } from "react";
import { StyleSheet, ScrollView, TextInput, Text, View } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import Button from "../ui/Button";
import { Place } from "../../models/place";

export default function PlaceForm({ onCreatePlace }) {

    const [enteredTitle, setEnteredTitle] = useState("");
    const [setselectedImage, setSetselectedImage] = useState();
    const [pickedLocation, setPickedLocation] = useState();

    function changeTitleHandler(enteredText) {
        setEnteredTitle(enteredText);
    };

    function takeImageHandler(imageUri) {
        setSetselectedImage(imageUri);
    };

    function pickLocationHandler(location) {
        setPickedLocation(location);
    };

    function savePlaceHandler() {
        const placeData = new Place(enteredTitle, setselectedImage, pickedLocation)
        onCreatePlace(placeData);
    };

    return(
        <ScrollView style={styles.form} >
            <View>
                <Text style={styles.labels} >Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitleHandler} value={enteredTitle} />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker onPickLocation={pickLocationHandler} />
            <Button onPress={savePlaceHandler} >Add Place</Button>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24
    },
    labels: {
        fontWeight: "bold",
        marginBottom: 4,
        color: Colors.primary500
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100
    }
});