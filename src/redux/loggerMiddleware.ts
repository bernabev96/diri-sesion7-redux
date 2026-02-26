import type { Middleware } from "@reduxjs/toolkit";

const loggerMiddleware: Middleware = (storeAPI) => (next) => (action) => {
    console.log("🚀 Action:", action);
    console.log("📦 Prev state:", storeAPI.getState());

    const result = next(action);

    console.log("✅ Next state:", storeAPI.getState());
    return result;
}

export default loggerMiddleware;