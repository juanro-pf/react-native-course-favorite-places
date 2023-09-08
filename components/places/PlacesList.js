import { FlatList } from "react-native";
import { StyleSheet, View, Text } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";
import { useNavigation } from "@react-navigation/native";

export default function PlacesList({ places }) {

    const navigation = useNavigation();

    function selectPlaceHandler(id) {
        navigation.navigate("PlaceDetails", {
            placeId: id
        });
    };

    if(!places?.length) {
        return(
            <View style={styles.fallbackContainer} >
                <Text style={styles.fallbackText} >No places added yet - Start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <PlaceItem onSelect={selectPlaceHandler} place={item} />}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        margin: 24
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200
    }
});