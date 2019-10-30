import React from 'react';
import { StyleSheet, Text, View, Picker } from 'react-native';
import axios from 'axios';
import { VictoryChart, VictoryTheme, VictoryPolarAxis, VictoryArea, VictoryLine } from 'victory-native';

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
                    'X-AUTH-TOKEN': this.props.screenProps.data.token
                }
            })
                .then(json => { return json.data; })
                .catch(err => { console.log("failed", err) });
            this.setState({ data: data.slice(0).reverse() });//내림차순으로 저장
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
        if (itemIndex != 0) {
            this.setState({ choosenDate: itemValue, choosenIndex: itemIndex - 1 });
            const { leftRange, rightRange } = this.state.data[itemIndex - 1];
            this.setState({
                LRight: leftRange.right,
                LRightUp: leftRange.rightUp,
                LUp: leftRange.up,
                LLeftUp: leftRange.leftUp,
                LLeft: leftRange.left,
                LLeftDown: leftRange.leftDown,
                LDown: leftRange.down,
                LRightDown: leftRange.rightDown,

                RRight: rightRange.right,
                RRightUp: rightRange.rightUp,
                RUp: rightRange.up,
                RLeftUp: rightRange.leftUp,
                RLeft: rightRange.left,
                RLeftDown: rightRange.leftDown,
                RDown: rightRange.down,
                RRightDown: rightRange.rightDown,

            })
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.screenProps.data.name}</Text>
                    <Text>님의 안구운동차트</Text>
                </Text>
                <View style={{flexDirection: 'row', marginTop: 20, marginBottom: -30}}>
                        <View style={styles.smallBox1}/>
                        <Text style={{fontWeight: '200'}}>:평균값 </Text>
                        <View style={styles.smallBox2}/>
                        <Text style={{fontWeight: '200'}}>:측정값 </Text>
                </View>
                <View style={styles.container2}>
                    <View style={{ marginRight: -60 }}>
                        <VictoryChart polar
                            theme={VictoryTheme.material}
                            width={240}
                            domain={{y: [0, 11]}}
                            animate={{
                                onLoad: { duration: 600 }
                              }}>
                            <VictoryPolarAxis dependentAxis
                                style={{ axis: { stroke: "none" } }}
                                tickFormat={() => null}
                            />
                            <VictoryPolarAxis />
                            <VictoryLine
                                style={{ 
                                    data: { stroke: "#4b74ff", strokeWidth: 1 } 
                                }}
                                data={[
                                    { x: '우', y: 9 },
                                    { x: '우상', y: 10 },
                                    { x: '상', y: 7 },
                                    { x: '좌상', y: 6 },
                                    { x: '좌', y: 6.5 },
                                    { x: '좌하', y: 6 },
                                    { x: '하', y: 8 },
                                    { x: '우하', y: 9 },
                                ]}
                            />
                            <VictoryArea
                                style={{
                                    data: { fill: "#4b74ff", fillOpacity: 0.7, strokeWidth: 1 }
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
                        width={240}
                        domain={{y: [0, 11]}}
                        animate={{
                            onLoad: { duration: 600 }
                          }}>
                        <VictoryPolarAxis dependentAxis
                            style={{ axis: { stroke: "none" } }}
                            tickFormat={() => null}
                        />
                        <VictoryPolarAxis />
                        <VictoryLine
                                style={{ 
                                    data: { stroke: "#4b74ff", strokeWidth: 1 } 
                                }}
                                data={[
                                    { x: '우', y: 8 },
                                    { x: '우상', y: 7 },
                                    { x: '상', y: 7 },
                                    { x: '좌상', y: 8 },
                                    { x: '좌', y: 9 },
                                    { x: '좌하', y: 6 },
                                    { x: '하', y: 7.5 },
                                    { x: '우하', y: 10 },
                                ]}
                            />
                        <VictoryArea
                            style={{
                                data: { fill: "#4b74ff", fillOpacity: 0.7, strokeWidth: 1 },
                            }}
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
                        />
                    </VictoryChart>
                </View>
                <View style={styles.container3}>
                    <Text style={styles.chartContents}> 좌안 </Text>
                    <Text style={styles.chartContents}> 우안 </Text>
                </View>
                <View style={styles.container4}>
                    {this.state.data ?
                        <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle}
                            selectedValue={this.state.choosenDate}
                            onValueChange={(itemValue, itemIndex) => this._valueChange(itemValue, itemIndex)}>

                            <Picker.Item label='측정 날짜' value='' />
                            {this._renderDates()}
                        </Picker>
                        : <Text>Date Loading</Text>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    container2: {
        flexDirection: 'row',
        marginTop: -50
    },
    container3: {
        flexDirection: 'row',
        marginTop: -70
    },
    container4: {
        width: '100%',
        alignItems: 'center',
        marginTop: 40
    },
    chartTitle: {
        fontSize: 25,
        fontWeight: "200"
    },
    smallBox1: {
        height: 12,
        width: 12,
        marginTop: 2,
        borderWidth: 1,
        borderColor: '#4b74ff',
        borderRadius: 45
    },
    smallBox2: {
        height: 12,
        width: 12,
        marginTop: 2,
        backgroundColor: '#4b74ff80',
        borderWidth: 1,
        borderColor: '#4b74ff',
        borderRadius: 45
    },
    chartContents: {
        fontSize: 20,
        color: "#2e2e2e",
        fontWeight: "300",
        marginLeft: 70,
        marginRight: 70,
    },
    pickerStyle: {
        height: 60,
        width: 200,
        justifyContent: 'center',
    },
    itemStyle: {
        height: 60,
    }
})