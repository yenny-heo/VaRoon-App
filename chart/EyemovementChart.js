import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryArea } from 'victory-native';

export default class EyemovementChart extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}> Eye Movement </Text>
                <View style={styles.container2}>
                    <Text style={styles.date}> 📆 측정일 2019.09.23 </Text>
                </View>
                <View style={styles.container3}>
                    <View style={{ marginRight: -60 }}>
                        <VictoryChart polar
                            theme={VictoryTheme.material}
                            width={240}>
                            <VictoryPolarAxis dependentAxis
                                style={{ axis: { stroke: "none" } }}
                                tickFormat={() => null}
                            />
                            <VictoryPolarAxis />
                            <VictoryArea
                                style={{
                                    data: { fill: "#5276F6", fillOpacity: 0.7, strokeWidth: 2 }
                                }}
                                data={[
                                    { x: '우', y: 1.2 },
                                    { x: '우상', y: 1.3 },
                                    { x: '상', y: 2.6 },
                                    { x: '좌상', y: 3.7 },
                                    { x: '좌', y: 3.5 },
                                    { x: '좌하', y: 1.8 },
                                    { x: '하', y: 2.5 },
                                    { x: '우하', y: 1.7 },
                                ]}
                            />

                        </VictoryChart>
                    </View>
                    <VictoryChart polar
                        theme={VictoryTheme.material}
                        width={240}>
                        <VictoryPolarAxis dependentAxis
                            style={{ axis: { stroke: "none" } }}
                            tickFormat={() => null}
                        />
                        <VictoryPolarAxis />
                        <VictoryArea
                            data={[
                                { x: '우', y: 1.6 },
                                { x: '우상', y: 1.3 },
                                { x: '상', y: 2.8 },
                                { x: '좌상', y: 3.0 },
                                { x: '좌', y: 3.5 },
                                { x: '좌하', y: 1.8 },
                                { x: '하', y: 2.0 },
                                { x: '우하', y: 1.7 },
                            ]}
                            style={{
                                data: { fill: "#5276F6", fillOpacity: 0.7, strokeWidth: 2 },
                            }}
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
        alignItems: 'center',

    },
    container2:{
        width: '100%',
        marginTop: 70,
        marginLeft: 30,
        alignItems: 'flex-start'
        
    },
    container3: {
        flexDirection: 'row',
        marginTop: -65
    },
    chartTitle: {
        fontSize: 30,
        color: "#2741a1",
        fontWeight: "300",
        marginTop: 30,
    },
    chartContents: {
        fontSize: 20,
        color: "#5276F6",
        fontWeight: "300",
        marginLeft: 55,
        marginRight: 55,
    },
    date: {
        fontSize: 15,
        color: "#5276F6",
        fontWeight: "500"
    }
})