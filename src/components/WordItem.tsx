import {Text, Pressable} from 'react-native';
import wordStyles from '../styles/WordStyles';

const WordItem = ({item}) => {
    return (
        <Pressable >
            <Text style={wordStyles.word}>{item["word"]}</Text>
            <Text style={wordStyles.translation}>{item["translation"]}</Text>
        </Pressable>
    )
}
export default WordItem