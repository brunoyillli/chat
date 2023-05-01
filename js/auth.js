import { env } from '../env.js';

var AUTH0_CONFIG = {
    domain: env.DOMAIN,
    clientId: env.CLIENT_ID,
    cacheLocation: "localstorage",
    useRefreshTokens: true
}

export function getAuth0Client() {
    console.log(env.DOMAIN)
    if (window.auth0Client) return Promise.resolve(window.auth0Client)
    return auth0
        .createAuth0Client(AUTH0_CONFIG)
        .then(function (client) {
            window.auth0Client = client
            return client
        })
}

export function login() {
    var options = {
        authorizationParams: {
            redirect_uri: window.location.origin
        }
    }
    getAuth0Client()
        .then(function (auth0Client) {
            return auth0Client.loginWithRedirect(options)
        })
        .catch(function (error) {
            console.log("login failed:", error)
        })
}

export function logout() {
    var options = {
        logoutParams: {
            returnTo: window.location.origin
        }
    }
    getAuth0Client()
        .then(function (auth0Client) {
            return auth0Client.logout(options)
        })
        .catch(function (error) {
            console.log("logout failed:", error)
        })
}

export function handleRedirectCallback() {
    var query = window.location.search
    var isRedirect = query.includes("code=") && query.includes("state=")
    if (!isRedirect) return Promise.resolve()
    return getAuth0Client().then(function (auth0Client) {
        return auth0Client.handleRedirectCallback()
    })
}

export function getUser() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.getUser() })
}

export function isAuthenticated() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.isAuthenticated() })
}

export function getJwt() {
    return getAuth0Client()
        .then(function (auth0Client) { return auth0Client.getIdTokenClaims() })
        .then(function (claims) { return claims.__raw })
}