const DataModel = require("./db/schema");

const saveDatabyRedis = async (data) => {
	try {
		console.log({ data });
		const { key, value } = data;
		const result = (await DataModel.create({ key, value })).toObject();
		console.log({ result });
		return result;
	} catch (error) {
		console.log(error.message);
		return error.message;
	}
};

module.exports = {
	saveDatabyRedis,
};
