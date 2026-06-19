import { View, Text, Pressable } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import workbookStyles from "../styles/WorkbookStyles";

const WORKBOOK_COLORS = ["#5bc8a6", "#edc526", "#ff4a2a", "#303248"];

const Workbook = ({ item, index = 0 }) => {
  const navigate = useNavigate();
  const color = WORKBOOK_COLORS[index % WORKBOOK_COLORS.length];

  return (
    <Pressable
      onPress={() =>
        navigate("/workbook/info", {
          state: item,
        })
      }
      style={{ margin: 10 }}
    >
      <View testID="workbook-icon" style={[workbookStyles.icon]}>
        <FontAwesomeIcon icon={faBook} height={50} width={50} color={color}/>
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