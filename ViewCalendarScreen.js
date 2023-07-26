import React, { useState } from 'react';
import { SafeAreaView } from 'react-native';
import { Calendar } from 'react-native-calendars';

export default function ViewCalendarScreen() {
    const [selectedDays, setSelectedDays] = useState({});

    const onDayPress = day => {
        const { dateString } = day;
        let newSelectedDays = { ...selectedDays };

        if (selectedDays[dateString]) {
            delete newSelectedDays[dateString];  // Deselect the day
        } else {
            newSelectedDays[dateString] = { selected: true, marked: true, selectedColor: 'blue' }; // Select the day
        }

        setSelectedDays(newSelectedDays);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Calendar
                onDayPress={onDayPress}
                markedDates={selectedDays}
            />
        </SafeAreaView>
    );
}

