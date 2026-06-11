import app from "../app";
import userRoutes from "../modules/users/user.routes";

app.use("/api/users", userRoutes);