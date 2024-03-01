import rxjs from "../lib/rx.js";
import ajax from "../lib/ajax.js";

const config$ = ajax({
    url: "/api/config?target=" + new URLSearchParams(location.search).get("target"),
    method: "GET",
    responseType: "json",
}).pipe(
    rxjs.map(({ responseJSON }) => responseJSON.result),
);

export function get() {
    return config$;
}
