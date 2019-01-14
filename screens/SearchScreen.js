import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../components/UI/index';
import DateTimePicker from 'react-native-modal-datetime-picker'; 
// import Icon from 'react-native-vector-icons/Ionicons';

class SearchScreen extends Component {
    state = {
        isDateTimePickerVisible: false,
        returnOption: true
    }

    showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });
 
    hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });
 
    handleDatePicked = (date) => {
        console.log('A date has been picked: ', date);
        this.hideDateTimePicker();
    };

    selectOneway = () => {
        this.setState({ returnOption: false })
    }

    selectReturn = () => {
        this.setState({ returnOption: true })
    }


    renderReturn = () => {
        if(this.state.returnOption) {
            return (
                <CardSection>
                    <TouchableOpacity style= {styles.containerStyle} onPress={this.showDateTimePicker}>
                        <Text style= {styles.datePickerStyle}>Return</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </CardSection>
            )
        }
    }

    render() {
        return (
            <Card>
                <CardSection>
                    <Button text='Return' onPress={this.selectReturn} selected={this.state.returnOption}/>
                    <Button text='One way' onPress={this.selectOneway} selected={!this.state.returnOption}/>
                </CardSection>

                <CardSection>
                    <Input
                        label='From'
                        placeholder='Fliying from'
                        // onChangeText={this.onEmailChange.bind(this)}
                        // value={this.props.email}
                    />
                </CardSection>
                <CardSection>
                    <Input
                        label='To'
                        placeholder='Fliying to'
                        // onChangeText={this.onPasswordChange.bind(this)}
                        // value={this.props.password}
                    />
                    
                </CardSection>

                <CardSection>
                    <TouchableOpacity style= {styles.containerStyle}  onPress={this.showDateTimePicker}>
                        <Text style= {styles.datePickerStyle}>Depart</Text>
                    </TouchableOpacity>
                    <DateTimePicker
                        isVisible={this.state.isDateTimePickerVisible}
                        onConfirm={this.handleDatePicked}
                        onCancel={this.hideDateTimePicker}
                    />
                </CardSection>
                    
                {this.renderReturn()}

                <CardSection>
                    <Button text='Search' />
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    datePickerStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1

    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    }
}

export default SearchScreen