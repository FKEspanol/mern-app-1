import allowOrigins from "./allowedOrigins";
const corsOptions = {
    origin: function (origin: any, cb: Function) {
        if (allowOrigins.indexOf(origin) !== -1 || !origin)
            return cb(null, true);
        cb(new Error("Not allowed by CORS"));
    },

    optionsSuccessStatus: 200,
};

export default corsOptions;
