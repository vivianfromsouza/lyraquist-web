import notificationStyles from "../styles/NotificationStyles";

const ChangeNotification = ({ text }) => {
  return (
    <div className="flex flex-row items-center p-4 gap-4 w-full">
      <div className="flex-1 text-left" style={notificationStyles.text}>
       {text}
      </div>
      <div className="flex flex-col shrink-0">
      </div>
    </div>
  );
};

export default ChangeNotification;