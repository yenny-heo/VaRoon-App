import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';
import { VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryArea } from 'victory-native';

export default class EyemovementChart extends React.Component {

    state = {
        choosenLabel: '',
        choosenIndex: '',
        LRight: 0,
        LRightUp: 0,
        LUp: 0,
        LLeftUp: 0,
        LLeft: 0,
        LLeftDown: 0,
        LDown: 0,
        LRightDown: 0,

        RRight: 0,
        RRightUp: 0,
        RUp: 0,
        RLeftUp: 0,
        RLeft: 0,
        RLeftDown: 0,
        RDown: 0,
        RRightDown: 0,
    };

    componentDidMount() {
        this._getData();
    }
    _getData = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: 'http://15.164.220.109/Api/MediBoard/RangeChart',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.props.screenProps.token
                }
            })
                .then(json => { return json.data })
                .catch(err => { console.log("failed", err) });
            this.setState({ data: data });
        } catch (err) {
            console.log(err);
        }
    }

    _renderDates = () => {
        const dates = this.state.data.map((data, index) => {
            return <Picker.Item key={index} label={data.date} value={data.date} />
        })
        return dates;
    }

    _valueChange = (itemValue, itemIndex) => {
        this.setState({ choosenDate: itemValue, choosenIndex: itemIndex });
        const { leftRange, rightRange } = this.state.data[itemIndex];
        this.setState({
            LRight: leftRange.down,
            LRightUp: leftRange.rightUp,
            LUp: leftRange.up,
            LLeftUp: leftRange.leftUp,
            LLeft: leftRange.left,
            LLeftDown: leftRange.leftDown,
            LDown: leftRange.down,
            LRightDown: leftRange.rightDown,

            RRight: rightRange.down,
            RRightUp: rightRange.rightUp,
            RUp: rightRange.up,
            RLeftUp: rightRange.leftUp,
            RLeft: rightRange.left,
            RLeftDown: rightRange.leftDown,
            RDown: rightRange.down,
            RRightDown: rightRange.rightDown,

        })
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}> Eye Movement </Text>
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
                                    { x: '우', y: this.state.LRight },
                                    { x: '우상', y: this.state.LRightUp },
                                    { x: '상', y: this.state.LUp },
                                    { x: '좌상', y: this.state.LLeftUp },
                                    { x: '좌', y: this.state.LLeft },
                                    { x: '좌하', y: this.state.LLeftDown },
                                    { x: '하', y: this.state.LDown },
                                    { x: '우하', y: this.state.LRightDown },
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
                                { x: '우', y: this.state.RRight },
                                { x: '우상', y: this.state.RRightUp },
                                { x: '상', y: this.state.RUp },
                                { x: '좌상', y: this.state.RLeftUp },
                                { x: '좌', y: this.state.RLeft },
                                { x: '좌하', y: this.state.RLeftDown },
                                { x: '하', y: this.state.RDown },
                                { x: '우하', y: this.state.RRightDown },
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
                <View style={styles.container2}>
                    {this.state.data ?
                        <Picker style={styles.pickerStyle}
                            selectedValue={this.state.choosenDate}
                            onValueChange={(itemValue, itemIndex) => this._valueChange(itemValue, itemIndex)}>
                            {this._renderDates()}
                        </Picker>
                        : <Text>Loading</Text>}
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
    container2: {
        width: '100%',
        alignItems: 'center'
    },
    container3: {
        flexDirection: 'row',
        marginTop: -65
    },
    chartTitle: {
        fontSize: 30,
        color: "#2741a1",
        fontWeight: "300",
        marginTop: 40,
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
    },
    pickerStyle: {
        height: 150,
        width: 200,
        color: '#5276F6',
        justifyContent: 'center',
    }
})