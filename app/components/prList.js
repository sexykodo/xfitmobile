/* official */
import React, { Component } from 'react'
import { View, ListView, StyleSheet, Text, Dimensions, TouchableHighlight, PixelRatio} from 'react-native'

/* 3rd party */
import Spinner from 'react-native-loading-spinner-overlay';

/* personal */
const windowSize = Dimensions.get('window');
import PRDetail from './prDetail'

export default class PRList extends Component {
    setDataSource(items) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        return items ? ds.cloneWithRows(items) : ds
    }
    goToDetail (item) {
        this.props.navigator.push({
            component: PRDetail,
            passProps: {
                data: item
            }
        })
    }
    renderContent() {
        if (!this.props.dataSource) {
            return null
        } else if (this.props.dataSource.length > 0) {
            return (
                <ListView
                    dataSource={this.setDataSource(this.props.dataSource)}
                    renderRow={this.renderElement}
                    enableEmptySections={true}
                    />
            )
        }
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Nessun elemento</Text>
            </View>
        )
    }
    renderElement = (item) => {
        return (
            <TouchableHighlight
                style={styles.row}
                underlayColor="#D0D0D0"
                onPress={() => this.goToDetail(item)}>
                <Text style={styles.buttonText}>
                    {item.skill ? item.skill.name : 'no skill.. :('}: {item.value} {item.measure} il {(new Date(item.earned)).toLocaleDateString()}
                </Text>
            </TouchableHighlight>
        )
    }
    render() {
        return (
            <View>
                <Spinner visible={this.props.isLoading} />
                {this.renderContent()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    emptyContainer: {
        height: windowSize.height - 110,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        fontSize: 20
    },
    row: {
        padding: 15,
        backgroundColor: 'white',
        borderBottomWidth: 1 / PixelRatio.get(),
        borderBottomColor: '#CDCDCD',
    },
    rowText: {
        fontSize: 17,
    },
    buttonText: {
        fontSize: 17,
        fontWeight: '500',
    },
});
