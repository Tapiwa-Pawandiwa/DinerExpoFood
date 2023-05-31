import { DatePickerIOSBase } from "react-native";

import { View, Text } from 'react-native'
import React ,{useState}from 'react'


/*
    Calender


*/
const Calender = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

  return (
    <View>
      <Text>Calender</Text>
      <DatePickerIOSBase
        date={selectedDate}
        onDateChange={(date) => setSelectedDate(date)}
        mode="date"
        />
    </View>
  )
}

export default Calender;