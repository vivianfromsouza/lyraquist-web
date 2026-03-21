import { View, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import workbookStyles from "../styles/WorkbookStyles";

const Workbook = ({ item }) => {
  // const colors = ["#5bc8a6", "#edc526", "#ff4a2a", "#303248"];
  // const [colorNum, setColorNum] = useState(0);
  // const [workbookColor, setWorkbookColor] = useState("");
  const navigate = useNavigate();

  // TODO: TRY TO VARY COLOR??
  // function genNextColor(): string {
  //   if (colorNum > 3) {
  //     setColorNum(0);
  //   } else {
  //     setWorkbookColor(colors[colorNum]);
  //     setColorNum(colorNum + 1);
  //   }
  //   return colors[colorNum];
  // }

  return (
    <Pressable
      onPress={() =>
        navigate("/workbook/info", {
          state: item,
        })
      }
      style={{ margin: 10 }}
    >
      <View testID="workbook-icon" style={workbookStyles.icon}>
        <FontAwesomeIcon icon={faBook}/>
      </View>
      <View>
        <Text
          numberOfLines={1}
          style={workbookStyles.name}
        >
          {" "}
          {item?.name}{" "}
        </Text>
      </View>
    </Pressable>
  );
};

export default Workbook;
