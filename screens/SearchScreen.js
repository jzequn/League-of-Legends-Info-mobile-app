import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Button, FlatList } from 'react-native';
import { SearchBar } from 'react-native-elements';
import Match from '../models/search-models/match.model'
import Summoner from '../models/search-models/summoner.model'
import axios from 'axios'
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';

import MatchScreen from '../screens/MatchScreen'

export default function SearchScreen(props) {
    const [search, setSearch] = useState('');
    const apiKey = "RGAPI-2358f67f-f55d-4a3b-9f45-71e72aa3490b";
    let summoner;
    const matchList = [];
    const matchObjectList = [];
    const [match, setMatch] = useState([]);

    const updateSearch = searchText => {
        setSearch(searchText);
    }

    const searchSummonerHandler = () => {
        console.log(search)
        fetchSummoner(search)
    }

    async function fetchSummoner(summoner) {
        const url = `https://oc1.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summoner}?api_key=${apiKey}`;
        console.log('summoner text', summoner)
        const result = await axios(url);
        const { data } = result;


        const sum = createSummoner(data);
        fetchMatchList(sum.accountId);
    }

    async function fetchMatchList(encryptedAccoutId) {

        const url = `https://oc1.api.riotgames.com/lol/match/v4/matchlists/by-account/${encryptedAccoutId}?api_key=${apiKey}`;
        const result = await axios(url);

        const { data } = result;
        collectMatchObjectList(data);
        console.log('length', matchObjectList.length)
        for (const match of matchObjectList[0]) {
            const oneMatch = createMatch(match);
            matchList.push(oneMatch);
        }
        setMatch(matchList);
    }


    collectMatchObjectList = (matches) => {
        // iterate through matches object properties.
        Object.values(matches).forEach(match => {
            matchObjectList.push(Object(match));
        });
    }

    createSummoner = (resData) => {
        console.log('create summoner', resData)
        const profileIconId = "profileIconId";
        const name = "name";
        const puuid = "puuid";
        const summonerLevel = "summonerLevel";
        const revisionDate = "revisionDate";
        const id = "id";
        const accountId = "accountId";
        return new Summoner(
            resData[profileIconId],
            resData[name],
            resData[puuid],
            resData[summonerLevel],
            resData[revisionDate],
            resData[id],
            resData[accountId]
        );
    }

    createMatch = (match) => {
        const champion = "champion";
        const gameId = "gameId";
        const lane = "lane";
        const platformId = "platformId";
        const queue = "queue";
        const role = "role";
        const season = "season";
        const timestamp = "timestamp";
        // console.log('timestamp - createMatch()', match[timestamp]);

        return new Match(
            match[champion],
            match[gameId],
            match[lane],
            match[platformId],
            match[queue],
            match[role],
            match[season],
            match[timestamp]
        );
    }

    const renderMatch = (match) => {
        return (
            <View style={styles.cardLayout}>
                <View style={styles.card}>
                    <View style={styles.header}>
                        <Text>Match id: {match.gameId}</Text>
                    </View>
                    <Text>Match lane: {match.lane}</Text>
                    <Text>Match queue: {match.queue}</Text>
                    <Text>Match role: {match.role}</Text>
                    <Text>Match season: {match.season}</Text>
                    <Text>Match time: {match.timestamp}</Text>
                </View>
            </View>
        )
    }

    return (
        <View>
            <SearchBar
                placeholder="Type Here..."
                onChangeText={updateSearch}
                value={search}
            />
            <Button title="Confirm" onPress={() => searchSummonerHandler()} />
            {
                match.length > 0 ? <FlatList data={match} renderItem={({ item }) => renderMatch(item)}
                    keyExtractor={(item, index) => '' + index}
                /> : null
            }
        </View >

    );
}

SearchScreen.navigationOptions = (navData) => {
    // title: 'Search',
    return {
        headerTitle: 'Search',
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
};



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
});
