import React from 'react';
import { ScrollView, StyleSheet, View, Text, Image, FlatList } from 'react-native';



export default function ItemDetailScreen(props) {
    const items = props.navigation.getParam('items');
    const name = props.navigation.getParam('itemName');
    const item = items.filter(item => item.name === name)[0];

    const renderTags = tag => {
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
                    <View style={styles.imageContainer}>
                        <Text style={styles.header}>Gold</Text>
                        <Image
                            source={{ uri: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.image.full}` }}
                            style={styles.image}
                        />
                    </View>
                    <Text>Base: {item.gold.base}</Text>
                    <Text>Sell: {item.gold.sell}</Text>
                    <Text>Total: {item.gold.total}</Text>
                </View>


                <View style={styles.card}>
                    <View style={styles.category}>
                        <Text style={styles.header}>Categories</Text>
                        <FlatList
                            data={item.tags}
                            renderItem={({ item }) => renderTags(item)}
                            keyExtractor={(item, index) => '' + index}
                        />
                    </View>
                </View>


            </View>
        </ScrollView>
    );
}

ItemDetailScreen.navigationOptions = navigationData => {
    // const mealId = navigationData.navigation.getParam('mealId');
    const name = navigationData.navigation.getParam('itemName');
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
