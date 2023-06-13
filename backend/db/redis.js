const { createClient } = require("redis");
const redisUrl = `redis://redis2:6379`;
const redisChannel = "REDIS_TEST_CHANNEL";

let redisClient;
const initRedis = async () => {
	redisClient = createClient({ url: redisUrl });
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
