import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../components/UI/index';
import DateTimePicker from 'react-native-modal-datetime-picker'; 
// import Icon from 'react-native-vector-icons/Ionicons';

class SearchScreen extends Component {
    state = {
        isDateTimePickerVisible: false,
        returnOption: true,
        showPassengerOptions: false,
        passengers: {
            adult: 1,
            child: 0,
            infant: 0
        }
    }

    showDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: true });
    }
 
    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false });
    }
 
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

    togglePassengers = () => {
        this.setState({ showPassengerOptions: !this.state.showPassengerOptions })
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

    addPassenger = (passenger) => {
        if(passenger == 'adult') {
            this.setState({ passengers: { ...this.state.passengers, adult: this.state.passengers.adult + 1} })
        } else if (passenger == 'child') {
            this.setState({ passengers: { ...this.state.passengers, child: this.state.passengers.child + 1} })
        } else if (passenger == 'infant') {
            this.setState({ passengers: { ...this.state.passengers, infant: this.state.passengers.infant + 1} })
        }
    }

    removePassenger = (passenger) => {
        if(passenger == 'adult' && this.state.passengers.adult > 1) {
            this.setState({ passengers: { ...this.state.passengers, adult: this.state.passengers.adult - 1} })
        } else if (passenger == 'child' && this.state.passengers.child > 0) {
            this.setState({ passengers: { ...this.state.passengers, child: this.state.passengers.child - 1} })
        } else if (passenger == 'infant' && this.state.passengers.infant > 0) {
            this.setState({ passengers: { ...this.state.passengers, infant: this.state.passengers.infant - 1} })
        }
    }

    renderPassengerOptions = () => {
        if(this.state.showPassengerOptions) {
            return (
                <Card>
                    <CardSection>
                        <Text style= {styles.datePickerStyle}>{this.state.passengers.adult} Adult</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.addPassenger('adult')}>+</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.removePassenger('adult')}>-</Text> 
                    </CardSection>  
                    <CardSection>
                        <Text style= {styles.datePickerStyle}>{this.state.passengers.child} Child</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.addPassenger('child')}>+</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.removePassenger('child')}>-</Text> 
                    </CardSection> 
                    <CardSection>
                        <Text style= {styles.datePickerStyle}>{this.state.passengers.infant} Infant</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.addPassenger('infant')}>+</Text>
                        <Text style= {styles.datePickerStyle} onPress={() => this.removePassenger('infant')}>-</Text> 
                    </CardSection>   
                </Card>
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
                    <TouchableOpacity style= {styles.containerStyle} onPress={this.togglePassengers}>
                        <Text style= {styles.datePickerStyle}>Passengers</Text>
                    </TouchableOpacity>    
                </CardSection>

                {this.renderPassengerOptions()}

                <CardSection>
                    <Button text='Search Flights' />
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