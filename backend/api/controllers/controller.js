const { redisClient, redisChannel } = require("../../db/redis");
const DataModel = require("../../db/schema");

const sendRes = async (res, data, err) => {
	if (data) {
		res.status(200).json({ success: true, data });
	} else {
		console.log(err);
		res.status(500).json({ success: false, data: null });
	}
};

const saveData = async (req, res, next) => {
	try {
		const data = await redisClient.publish(
			redisChannel,
			JSON.stringify(req.body)
		);
		return await sendRes(res, { data: "Success" });
	} catch (error) {
		return await sendRes(res, null, error);
	}
};

const getAllData = async (req, res, next) => {
	try {
		const data = await DataModel.find({}).lean();
		return await sendRes(res, data);
	} catch (error) {
		return await sendRes(res, null, error);
	}
};

const getData = async (req, res, next) => {
	try {
		const { key } = req.params;
		console.log({ key });
		let data = await redisClient.get(key);
		if (data) {
			console.log("Cache found");
			return await sendRes(res, JSON.parse(data));
		}
		console.log("Cache missed");
		data = await DataModel.findOne({ key }).lean();
		await redisClient.set(data.key, JSON.stringify(data));
		return await sendRes(res, data);
	} catch (error) {
		return await sendRes(res, null, error);
	}
};

module.exports = {
	saveData,
	getAllData,
	getData,
};
