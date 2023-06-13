const { createClient } = require("redis");
const redisUrl = `redis://127.0.0.1:6379`;
const redisChannel = "REDIS_TEST_CHANNEL";

let redisClient;
const initRedis = async () => {
	redisClient = createClient({
		host: "redis2",
		port: 6379,
	});
	redisClient.on("error", (error) => console.error(`Error : ${error}`));
	await redisClient.connect();
};

(async () => {
	await initRedis();
})();

module.exports = {
	redisClient,
	initRedis,
	redisChannel,
};
