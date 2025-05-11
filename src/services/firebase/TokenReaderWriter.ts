import { getDatabase, ref, get, update} from "firebase/database";

const db = getDatabase();
const userId = localStorage.getItem("userId");

const TokenReaderWriter = {
    async writeAccessToken(accessToken: string) {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        await update(nodeRef, {
            accessToken: accessToken,
        })
        .then(() => {
            console.log("Data written successfully!" + userId + " " + accessToken);
        })
        .catch((error) => {
            console.error("Error writing data:", error);
        });
    },
    async getAccessToken() {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        try {
            const snapshot = await get(nodeRef);
            if (snapshot.exists()) {
              console.log("Access Token:", snapshot.val().accessToken);
              return snapshot.val().accessToken; // Return the value of the node
            } else {
              console.log("No data available at this node.");
              return null;
            }
          } catch (error) {
            console.error("Error retrieving data:", error);
            return null;
          }
    },
    async writeAuthToken(authToken: string) {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        await update(nodeRef, {
            authToken: authToken,
        })
        .then(() => {
            console.log("Data written successfully!");
        })
        .catch((error) => {
            console.error("Error writing data:", error);
        });
    },
    async getAuthToken() {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        try {
            const snapshot = await get(nodeRef);
            if (snapshot.exists()) {
              console.log("Auth Token:", snapshot.val().authToken);
              return snapshot.val().authToken; // Return the value of the node
            } else {
              console.log("No data available at this node.");
              return null;
            }
          } catch (error) {
            console.error("Error retrieving data:", error);
            return null;
          }
    },
    async writeRefreshToken(refreshToken: string) {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        await update(nodeRef, {
            refreshToken: refreshToken,
        })
        .then(() => {
            console.log("Data written successfully!");
        })
        .catch((error) => {
            console.error("Error writing data:", error);
        });
    },
    async getRefreshToken() {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        try {
            const snapshot = await get(nodeRef);
            if (snapshot.exists()) {
              console.log("Refresh Token:", snapshot.val().refreshToken);
              return snapshot.val().refreshToken; // Return the value of the node
            } else {
              console.log("No data available at this node.");
              return null;
            }
          } catch (error) {
            console.error("Error retrieving data:", error);
            return null;
          }
    },
    async writeTimeTokenTaken(timeTokenTaken: string) {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        await update(nodeRef, {
            timeTokenTaken: timeTokenTaken,
        })
        .then(() => {
            console.log("Data written successfully!");
        })
        .catch((error) => {
            console.error("Error writing data:", error);
        });
    },
    async getTimeTokenTaken() {
        const nodeRef = ref(db, "tokens/" + userId); //   Specify the node path
        try {
            const snapshot = await get(nodeRef);
            if (snapshot.exists()) {
              console.log("Time Token Taken:", snapshot.val().timeTokenTaken);
              return snapshot.val().timeTokenTaken; // Return the value of the node
            } else {
              console.log("No data available at this node.");
              return null;
            }
          } catch (error) {
            console.error("Error retrieving data:", error);
            return null;
          }
    },
};

export default TokenReaderWriter;
