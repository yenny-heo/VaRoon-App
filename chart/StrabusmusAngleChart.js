import React from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native';
import axios from 'axios';
import { VictoryChart, VictoryTheme, VictoryScatter } from 'victory-native';
import { LinearGradient } from "expo-linear-gradient";

export default class StrabismusAngleChart extends React.Component {

    state = {
        StartDate: '',
        StartIndex: '',
        EndDate: '',
        EndIndex: '',
        leftData: [{ x: 100, y: 100 }],
        rightData: [{ x: 100, y: 100 }]

    }

    componentDidMount() {
        this._getData();
    }

    _getData = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: 'http://15.164.220.109/Api/MediBoard/PDChart',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.props.screenProps.data.token
                }
            })
                .then(json => { return json.data })
                .catch(err => { console.log("failed", err) });
            this.setState({ rawData: data.slice(0).reverse() });
        } catch (err) {
            console.log(err);
        }
    }

    _renderStartDates = () => {
        const dates = this.state.rawData.map((data, index) => {
            return <Picker.Item key={index} label={data.date} value={data.date} />
        })
        return dates;
    }

    _renderEndDates = () => {//시작날짜 뒤의 5개의 날짜를 렌더링 (내림차순)
        const { rawData, StartIndex } = this.state;
        if (StartIndex == '') return <Picker.Item label="끝 날짜" value=""></Picker.Item>
        const dates = [];
        for (var i = 0; i < 5; i++)
            if (StartIndex - 5 + i >= 0)
                dates.push(<Picker.Item key={i} label={rawData[StartIndex - 5 + i].date} value={rawData[StartIndex - 5 + i].date} />);

        return dates;
    }

    _startValue = (itemValue, itemIndex) => {
        if (itemIndex == 0) return;
        this.setState({ StartDate: itemValue, StartIndex: itemIndex })
        if (this.state.EndIndex == '') return;
        const leftData = [];
        const rightData = [];
        if (itemIndex >= 5)
            for (var i = itemIndex - 1 - (5 - this.state.EndIndex); i <= itemIndex - 1; i++) {
                leftData.push({
                    x: this.state.rawData[i].leftPD.horizontal,
                    y: this.state.rawData[i].leftPD.vertical
                });
                rightData.push({
                    x: this.state.rawData[i].rightPD.horizontal,
                    y: this.state.rawData[i].rightPD.vertical
                });
            }
        else
            for (var i = this.state.EndIndex - 1; i <= itemIndex - 1; i++) {
                leftData.push({
                    x: this.state.rawData[i].leftPD.horizontal,
                    y: this.state.rawData[i].leftPD.vertical
                });
                rightData.push({
                    x: this.state.rawData[i].rightPD.horizontal,
                    y: this.state.rawData[i].rightPD.vertical
                });
            }
        this.setState({ leftData: leftData, rightData: rightData });


    }
    _endValue = (itemValue, itemIndex) => {
        if (itemIndex == 0) return;
        this.setState({ EndDate: itemValue, EndIndex: itemIndex })
        if (this.state.StartIndex == '') return;
        const leftData = [];
        const rightData = [];
        if (this.state.StartIndex >= 5)
            for (var i = this.state.StartIndex - 1 - (5 - itemIndex); i <= this.state.StartIndex - 1; i++) {
                leftData.push({
                    x: this.state.rawData[i].leftPD.horizontal,
                    y: this.state.rawData[i].leftPD.vertical
                });
                rightData.push({
                    x: this.state.rawData[i].rightPD.horizontal,
                    y: this.state.rawData[i].rightPD.vertical
                });
            }
        else
            for (var i = itemIndex - 1; i <= this.state.StartIndex - 1; i++) {
                leftData.push({
                    x: this.state.rawData[i].leftPD.horizontal,
                    y: this.state.rawData[i].leftPD.vertical
                });
                rightData.push({
                    x: this.state.rawData[i].rightPD.horizontal,
                    y: this.state.rawData[i].rightPD.vertical
                });
            }
        this.setState({ leftData: leftData, rightData: rightData });
    }
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.screenProps.data.name}</Text>
                    <Text>님의 사시각차트 </Text>
                </Text>

                <View style={[styles.container2, { marginBottom: -40, marginTop: 20 }]}>
                    <Text > 과거 </Text>
                    <LinearGradient
                        colors={['#ffffff', '#4b74ff']}
                        style={styles.chartTag}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 1 }}>
                    </LinearGradient>
                    <Text > 최근 </Text>
                </View>

                <View style={styles.container2}>
                    <View style={{ marginRight: -80 }}>
                        <VictoryChart
                            theme={VictoryTheme.material}
                            width={260}
                            height={260}
                            domain={{ x: [-10, 10], y: [-10, 10] }}
                        >
                            <VictoryScatter
                                style={{
                                    data: {
                                        fill: "#4b74ff",
                                        fillOpacity: ({ index }) => 1.0 - (index * 0.2)
                                    }
                                }}
                                size={7}
                                data={this.state.leftData}
                                animate={{
                                    onLoad: { duration: 700 }
                                  }}
                            />

                        </VictoryChart>
                    </View>
                    <VictoryChart
                        theme={VictoryTheme.material}
                        width={260}
                        height={260}
                        domain={{ x: [-10, 10], y: [-10, 10] }}
                    >
                        <VictoryScatter
                            style={{
                                data: {
                                    fill: "#4b74ff",
                                    fillOpacity: ({ index }) => 1.0 - (index * 0.2)
                                }
                            }}
                            size={7}
                            data={this.state.rightData}
                            animate={{
                                onLoad: { duration: 700 }
                              }}
                        />
                    </VictoryChart>
                </View>
                <View style={styles.container3}>
                    <Text style={styles.chartContents}> 좌안 </Text>
                    <Text style={styles.chartContents}> 우안 </Text>
                </View>


                <View style={styles.container4}>
                    {this.state.rawData ?
                        <View style={styles.container2}>
                            <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle}
                                selectedValue={this.state.StartDate}
                                onValueChange={(itemValue, itemIndex) => this._startValue(itemValue, itemIndex)}>
                                <Picker.Item label='시작 날짜' value='' />
                                {this._renderStartDates()}
                            </Picker>
                            <Text style={styles.dateText}>~</Text>
                            <Picker style={styles.pickerStyle} itemStyle={styles.itemStyle}
                                selectedValue={this.state.EndDate}
                                onValueChange={(itemValue, itemIndex) => this._endValue(itemValue, itemIndex)}>
                                <Picker.Item label='끝 날짜' value='' />
                                {this._renderEndDates()}
                            </Picker>
                        </View>
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
    },
    container3: {
        flexDirection: 'row',
        marginTop: -30
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
    chartTag: {
        width: 200,
        height: 10,
    },
    chartContents: {
        fontSize: 20,
        color: "#2e2e2e",
        fontWeight: "300",
        marginLeft: 70,
        marginRight: 70,
    },
    dateText: {
        marginTop: 10,
        fontSize: 30,
        color: "#a8a8a8",
        fontWeight: '200'
    },
    pickerStyle: {
        height: 60,
        width: 150,
        justifyContent: 'center',
    },
    itemStyle: {
        height: 60,
    }
})