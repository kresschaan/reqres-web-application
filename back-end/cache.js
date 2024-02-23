const cache = {};

// Function to set cache with expiry time
function setCache(key, data, timeout) {
    const currentTime = Date.now();
    if (!cache[key]) {
        // If cache doesn't exist for this key, create a new cache entry
        cache[key] = {
            data: data,
            expiry: timeout ? currentTime + timeout * 1000 : null,
        };
    } else {
        // If cache already exists for this key, update the data and expiry time
        cache[key].data = data;
        if (timeout) {
            cache[key].expiry = currentTime + timeout * 1000;
        }
    }
}

// Function to get cached data if not expired
function getCache(key) {
    const cachedData = cache[key];
    if (cachedData && cachedData.expiry > Date.now()) {
        return cachedData.data;
    }
    return null;
}

module.exports = { setCache, getCache };
