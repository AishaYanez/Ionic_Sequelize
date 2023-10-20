const express = require("express");
const express = require("multer");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");

//DROP AND RECREATE THE TABLES
db.sequelize.sync({ force: true}).then(()=>{
	console.log("Drop and re-sync db.");
});

app.get("/", (req, res) => {
	res.json({ message: "Welcome to appGallery application." });
});

require("./routes/user.routes")(app);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}.`);
});