import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryScatter } from 'victory-native';

export default class StrabismusAngleChart extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}> Strabismus Angle </Text>
                <View style={styles.container2}>
                    <Text style={styles.date}> 📆 측정일 2019.09.23 </Text>
                </View>
                <View style={styles.container3}>
                    <View style={{marginRight:-60}}>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={260}
                    height={260}
                    domain={{x:[-5,5], y:[-5,5]}}
                >
                    <VictoryScatter
                        style={{ 
                            data: { fill: "#5276F6",
                            fillOpacity: ({index}) => 1.0 - (index*0.3) }
                        }}
                        size={7}
                        data={[
                            { x: 1, y: 2 },
                            { x: 2, y: 3 },
                            { x: 3, y: 5 }
                        ]}
                    />

                </VictoryChart> 
                </View>
                <VictoryChart
                    theme={VictoryTheme.material}
                    width={260}
                    height={260}
                    domain={{x:[-2,2], y:[-2,2]}}
                >
                    <VictoryScatter
                        style={{ 
                            data: { fill: "#5276F6",
                            fillOpacity: ({index}) => 1.0 - (index*0.3) }
                        }}
                        size={7}
                        data={[
                            { x: 0, y: 0 },
                            { x: -0.2, y: -0.6 },
                            { x: 0, y: -1 }
                        ]}
                    />
                </VictoryChart>
                </View>
                <View style={styles.container3}>
                    <Text style={styles.chartContents}> left eye </Text>
                    <Text style={styles.chartContents}> right eye </Text>
                </View>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    container2: {
        width: '100%',
        marginTop: 70,
        marginLeft: 30,
        alignItems: 'flex-start'
    },
    container3: {
        flexDirection: 'row',
        marginTop: -20
    },
    chartTitle: {
        fontSize: 30,
        color: "#2741a1",
        fontWeight: "300",
        marginTop: 30
    },
    date: {
        fontSize: 15,
        color: "#5276F6",
        fontWeight: "500"
    },
    chartContents: {
        fontSize: 20,
        color: "#5276F6",
        fontWeight: "300",
        marginLeft: 55,
        marginRight: 55,
    },
})