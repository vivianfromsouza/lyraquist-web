import { StyleSheet, Text, Pressable} from 'react-native';

const WordItem = ({item}) => {
    return (
        <Pressable >
            <Text style={styles.word}>{item["word"]}</Text>
            <Text style={styles.translation}>{item["translation"]}</Text>
        </Pressable>
    )
}
export default WordItem

const styles = StyleSheet.create({
    word:{
        margin: 5,
        fontSize: 20
    },
    translation:{
        marginLeft: 5
    }
})