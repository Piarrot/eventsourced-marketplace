//istanbul ignore file

import {
    DOMAIN_ERRORS,
    DomainUseCase,
    parseCreateProductPayload,
    parseLoginCredentials,
    parseRegisterUserPayload,
    parseUpdateProductPayload,
} from "../index.js";
import { CreateProductUseCase } from "../use-cases/products/create-product.js";
import { ListOwnProductsUseCase } from "../use-cases/products/list-own-products.js";
import { UpdateProductUseCase } from "../use-cases/products/update-product.js";
import { LoginUserUseCase } from "../use-cases/users/login-user.js";
import { RegisterUserUseCase } from "../use-cases/users/register-user.js";
import { PayloadParser } from "../utils/payload-parser.js";

export type MESSAGES =
    | "USER_REGISTER_COMMAND"
    | "USER_LOGIN_QUERY"
    | "PRODUCT_CREATE_COMMAND"
    | "PRODUCT_UPDATE_COMMAND"
    | "LIST_OWN_PRODUCTS_QUERY";

export type BoundaryHandler = {
    parser?: PayloadParser<any>;
    handler: DomainUseCase<any, any, any, DOMAIN_ERRORS>;
};

export const BOUNDARY_HANDLERS: Record<MESSAGES, BoundaryHandler> = {
    USER_REGISTER_COMMAND: {
        parser: parseRegisterUserPayload,
        handler: RegisterUserUseCase,
    },
    USER_LOGIN_QUERY: {
        parser: parseLoginCredentials,
        handler: LoginUserUseCase,
    },
    PRODUCT_CREATE_COMMAND: {
        parser: parseCreateProductPayload,
        handler: CreateProductUseCase,
    },
    PRODUCT_UPDATE_COMMAND: {
        parser: parseUpdateProductPayload,
        handler: UpdateProductUseCase,
    },
    LIST_OWN_PRODUCTS_QUERY: {
        handler: ListOwnProductsUseCase,
    },
};
