export class RateLimiter {
    constructor(timeWindowMs) {
        this.timeWindowMs = timeWindowMs;
        this.lastRequestTime = 0;
        this.messageCount = 0;
    }

    canMakeRequest() {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        
        return timeSinceLastRequest >= this.timeWindowMs;
    }

    recordRequest() {
        this.lastRequestTime = Date.now();
        this.messageCount++;
    }

    getTimeToWait() {
        const now = Date.now();
        const timeSinceLastRequest = now - this.lastRequestTime;
        return Math.max(0, this.timeWindowMs - timeSinceLastRequest);
    }

    getMessageCount() {
        return this.messageCount;
    }
} 