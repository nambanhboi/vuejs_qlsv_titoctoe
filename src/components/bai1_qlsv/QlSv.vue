<script setup>
import { computed, ref, watch } from 'vue';
import { useStore } from 'vuex';

import '../../assets/styles/qlsv.css';
import { GET_SINH_VIEN_GETTER, GET_TEN_KHOA_GETTER, ADD_SINH_VIEN_ACTION, EDIT_SINH_VIEN_ACTION, DELETE_SINH_VIEN_ACTION } from '../../store/storeconstants'

let SinhViens = ref([])
let TenKhoas = ref([])
const MaSv = ref('');
const TenSv = ref('');
const NgaySinh = ref('');
const GioiTinh = ref('Nam');
const MaKhoa = ref('');
const store = useStore();
const checkedAll = ref(false)
const InputSearch = ref('')
const SinhVienSearchs = ref([])

const Disable = ref(false)


SinhViens.value = computed(() => store.getters[`sv/${GET_SINH_VIEN_GETTER}`])
TenKhoas.value = computed(() => store.getters[`sv/${GET_TEN_KHOA_GETTER}`])

console.log(SinhViens.value.value.length)

const hanldeAddSV = () => {
    const sinhvien = {
        MaSv: MaSv.value,
        TenSv: TenSv.value,
        NgaySinh: NgaySinh.value,
        GioiTinh: GioiTinh.value,
        MaKhoa: MaKhoa.value,
    }
    store.dispatch(`sv/${ADD_SINH_VIEN_ACTION}`, sinhvien);
}

const handleFillInput = (index) => {
    let sinhvien
    if(SinhVienSearchs.value.length) {
        console.log(index)
        sinhvien = SinhVienSearchs.value[index]
        console.log('có')
        console.log(sinhvien)
    }
    else {
        console.log('không')
        sinhvien = SinhViens.value.value[index]
    }
    MaSv.value = sinhvien.MaSv
    TenSv.value = sinhvien.TenSv
    NgaySinh.value = sinhvien.NgaySinh
    GioiTinh.value = sinhvien.GioiTinh 
    MaKhoa.value = sinhvien.MaKhoa
    Disable.value = true
}

const handleEditSV = () => {
    const sinhvien = {
        MaSv: MaSv.value,
        TenSv: TenSv.value,
        NgaySinh: NgaySinh.value,
        GioiTinh: GioiTinh.value,
        MaKhoa: MaKhoa.value,
    }
    store.dispatch(`sv/${EDIT_SINH_VIEN_ACTION}`, sinhvien)
}

const handleDeleteSV = (index) => {
    const cfm = confirm('Bạn có chắc chắn muốn xóa?')
    if(cfm) {
        const arrIndex = [];
        arrIndex.push(index);
        console.log(arrIndex)
        store.dispatch(`sv/${DELETE_SINH_VIEN_ACTION}`, arrIndex)
        
    }
}
let arrIndex = ref([])

const changeChecked = (index) => {
  if (arrIndex.value.includes(index)) {
    arrIndex.value = arrIndex.value.filter((item) => item !== index);
  } else {
    arrIndex.value = [...arrIndex.value, index];
  }
}

const handleDeleteNSV = () => {
  const cfm = confirm('Bạn có chắc chắn muốn xóa cac sinh vien da chon?');
  if (cfm) {
    store.dispatch(`sv/${DELETE_SINH_VIEN_ACTION}`, arrIndex.value);
  }
}

const changeAllChecked = () => {
  if (checkedAll.value) {
    arrIndex.value = [];
  } else {
    arrIndex.value = [...Array(SinhViens.value.value.length).keys()];
  }
  console.log(arrIndex)
  checkedAll.value = !checkedAll.value;
}

const handleRefreshInput = () => {
    MaSv.value = ''
    TenSv.value = ''
    NgaySinh.value = ''
    GioiTinh.value = 'Nam' 
    MaKhoa.value = ''
    Disable.value = false
}

const handleSearch = () => {
    SinhVienSearchs.value = SinhViens.value.value.map((sv, index_old) => {
        return {...sv, index_old}
    }).filter(sv => {
        return sv.TenSv.toUpperCase().includes(InputSearch.value.toUpperCase()) ||
        sv.MaSv.toUpperCase().includes(InputSearch.value.toUpperCase()) ||
        sv.NgaySinh.toUpperCase().includes(InputSearch.value.toUpperCase()) ||
        sv.GioiTinh.toUpperCase().includes(InputSearch.value.toUpperCase()) ||
        sv.MaKhoa.toUpperCase().includes(InputSearch.value.toUpperCase())

    })
    SinhViens.value = SinhVienSearchs

}

watch(InputSearch, () => {
    if(InputSearch.value === '') {
        SinhVienSearchs.value = []
        SinhViens.value = computed(() => store.getters[`sv/${GET_SINH_VIEN_GETTER}`])
    }

})





</script>


<template>
    <div class="container">
        <h1>Quản lý Sinh viên</h1>
        <div class="search border">
            <span>Từ khóa: </span>
            <input type="text" id="txtTimKiem" placeholder="Từ khóa cần tìm" name="txtTuKhoa" v-model="InputSearch" @change="changInputSearch">
            <button id="timkiem" @click="handleSearch">Tìm kiếm</button>
        </div>
    
        <div class="display_info border">
            <table border="1">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" id="check_all" @change="changeAllChecked">
                        </th>
                        <th>Mã SV</th>
                        <th>Tên SV</th>
                        <th>Ngày sinh</th>
                        <th>Giới tính</th>
                        <th>Khoa</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table_sv" >
                    <tr v-for="(sinhvien, index) in (SinhVienSearchs.length ? SinhVienSearchs : SinhViens.value)" :key="index">
                        <td><input type="checkbox" class='check_one' :checked="arrIndex.includes(index)" @change="changeChecked(index)"></td>
                        <td>{{ sinhvien.MaSv }}</td>
                        <td>{{ sinhvien.TenSv }}</td>
                        <td>{{ sinhvien.NgaySinh }}</td>
                        <td>{{ sinhvien.GioiTinh }}</td>
                        <td>{{ TenKhoas.value[SinhVienSearchs.length ? sinhvien.index_old : index] }}</td>
                        <td><i class="bi bi-pen edit" @click="handleFillInput(index)"></i></td>
                        <td><i class="bi bi-trash3 delete" @click="SinhVienSearchs.length ? handleDeleteSV(sinhvien.index_old) : handleDeleteSV(index)"></i></td>
                    </tr>
                </tbody>
            </table>   
        </div>
        <div class="edit_info border" >
            <div class="buttons">
                <button @click="hanldeAddSV" :disabled="Disable">Thêm mới</button>
                <button id="sua" @click="handleEditSV" :disabled="!Disable">Cập nhật</button>
                <button id="lammoi" @click="handleRefreshInput">Làm mới</button>
                <button id="xoa" @click="handleDeleteNSV">Xóa</button>
            </div>
            <div class="enter_info">
                <div class="detail_info">
                    <label for="txtMaSV">Mã SV</label>
                    <input type="text" name="txtMaSV" v-model="MaSv" :disabled="Disable">
                </div>
                <div class="detail_info">
                    <label for="txtTenSV">Tên SV</label>
                    <input type="text" name="txtTenSV" v-model="TenSv">
                </div>
                <div class="detail_info">
                    <label for="txtNgaySinh">Ngày sinh</label>
                    <input type="date" name="txtNgaySinh" v-model="NgaySinh">
                </div>
                <div class="detail_info">
                    <label for="rdbGioiTinh">Giới tính</label>
                    <div>
                        <label for="">Nam</label>
                        <input type="radio" value="Nam" name="rdbGioiTinh" checked v-model="GioiTinh">
                        <label>Nữ</label>
                        <input type="radio" value="Nữ" name="rdbGioiTinh" v-model="GioiTinh">
                    </div>
                </div>
                <div class="detail_info">
                    <label>Khoa</label>
                    <select name="drpKhoa" id="" v-model="MaKhoa">
                        <option value="CNTT">Công nghệ thông tin</option>
                        <option value="DTVT">Điện tử viễn thông</option>
                        <option value="KT" selected>Kinh tế</option>
                    </select>
                </div>
            </div>
        </div>
    </div>

</template>

<!-- <script>
import { mapGetters } from 'vuex';


import '../../assets/styles/qlsv.css';
import { GET_SINH_VIEN_GETTER, GET_TEN_KHOA_GETTER } from '../../store/storeconstants'
export default {
    name: 'qlsv-',
    data() {
        return {
            MaSv: '',
            TenSv: '',
            NgaySinh: '',
            GioiTinh: '',
            Khoa: ''
        }
    },
    computed: {
        ...mapGetters('sv', {
            SinhViens: GET_SINH_VIEN_GETTER
        }),
        ...mapGetters('sv', {
            TenKhoas: GET_TEN_KHOA_GETTER
        })
    },
    mounted() {
        console.log(this.SinhViens)
        console.log(this.TenKhoas)
    }
}
</script> -->