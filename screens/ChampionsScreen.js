import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import axios from 'axios';
import Champion from '../models/champion-models/champion.model';
import Stats from '../models/champion-models/stats.model';
import Info from '../models/champion-models/info.model'
import Image from '../models/champion-models/image.model'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';
export default function ChampionScreen(props) {

    const [champs, setChampions] = useState([]);
    const [count, setCount] = useState(0);
    const championsObjects = [];
    const championList = [];

    const collectChampionList = (champions) => {
        // iterate through champions object properties.
        const list = [];
        Object.values(champions['data']).forEach(c => {
            list.push(c);
        });
        // iterate through 'data' object property, which are champions
        Object.values(list[3]).forEach(c => {
            championsObjects.push(c);
        });
    }

    // fetching data from dataDragon api with axios
    async function fetchData() {
        const url = 'https://ddragon.leagueoflegends.com/cdn/6.24.1/data/en_US/champion.json';
        const result = await axios(url);
        collectChampionList(result);
        createChampionObjectList(championsObjects);
    }
    useEffect(() => {
        fetchData();
    }, []);


    const createChampionObjectList = (champions) => {
        for (const champion of champions) {
            const champ = createChampionObject(champion);
            championList.push(champ);
        }
        setChampions(championList);
        setCount(championList.length);
    }

    const createChampionObject = (champion) => {
        const image = 'image';
        const info = 'info';
        const key = 'key';
        const name = 'name';
        const partype = 'partype';
        const stats = 'stats';
        const tags = 'tags';
        const title = 'title';
        const version = 'version';
        const id = 'id';
        const blurb = 'blurb';
        return new Champion(
            createImage(champion[image]),
            createInfo(champion[info]),
            champion[key],
            champion[name],
            champion[partype],
            createStats(champion[stats]),
            champion[tags],
            champion[title],
            champion[version],
            champion[id],
            champion[blurb]
        );
    }

    const createInfo = (info) => {
        const attack = 'attack';
        const defense = 'defense';
        const difficulty = 'difficulty';
        const magic = 'magic';
        return new Info(info[attack], info[defense], info[difficulty], info[magic]);
    }

    const createStats = (stats) => {
        const armor = 'armor';
        const armorperlevel = 'armorperlevel';
        const attackdamage = 'attackdamage';
        const attackdamageperlevel = 'attackdamageperlevel';
        const attackrange = 'attackrange';
        const attackspeedoffset = 'attackspeedoffset';
        const attackspeedperlevel = 'attackspeedperlevel';
        const crit = 'crit';
        const critperlevel = 'critperlevel';
        const hp = 'hp';
        const hpperlevel = 'hpperlevel';
        const hpregen = 'hpregen';
        const hpregenperlevel = 'hpregenperlevel';
        const movespeed = 'movespeed';
        const mp = 'mp';
        const mpperlevel = 'mpperlevel';
        const mpregen = 'mpregen';
        const mpregenperlevel = 'mpregenperlevel';
        const spellblock = 'spellblock';
        const spellblockperlevel = 'spellblocklevel';
        return new Stats(
            stats[armor],
            stats[armorperlevel],
            stats[attackdamage],
            stats[attackdamageperlevel],
            stats[attackrange],
            stats[attackspeedoffset],
            stats[attackspeedperlevel],
            stats[crit],
            stats[critperlevel],
            stats[hp],
            stats[hpperlevel],
            stats[hpregen],
            stats[hpregenperlevel],
            stats[movespeed],
            stats[mp],
            stats[mpperlevel],
            stats[mpregen],
            stats[mpregenperlevel],
            stats[spellblock],
            stats[spellblockperlevel]
        );
    }

    const createImage = (image) => {
        const full = 'full';
        const group = 'group';
        const sprite = 'sprite';
        return new Image(image[full], image[group], image[sprite]);
    }

    /**
      * @param id find champion by id
      */
    const findChampion = (id) => {
        returnchampionList.find(
            c => c.id === id);
    }

    // render a list of champion blurb text 
    const cs = champs.map((c, index) => {
        return (
            <View style={styles.championContainer} key={index}>
                <Text >{c.blurb}</Text>
            </View>
        )
    })

    const renderChampionList = (champion) => {
        return (
            <ListItem
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} //
                title={champion.name}
                subtitle={champion.title}
                leftAvatar={{ rounded: true, source: { uri: `https://ddragon.leagueoflegends.com/cdn/6.24.1/img/champion/${champion.image.full}` } }}
                bottomDivider
                chevron
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'ChampionDetail',
                        params: {
                            championName: champion.name,
                            champions: champs
                        }
                    })
                }}

            />
        )
    }
    return (
        <FlatList data={champs}
            //convert index to string
            keyExtractor={(item, index) => '' + index}
            // numColumns={2}
            // extract item from object
            renderItem={({ item }) => renderChampionList(item)}

        />
    );
}




ChampionScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Champions',
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
    championContainer: {
        width: '80%',
        height: 150,
        backgroundColor: '#d7d7a3',
        marginBottom: 10,
        alignContent: 'space-between'
    }
});

