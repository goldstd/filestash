import rxjs from "../lib/rx.js";
import ajax from "../lib/ajax.js";

export function createSession(authenticationRequest) {
    return ajax({
        method: "POST",
        url: "/api/session?target=" + new URLSearchParams(location.search).get("target"),
        body: authenticationRequest,
        responseType: "json",
    });
}

export function getSession() {
    return ajax({
        url: "/api/session?target=" + new URLSearchParams(location.search).get("target"),
        method: "GET",
        responseType: "json"
    }).pipe(
        rxjs.map(({ responseJSON }) => responseJSON.result)
    );
}

export function deleteSession() {
    return ajax({
        url: "/api/session?target=" + new URLSearchParams(location.search).get("target"),
        method: "DELETE"
    });
}
