import app from "./app";
import { env } from "./config/env";
import "./routes/routes";

const port = Number(env.PORT);

app.listen(port, () => {
    console.log(`server is running on port ${port} and in ${env.ENV} mode...`);
});