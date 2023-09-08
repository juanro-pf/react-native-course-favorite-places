import { View } from "react-native";
import { StyleSheet } from "react-native";
import OutlinedButton from "../ui/OutlinedButton";
import { Colors } from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { Alert } from "react-native";
import { Text } from "react-native";
import { useEffect, useState } from "react";
import { useNavigation, useRoute, useIsFocused } from "@react-navigation/native";

export default function LocationPicker({ onPickLocation }) {

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions();

    const navigation = useNavigation();
    const params = useRoute().params;
    const isFocused = useIsFocused();

    const [coords, setCoords] = useState();

    useEffect(() => {
        if (params) {
            setCoords({ lat: params.pickedLat, lng: params.pickedLng });
            onPickLocation({ lat: params.pickedLat, lng: params.pickedLng });
        }
    }, [params, isFocused]);

    async function verifyPermissions() {
        if (locationPermissionInformation.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }
        if (locationPermissionInformation.status === PermissionStatus.DENIED) {
            Alert.alert("Insuficient permissions", "Location is needed for using this app.");
            return false;
        }
        return true;
    };

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) return;

        setCoords({ lat: "Getting latitude...", lng: "Getting longitude..." });
        const location = await getCurrentPositionAsync();
        setCoords({ lat: location.coords.latitude, lng: location.coords.longitude });
        onPickLocation({ lat: location.coords.latitude, lng: location.coords.longitude });
    };

    let coordsMessage = <Text>Location not provided yet.</Text>;

    if (coords) coordsMessage = <>
        <Text>Latitude: {coords.lat}</Text>
        <Text>Longitude: {coords.lng}</Text>
    </>;

    function pickOnMapHandler() {
        navigation.navigate("Map");
    };

    return (
        <View>
            <View style={styles.mapPreview} >
                {coordsMessage}
            </View>
            <View style={styles.actions} >
                <OutlinedButton onPress={getLocationHandler} icon="location" >Locate User</OutlinedButton>
                <OutlinedButton onPress={pickOnMapHandler} icon="map" >Pick on Map</OutlinedButton>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        width: "100%",
        height: 200,
        marginVertical: 8,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Colors.primary100,
        borderRadius: 4
    },
    actions: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    }
});