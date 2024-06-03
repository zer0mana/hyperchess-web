const redis = require('redis');
const { promisify } = require('util');

class MovesCache {
    constructor() {
        var options = {
            host: 'localhost',
            port: 6379
        };


        this.client = redis.createClient(options);

        this.setAsync = promisify(this.client.set).bind(this.client);
        this.keysAsync = promisify(this.client.keys).bind(this.client);
        this.delAsync = promisify(this.client.del).bind(this.client);
    }

    async writeString(id, value) {
        const currentTime = Date.now();
        const key = `${id}:${currentTime}`;
        await this.setAsync(key, value);
        console.log(`Set key ${key} with value ${value}`);
    }

    async deleteKeysById(id) {
        const pattern = `${id}:*`;
        const keys = await this.keysAsync(pattern);

        if (keys.length > 0) {
            await this.delAsync(keys);
            console.log(`Deleted keys with pattern ${pattern}: ${keys}`);
        } else {
            console.log(`No keys found with pattern ${pattern}`);
        }
    }
}

module.exports = MovesCache;