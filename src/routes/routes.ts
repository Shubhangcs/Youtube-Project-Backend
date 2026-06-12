import app from "../app";
import userRoutes from "../modules/users/user.routes";
import channelRoutes from "../modules/channels/channels.routes";

app.use("/api/users", userRoutes);
app.use("/api/chan", channelRoutes);