import { ADD_SINH_VIEN_MUTATION, DELETE_SINH_VIEN_MUTATION, EDIT_SINH_VIEN_MUTATION, SET_SINH_VIEN_SEARCH_MUTATION } from "@/store/storeconstants"
import storage from "@/utils/storage"

export default {
    [ADD_SINH_VIEN_MUTATION](state, payload) {
        console.log(payload)
        state.SinhViens.push(payload)
        storage.setSinhVien(state.SinhViens)
    },
    [EDIT_SINH_VIEN_MUTATION](state, payload) {
        state.SinhViens.forEach(sv => {
            sv.MaSv === payload.MaSv && (
                sv.TenSv = payload.TenSv,
                sv.NgaySinh = payload.NgaySinh,
                sv.GioiTinh = payload.GioiTinh,
                sv.MaKhoa = payload.MaKhoa
            )
        })
        storage.setSinhVien(state.SinhViens)
    },
    [DELETE_SINH_VIEN_MUTATION](state, payload) {
        console.log(payload)
        // for(let i=payload.length-1;i>=0;i--) {
        //     state.SinhViens.splice(payload[i], 1)
        // }
        
        // storage.setSinhVien(state.SinhViens)
        for(let i=0;i<payload.length;i++) {
            state.SinhViens.forEach(sv => {
                if(sv.MaSv === payload[i]) {
                    const index = state.SinhViens.indexOf(sv)
                    state.SinhViens.splice(index, 1);
                }

            })
            storage.setSinhVien(state.SinhViens)
        }

    },
    [SET_SINH_VIEN_SEARCH_MUTATION](state, payload) {
        if(payload === '') {
            state.SinhVienSearchs = []
        }
        else {
            state.SinhVienSearchs = state.SinhViens.filter(sv => {
                return sv.TenSv.toUpperCase().includes(payload.toUpperCase()) ||
                sv.MaSv.toUpperCase().includes(payload.toUpperCase()) ||
                sv.NgaySinh.toUpperCase().includes(payload.toUpperCase()) ||
                sv.GioiTinh.toUpperCase().includes(payload.toUpperCase()) ||
                sv.MaKhoa.toUpperCase().includes(payload.toUpperCase())
            })
        }
        console.log(state.SinhVienSearch)
    }
}