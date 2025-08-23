import app from "./server.js";
import "dotenv/config.js";

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`App listening on http://localhost:${PORT}`);
});
