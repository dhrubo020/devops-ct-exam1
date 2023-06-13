const { createClient } = require("redis");
const { saveDatabyRedis } = require("../pub-sub");
const redisUrl = `redis://redis2:6379`;
const redisChannel = "REDIS_TEST_CHANNEL";

let redisClient;
let subscriber;
const initRedis = async () => {
	redisClient = createClient({ url: redisUrl });
	redisClient.on("error", (error) => console.error(`Error : ${error}`));
	await redisClient.connect();
	subscriber = redisClient;

	// redis status logger
	subscriber.on("error", (err) => console.log("Redis error", err));
	subscriber.on("connect", () => console.log("Connected to Redis"));
	subscriber.on("reconnecting", () => {
		console.log("Reconnecting to Redis.");
	});
	subscriber.on("ready", () => {
		console.log("subscriber is ready for action!");
		subscriber.subscribe(redisChannel, async (message) => {
			console.log("subscriber service:- ", message);
			try {
				return await saveDatabyRedis(JSON.parse(message));
			} catch (error) {
				console.log({ error });
			}
		});
	});
};

(async () => {
	await initRedis();
})();

module.exports = {
	redisClient,
	subscriber,
	initRedis,
	redisChannel,
};
