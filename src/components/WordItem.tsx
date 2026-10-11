/* eslint-disable @typescript-eslint/no-explicit-any */
import {Text, Pressable} from 'react-native';
import wordStyles from '../styles/WordStyles';

const WordItem = ({item, onPress = undefined}: {item: any, onPress?: () => void}) => {
    return (
        <Pressable onPress={onPress}>
            <Text style={wordStyles.word}>{item["word"]}</Text>
            <Text style={wordStyles.translation}>{item["translation"]}</Text>
        </Pressable>
    )
}
export default WordItem
