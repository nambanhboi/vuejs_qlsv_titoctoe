import { GET_SINH_VIEN_GETTER, GET_SINH_VIEN_SEARCH_GETTER, GET_TEN_KHOA_GETTER } from "@/store/storeconstants"

export default {
    [GET_SINH_VIEN_GETTER]: (state) => {
        return state.SinhViens;
    },
    [GET_TEN_KHOA_GETTER]: (state) => {
        const Sinhviens = state.SinhViens;
        const Khoas = state.Khoas;
        const TenKhoas = [];
        Sinhviens.forEach(sv => {
            const indexKhoa = Khoas.findIndex(khoa => khoa.MaKhoa === sv.MaKhoa)
            TenKhoas[sv.MaSv] = Khoas[indexKhoa].TenKhoa      
        })
        return TenKhoas;
    },
    [GET_SINH_VIEN_SEARCH_GETTER]: (state) => {
        console.log()
        return state.SinhVienSearchs
    }
}