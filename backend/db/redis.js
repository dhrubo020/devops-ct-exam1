const { createClient } = require("redis");
const redisUrl = `redis://redis2:6379`;
const redisChannel = "REDIS_TEST_CHANNEL";

let redisClient;
const initRedis = async () => {
	redisClient = createClient({ url: redisUrl });
	redisClient.on("error", (error) => console.error(`Error : ${error}`));
	await redisClient.connect();
	// redis status logger
	redisClient.on("error", (err) => console.log("Redis error", err));
	redisClient.on("connect", () => console.log("Connected to Redis"));
	redisClient.on("reconnecting", () => {
		console.log("Reconnecting to Redis.");
	});
};

(async () => {
	await initRedis();
})();

module.exports = {
	redisClient,
	initRedis,
	redisChannel,
};
