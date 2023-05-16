import { CreateProductUseCase } from "../use-cases/products/create-product";
import { ListOwnProductsUseCase } from "../use-cases/products/list-own-products";
import { UpdateProductUseCase } from "../use-cases/products/update-product";
import { LoginUser } from "../use-cases/users/login-user";
import { RegisterUserUseCase } from "../use-cases/users/register-user";

export const RequestHandlers = {
    auth: {
        USER_REGISTER_COMMAND: {
            handler: RegisterUserUseCase,
        },
        USER_LOGIN_QUERY: {
            handler: LoginUser,
        },
    },
    products: {
        PRODUCT_CREATE_COMMAND: {
            handler: CreateProductUseCase,
        },
        PRODUCT_UPDATE_COMMAND: {
            handler: UpdateProductUseCase,
        },
        LIST_OWN_PRODUCTS_QUERY: {
            handler: ListOwnProductsUseCase,
        },
    },
} as const;
