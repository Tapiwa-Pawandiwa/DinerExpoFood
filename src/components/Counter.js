import AntDesign from "react-native-vector-icons/AntDesign";
import { View, Text } from 'react-native'



function Counter() {
    const [quantity, setQuantity] = useState(1);
    const { addDishToBasket } = useBasketContext();
    return (
        <View>
            <Text>Counter</Text>
        </View>
    )
}