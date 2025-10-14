import argon2 from "argon2";
import { UserModel } from "../data_access/models/index.js";
import results from "../utils/results.js";

/**
 * @typedef {Object} AuthServiceResult
 * @property {boolean} success
 * @property {any} [data]
 * @property {string} [error]
 */

/**
 * Register new user
 * @param {Object} credentials.username
 * @param {Object} credentials.password
 * @param {Object} credentials.email
 * @returns {Promose<AuthServiceResult>} result.data - new user ID 
 * or result.error - message 
 */
export async function registerUserAsync({ username, email, password }) {
    if (!isUsernameValid(username))
        return results.fail("Username is invalid");
    if (!isEmailValid(email))
        return results.fail("Email is invalid");
    if (!isPasswordValid(password))
        return results.fail("Password is not valid");
    if (await UserModel.exists({ username }))
        return results.fail("Username is taken");

    const hash = await argon2.hash(password);

    const user = new UserModel({
        username,
        email,
        passwordHash: hash,
        emailConfirmed: false
    });
    await user.save();

    return results.ok(user.id);
}

function isUsernameValid(value) {
    return !!(value && (/^[\w\.-]{4,}$/).test(value));
}
function isEmailValid(value) {
    return !!(value && (/^[\w\.-]+@[\w\.-]+\.\w{2,}$/).test(value));
}
function isPasswordValid(value) {
    // todo: write stronger password requirements
    return !!(value && (/\S{6,}$/));
}

export default { registerUserAsync };