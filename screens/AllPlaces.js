import { StyleSheet } from "react-native";
import PlacesList from "../components/places/PlacesList";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { fetchPlaces } from "../util/database";

export default function AllPlaces({ route }) {

    const [loadedPlaces, setLoadedPlaces] = useState([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces();
            setLoadedPlaces(places);
        };
         
        if(isFocused){
            loadPlaces();
            // setLoadedPlaces(prev => [...prev, route.params.place]);
        }       
    }, [isFocused]);
    

    return (
        <PlacesList places={loadedPlaces} />
    );
};

const styles = StyleSheet.create({

});