import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TouchableNativeFeedback, Platform, ActivityIndicator, FlatList } from 'react-native';
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import axios from 'axios';
import ItemOne from '../models/item-models/item.model.ts';
import Stats from '../models/item-models/stats.model.ts';
import Gold from '../models/item-models/gold.model.ts';
import Image from '../models/champion-models/image.model.ts';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';

export default function ItemsScreen(props) {
    const itemList = [];
    const itemObjectList = [];
    const [items, setItems] = useState([]);
    const [count, setCount] = useState(0);


    const collectItemObjectList = (data) => {
        const properties = [];
        const sub_properties = [];
        const sub2_properties = [];
        const sub3_properties = [];
        // iterate through data object properties.
        Object.values(data).forEach(item => {
            properties.push(item);
        });

        // iterate through sub object properties.
        Object.values(properties).forEach(item => {
            sub_properties.push(item);
        });

        // iterate through sub2 object properties.
        Object.values(sub_properties[0]).forEach(item => {
            sub2_properties.push(item);
        });

        Object.values(sub2_properties[3]).forEach(item => {
            itemObjectList.push(item);
        });

    }

    const createItemList = (items) => {
        for (const item of items) {
            const itemObject1 = createItemObject(item);
            itemList.push(itemObject1);
        }
        setItems(itemObjectList);
        setCount(itemList.length);
    }

    const is = items.map((i, index) => {
        return (
            <View style={styles.itemContainer} key={index}>
                <Text>{i.description}</Text>
            </View>
        )
    })

    const createItemObject = (item) => {
        const description = 'description';
        const gold = 'gold';
        const image = 'image';
        const name = 'name';
        const plaintext = 'plaintext';
        const stats = 'stats';
        const tags = 'tags';
        const theItem = new ItemOne(
            item[description],
            createGoldObject(item[gold]),
            createImage(item[image]),
            item[name],
            item[plaintext],
            createStats(item[stats]),
            item[tags]
        );
        return theItem;
    }

    const createGoldObject = (gold) => {
        const base = 'base';
        const purchasable = 'purchasable';
        const sell = 'sell';
        const total = 'total';
        return new Gold(
            gold[base],
            gold[purchasable],
            gold[sell],
            gold[total]
        );
    }

    const createImage = (image) => {
        const full = 'full';
        const group = 'group';
        const sprite = 'sprite';
        return new Image(
            image[full],
            image[group],
            image[sprite]
        );
    }

    const createStats = (stats) => {
        const FlatMovementSpeedMod = 'FlatMovementSpeedMod';
        return new Stats(
            stats[FlatMovementSpeedMod]
        );
    }

    // fetching data from dataDragon api with axios
    async function fetchData() {
        const url = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/item.json';
        const result = await axios(url);
        collectItemObjectList(result);
        createItemList(itemObjectList);
    }
    useEffect(() => {
        fetchData();
        console.log('champion list length not in the callback', itemList.length)
    }, []);

    let TouchableCmp = TouchableOpacity;

    if (Platform.OS === 'android' && Platform.Version >= 21) {
        TouchableCmp = TouchableNativeFeedback;
    }
    const imageUrl = (name) => {
        return `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${name}`;
    }

    const renderItemList = (item) => {
        return (
            <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                title={item.name}
                subtitle={item.plaintext}
                leftAvatar={{ rounded: true, source: { uri: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/item/${item.image.full}` } }}
                bottomDivider
                chevron
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'ItemDetail',

                        params: {
                            itemName: item.name,
                            items: items
                        }
                    })
                }}

            />
        )
    }

    return (
        <FlatList data={items}
            //convert index to string
            keyExtractor={(item, index) => '' + index}
            // extract item from object
            renderItem={({ item }) => renderItemList(item)}

        />
    );
}


ItemsScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Items',
        headerLeft: (
            <HeaderButtons HeaderButtonComponent={HeaderButton}>
                <Item
                    title="Menu"
                    iconName='ios-menu'
                    onPress={() => {
                        navData.navigation.toggleDrawer();
                    }}
                />
            </HeaderButtons>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 15,
        backgroundColor: '#fff',
    },
    itemContainer: {
        width: '100%',
        textAlign: "justify",
        backgroundColor: '#eee',
        marginBottom: 10,
        padding: 30,
        textShadowColor: '#eee',
        textShadowOffset: { width: 5, height: 5 },
        textShadowRadius: 10,
        // border:
        borderRadius: 2,
        shadowOpacity: 0.8,
        shadowOffset: { width: 2, height: 3 },
        shadowColor: '#000',
        borderWidth: 1,
        borderColor: '#ddd',
        elevation: 1,
        borderBottomStartRadius: 0

    },
    itemList: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: '95%'
    }
});
