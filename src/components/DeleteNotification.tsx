import notificationStyles from "../styles/NotificationStyles";

const DeleteNotification = ({ closeToast, deleteFunction }) => {
  return (
    <div className="flex flex-row items-center p-4 gap-4 w-full">
      <div className="flex-1 text-left" style={notificationStyles.text}>
        Are you Sure? Workbooks are not retrievable once deleted.
      </div>
      <div className="flex flex-col shrink-0">
        <button
          onClick={() => closeToast()}
          style={notificationStyles.cancelButton}
        >
          Cancel
        </button>
        <button
          onClick={deleteFunction}
          style={notificationStyles.deleteButton}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteNotification;