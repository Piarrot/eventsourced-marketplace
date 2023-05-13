export interface IUsersProvider {
    isEmailRegistered(email: string): Promise<boolean>;
}
