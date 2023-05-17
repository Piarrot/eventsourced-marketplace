import { MESSAGES } from "mercadoliebre-domain";
import { RouteDefinition } from "./utils/api-boundary.js";

export const RouterMap: Record<MESSAGES, RouteDefinition> = {
    PRODUCT_CREATE_COMMAND: {
        method: "post",
        path: "/products",
        requestParser: async (req, context) => {
            //TODO: upload images
            return req.body;
        },
    },
    PRODUCT_UPDATE_COMMAND: {
        method: "put",
        path: "/products/:id",
        requestParser: async (req, context) => {
            //TODO: upload images
            return {
                ...req.body,
                id: req.params.id,
            };
        },
    },
    USER_REGISTER_COMMAND: {
        method: "post",
        path: "/auth/register",
        requestParser: async (req, context) => {
            //TODO: upload profilePicture
            return req.body;
        },
    },
    LIST_OWN_PRODUCTS_QUERY: {
        method: "get",
        path: "/products",
        requestParser: async (req, context) => ({}),
    },
    USER_LOGIN_QUERY: {
        method: "post",
        path: "/auth/login",
        requestParser: async (req, context) => req.body,
    },
};
