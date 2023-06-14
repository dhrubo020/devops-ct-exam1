const { default: mongoose } = require("mongoose");

const connectToDb = async () => {
	try {
		//------connect to mongodb
		await mongoose.connect("mongodb://localhost:27021/devops", {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		const db = mongoose.connection;
		db.on("error", (err) => {
			console.log(err);
		});
		db.once("open", () => {
			console.log("db connected");
		});
        console.log('db connected');
	} catch (error) {
		console.log(error);
	}
};

module.exports = {
	connectToDb,
};
