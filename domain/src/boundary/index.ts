//istanbul ignore file

import { CreateProductUseCase } from "../use-cases/products/create-product";
import { ListOwnProductsUseCase } from "../use-cases/products/list-own-products";
import { UpdateProductUseCase } from "../use-cases/products/update-product";
import { LoginUserUseCase } from "../use-cases/users/login-user";
import { RegisterUserUseCase } from "../use-cases/users/register-user";

export type MESSAGES = keyof typeof BOUNDARY_HANDLERS;

export const BOUNDARY_HANDLERS = {
    USER_REGISTER_COMMAND: RegisterUserUseCase,
    USER_LOGIN_QUERY: LoginUserUseCase,
    PRODUCT_CREATE_COMMAND: CreateProductUseCase,
    PRODUCT_UPDATE_COMMAND: UpdateProductUseCase,
    LIST_OWN_PRODUCTS_QUERY: ListOwnProductsUseCase,
} as const;
