import { get } from "@/http/jsonp";

export function getTotal() {
  return get("http://127.0.0.1:8090/v1/system/user/getTotal", {
    id: 1,
    name: "22"
  });
}
