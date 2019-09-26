import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton';

export default function MatchScreen(props) {
    /**
     * Go ahead and delete ExpoConfigView and replace it with your content;
     * we just wanted to give you a quick view of your config.
     */
    return <ExpoConfigView />;
}

MatchScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Match',
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