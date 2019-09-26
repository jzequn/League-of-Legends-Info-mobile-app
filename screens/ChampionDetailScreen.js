import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View, Text, Image, FlatList } from 'react-native';



export default function ChampionDetailScreen(props) {

    const champions = props.navigation.getParam('champions');
    const name = props.navigation.getParam('championName');
    const champion = champions.filter(champion => champion.name === name)[0];

    const renderChampions = tag => {
        return (
            <View>
                <Text>{tag}</Text>
            </View>
        )
    }

    return (
        <ScrollView style={styles.container}>
            {/**
           * Go ahead and delete ExpoLinksView and replace it with your content;
           * we just wanted to provide you with some helpful links.
           */}
            <View style={styles.cardLayout}>
                <View style={styles.card}>
                    {/* <View style={styles.imageContainer}> */}
                    {/* <Image
                            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champion.image.full}` }}
                            style={styles.image}
                        /> */}
                    {/* </View> */}
                    <View style={styles.headerContainer}>
                        <Text style={styles.header}>Story</Text>
                    </View>
                    <Text>{champion.blurb}</Text>
                </View>


                <View style={styles.card}>
                    <View style={styles.category}>
                        <Text style={styles.header}>Info</Text>
                        <Text>Attack: {champion.info.attack}</Text>
                        <Text>Defense: {champion.info.defense}</Text>
                        <Text>Difficulty: {champion.info.difficulty}</Text>
                        <Text>Magic: {champion.info.magic}</Text>
                    </View>
                </View>


            </View>
        </ScrollView>
    );
}

ChampionDetailScreen.navigationOptions = navigationData => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const name = navigationData.navigation.getParam('championName');
    return {
        headerTitle: name,
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',

    },
    cardLayout: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%'
    },
    card: {
        padding: 5,
        width: '100%',
        borderRadius: 2,
        shadowOpacity: 0.8,
        shadowOffset: { width: 2, height: 3 },
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        borderBottomStartRadius: 0,
        marginBottom: 5,
    },
    headerContainer: {
        alignContent: 'center'
    },
    header: {
        fontSize: 20,
        fontWeight: "500",
    },
    imageContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: 'black',
        borderBottomWidth: 0.2,
        paddingBottom: 5,
        paddingEnd: 10
    },
    image: {
        width: 50,
        height: 50,

    },
    category: {
        padding: 5
    }
});
