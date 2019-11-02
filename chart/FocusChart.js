import React from 'react';
import { StyleSheet, View, Text, Picker } from 'react-native'
import axios from 'axios';
import { VictoryChart, VictoryTheme, VictoryBar, VictoryLabel, VictoryAxis } from 'victory-native';


export default class Focus extends React.Component {
    state = {
        StartDate: '',
        EndDate: '',
        StartIndex: '',
        EndIndex: '',
        focusData: [{x:10, y:0}]
    }

    componentDidMount() {
        this._getData();
    }
    _getData = async () => {
        try {
            const data = await axios({
                method: 'get',
                url: 'http://15.164.220.109/Api/MediBoard/FocusChart',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-AUTH-TOKEN': this.props.screenProps.data.token
                }
            })
                .then(json => { return json.data.playLogList })
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

    _renderEndDates = () => {//시작날짜 뒤의 4개의 날짜를 렌더링 (내림차순)
        const { rawData, StartIndex } = this.state;
        if (StartIndex == '') return <Picker.Item key={-1} label="끝 날짜" value=""></Picker.Item>
        const dates = [];
        for (var i = 0; i < 4; i++)
            if(StartIndex - 4 + i >= 0)
                dates.push(<Picker.Item key={i} label={rawData[StartIndex - 4 + i].date} value={rawData[StartIndex - 4 + i].date} />);
        return dates;
    }
    _startValue = (itemValue, itemIndex) => {
        if (itemIndex == 0) return;
        this.setState({ StartDate: itemValue, StartIndex: itemIndex });
        if (this.state.EndIndex == '') return;
        const focusData = [];
        for (var i = itemIndex - 1; itemIndex >= 4
            ? i >= itemIndex - 1 - (4 - this.state.EndIndex) : i >= this.state.EndIndex - 1 ; i--) {
            const { date, focus } = this.state.rawData[i];
            focusData.push({
                x:date,
                y:focus
            });
        }
        this.setState({ focusData: focusData });
    }

    _endValue = (itemValue, itemIndex) => {
        if (itemIndex == 0) return;
        this.setState({ EndDate: itemValue, EndIndex: itemIndex })
        if (this.state.StartIndex == '') return;
        const focusData = [];
        // const rightData = [];
        for (var i = this.state.StartIndex - 1; this.state.StartIndex >= 4
            ? i >= this.state.StartIndex - 1 - (4 - itemIndex) : i >= itemIndex - 1; i--) {
            const { date, focus } = this.state.rawData[i];
            focusData.push({
                x:date,
                y:focus
            });
            // rightData.push({
            //     x:date,
            //     y:rightFocus,
            //     z:`(${Math.round(rightPd.horizontal)},${Math.round(rightPd.vertical)})`
            // });
        }
        this.setState({ focusData: focusData });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.chartTitle}>
                    <Text style={{ fontWeight: 'bold' }}>{this.props.screenProps.data.name}</Text>
                    <Text>님의 집중도차트 </Text>
                </Text>
                <View style={[styles.container2, { marginTop: 20, marginBottom: -40 }]}>
                        <View style={styles.smallBox1}/>
                        <Text style={{fontWeight: '200'}}>:집중도(%) </Text>
                </View>
                <VictoryChart minDomain={{ x: 0.5 }}
                    domain={{ y: [0, 100]}}
                    height={300}
                    width={382}
                    theme={VictoryTheme.material}
                    domainPadding={10}
                    animate={{
                        onLoad: { duration: 600 }
                      }}
                >
                     <VictoryAxis dependentAxis
                    tickFormat={(tick) => `${tick}%`}
                    />
                    <VictoryAxis
                    />
                    <VictoryBar
                        data={this.state.focusData}
                        style={{
                            data: {fill: "#4b74ff"}
                        }}
                        barWidth= {30}
                        labelComponent={<VictoryLabel></VictoryLabel>}
                        labels={({datum}) => String(Math.round(datum.y))+"%"}
                    />
                    {/* <VictoryBar
                        data={this.state.rightData}
                        style={{
                            data: {fill: "#a5b9ff"}
                        }}
                        barWidth= {30}
                        alignment="start"
                        labelComponent={<VictoryLabel textAnchor='start'></VictoryLabel>}
                        labels={({datum}) => datum.z}
                    /> */}
                </VictoryChart>
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
        flexDirection: 'row'
    },
    container4: {
        width: '100%',
        alignItems: 'center'
    },
    chartTitle: {
        fontSize: 25,
        fontWeight: '200'
    },
    smallBox1: {
        height: 12,
        width: 12,
        marginTop: 2,
        backgroundColor: '#4b74ff'
    },
    smallBox2: {
        height: 12,
        width: 12,
        marginTop: 2,
        backgroundColor: '#a5b9ff'
    },
    dateText: {
        marginTop: 10,
        fontSize: 30,
        color: '#a8a8a8',
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