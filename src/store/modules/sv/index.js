import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";
import storage from "@/utils/storage";

storage.setKhoa();
export default {
    namespaced: true,
    state() {
        return {
            SinhViens: storage.getSinhVien(),
            Khoas: storage.getKhoa(),
            SinhVienSearchs: []
        }
    },
    mutations,
    getters,
    actions
};