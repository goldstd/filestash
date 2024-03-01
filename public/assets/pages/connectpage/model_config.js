import rxjs from "../../lib/rx.js";
import ajax from "../../lib/ajax.js";

export default ajax({
    url: "/api/config?target=" + new URLSearchParams(location.search).get("target"),
    responseType: "json"
}).pipe(
    rxjs.map(({ responseJSON }) => responseJSON.result),
    rxjs.shareReplay(1),
);
