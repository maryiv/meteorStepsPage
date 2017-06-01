import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, Switch, ScrollView, TouchableOpacity } from 'react-native';
import { Form, Section } from 'react-native-forms';
import Meteor, { createContainer, MeteorListView } from 'react-native-meteor';
import settings from './config/settings';
import colors from './config/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 20,
        alignItems: 'stretch',
        backgroundColor: colors.backgroundColor,
    },
    loading: {
        flex: 1,
        flexDirection: 'column',
        width: '100%',
        marginBottom: 5,
        justifyContent: 'center',
        textAlign: 'center',
        color: colors.errorText,
    },
    sidebar: {
        flex: 1,
        backgroundColor: colors.sidebarBG,
        padding: 5
    },
    step: {
        flex: 1,
        flexDirection: 'row'
    },
    checkedStep: {
        width: 15,
        height: 15,
        marginRight: 3
    },
    currentStep: {
        width: 15,
        height: 15,
        backgroundColor: colors.stepColor,
        borderRadius: 15,
        marginRight: 3
    },
    uncheckedStep: {
        width: 15,
        height: 15,
        borderColor: colors.stepColor,
        borderWidth: 1,
        borderRadius: 15,
        marginRight: 3
    },
    fill: {
        width: 40,
        height: 40,
        borderRadius: 40,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.fillColor
    },
    content: {
        flex: 2,
        backgroundColor: colors.background,
        padding: 5
    },
    title: {
        fontSize: 17,
        marginBottom: 10
    },
    switchLine: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        marginBottom: 7
    },
    button: {
        padding: 3,
        backgroundColor: colors.buttonBackground,
        borderRadius: 4,
        marginTop: 7
    },
    errorInfo: {
        width: '100%',
        color: colors.errorText,
        justifyContent: 'center'
    }
});

class mobile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: '',
            getFillPercentage: 0,
            haveAnyAssets: false
        };
    }
    componentWillMount() {
        Meteor.connect(settings.SERVER_URL);
    }
    componentDidMount() {
        this.calculateFillPercentage();
    }
    handleSelectOtherStep = (id, time) => {
        Meteor.call('selectOtherStep', id, time, (error, result) => {
            if (error) {
                this.setState({ error: error });
            } else if (result === true) {
                this.calculateFillPercentage();
            }
        });
    };
    calculateFillPercentage = () => {
        Meteor.call('getFillPercentage', (error, result) => {
            if (error) {
                this.setState({ error: error });
            } else {
                this.setState({ getFillPercentage: result });
            }
        });
    };
    renderStep = (step) => {
        let status;
        switch (step.status) {
            case 'checked':
                status = <Image style={styles.checkedStep} source={require('./images/checked.jpg')} />;
                break;
            case 'current':
                status = <View style={styles.currentStep} />;
                break;
            case 'unchecked':
                status = <View style={styles.uncheckedStep} />;
        }
        return <View style={styles.step}>
            {status}
            <Text onPress={() => this.handleSelectOtherStep(step._id, step.createdAt)}>{step.text}</Text>
        </View>;
    };
    handleGoTo = () => {
        //TODO: Realize the necessary logic
    };
    render() {
        const { stepsReady } = this.props;
        return (
            <View style={styles.container}>
                <View style={styles.sidebar}>
                    {!stepsReady ? <Text style={styles.loading}>Loading...</Text> :
                        <MeteorListView collection="steps" renderRow={(step) => this.renderStep(step)}
                                    enableEmptySections={true} />
                    }
                    {stepsReady && <View style={styles.fill}>
                        <Text style={{color: colors.buttonText}}>{this.state.getFillPercentage}</Text></View>}
                    {this.state.error !== '' && <Text style={styles.errorInfo}>{this.state.error}</Text>}
                </View>
                <View style={styles.content}>
                    <ScrollView>
                        <Text style={styles.title}>Assets and Liabilities</Text>
                        <View style={styles.switchLine}>
                            <Text>Do you have any assets?</Text>
                            <Switch onValueChange={(value) => this.setState({haveAnyAssets: value})}
                                    style={styles.switch} value={this.state.haveAnyAssets} />
                        </View>
                        {this.state.haveAnyAssets && <Form ref={(form) => this.form = form}>
                            <Section title={"ASSET"}>
                                <Text>The form was cut out for brevity</Text>
                            </Section>
                        </Form>}
                        <TouchableOpacity style={styles.button} onPress={this.handleGoTo()}>
                            <Text style={{color: colors.buttonText}}>GO TO ESTATE PLAN PREPAREDNESS</Text>
                        </TouchableOpacity>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

export default createContainer(() => {
    const handle = Meteor.subscribe('steps');
    return {
        stepsReady: handle.ready()
    };
}, mobile);