import React, { Component } from 'react';
import { TouchableOpacity, ScrollView, Text } from 'react-native';
import { Card, CardSection, Input, Button } from '../components/UI/index';
import DateTimePicker from 'react-native-modal-datetime-picker'; 
// import Icon from 'react-native-vector-icons/Ionicons';

const DATE_OPTIONS = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };

class SearchScreen extends Component {
    state = {
        isDepartureDateTimePickerVisible: false,
        isReturnDateTimePickerVisible: false,
        returnOption: true,
        showPassengerOptions: false,
        passengers: {
            adult: 1,
            child: 0,
            infant: 0
        },
        departureDate: (new Date()).toLocaleDateString('en-US', DATE_OPTIONS),
        returnDate: (new Date()).toLocaleDateString('en-US', DATE_OPTIONS)
    }

    showDepartureDateTimePicker = () => {
        this.setState({ isDepartureDateTimePickerVisible: true });
    }

    showReturnDateTimePicker = () => {
        this.setState({ isReturnDateTimePickerVisible: true });
    }
 
    hideDateTimePicker = () => {
        this.setState({ isDepartureDateTimePickerVisible: false, isReturnDateTimePickerVisible: false  });
    }
 
    handleDepartureDatePicked = (date) => {
            this.setState({ departureDate: date.toLocaleDateString('en-US', DATE_OPTIONS) })

        // console.log(date);
        this.hideDateTimePicker();
    };

    handleReturnDatePicked = (date) => {
        this.setState({ returnDate: date.toLocaleDateString('en-US', DATE_OPTIONS) })

        // console.log(date);
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
                    <TouchableOpacity style= {styles.containerStyle} onPress={this.showReturnDateTimePicker}>
                        <Text style= {styles.datePickerStyle}>Return</Text>
                        <Text style= {styles.datePlaceholderStyle}>{this.state.returnDate}</Text>
                    </TouchableOpacity>
        
                    <DateTimePicker
                        isVisible={this.state.isReturnDateTimePickerVisible}
                        onConfirm={this.handleReturnDatePicked}
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

    togglePassengers = () => {
        this.setState({ showPassengerOptions: !this.state.showPassengerOptions })
    }

    renderPassengerOptions = () => {
        if(this.state.showPassengerOptions) {
            return (
                <Card>
                    <CardSection>
                        <Text style= {styles.passengerStyle}>{this.state.passengers.adult} Adult</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.addPassenger('adult')}>+</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.removePassenger('adult')}>-</Text> 
                    </CardSection>  
                    <CardSection>
                        <Text style= {styles.passengerStyle}>{this.state.passengers.child} Child</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.addPassenger('child')}>+</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.removePassenger('child')}>-</Text> 
                    </CardSection> 
                    <CardSection>
                        <Text style= {styles.passengerStyle}>{this.state.passengers.infant} Infant</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.addPassenger('infant')}>+</Text>
                        <Text style= {styles.passengerStyle} onPress={() => this.removePassenger('infant')}>-</Text> 
                    </CardSection>   
                </Card>
            )
        }
    }

    render() {
        return (
            <ScrollView>
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
                    <TouchableOpacity style= {styles.containerStyle}  onPress={this.showDepartureDateTimePicker}>
                        <Text style= {styles.datePickerStyle}>Depart</Text>
                        <Text style= {styles.datePlaceholderStyle}>{this.state.departureDate}</Text>
                    </TouchableOpacity>
           
                    <DateTimePicker
                        isVisible={this.state.isDepartureDateTimePickerVisible}
                        onConfirm={this.handleDepartureDatePicked}
                        onCancel={this.hideDateTimePicker} 
                    />
                </CardSection>
                    
                {this.renderReturn()}

                <CardSection>
                    <TouchableOpacity style= {styles.containerStyle} onPress={this.togglePassengers}>
                        <Text style= {styles.datePickerStyle}>Passengers</Text>
                        <Text style= {styles.passengerInputStyle}> Adult: {this.state.passengers.adult}, Child: {this.state.passengers.child}, Infant: {this.state.passengers.infant}  </Text>
                    </TouchableOpacity>    
                </CardSection>

                {this.renderPassengerOptions()}

                <CardSection>
                    <Button text='Search Flights' />
                </CardSection>
            </Card>
            </ScrollView>
        )
    }
}

const styles = {
    datePickerStyle: {
        fontSize: 18,
        paddingLeft: 20,
        flex: 1

    },
    datePlaceholderStyle: {
        fontSize: 18,
        color: '#D3D3D3',
        flex: 2
    },
    containerStyle: {
        height: 40,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    passengerStyle: {
        fontSize: 18,
        paddingLeft: 20,
        paddingTop: 20,
        paddingBottom: 20,
        flex: 1

    },
    passengerInputStyle: {
        fontSize: 15,
        color: '#D3D3D3',
        flex: 2
    }
}

export default SearchScreen