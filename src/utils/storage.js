const Khoas = [
    {
        MaKhoa: 'CNTT',
        TenKhoa: 'Công nghệ thông tin'
    },
    {
        MaKhoa: 'DTVT',
        TenKhoa: 'Điện tử viễn thông'
    },
    {
        MaKhoa: 'KT',
        TenKhoa: 'Kinh tế'
    }
]

const sinhvien = [{
    MaSv: 'sds',
    TenSv: 'nam',
    NgaySinh: '2023-05-24',
    GioiTinh: 'Nam',
    MaKhoa: 'KT'
},
{
    MaSv: 'sds2',
    TenSv: 'nam',
    NgaySinh: '2023-03-04',
    GioiTinh: 'Nam',
    MaKhoa: 'DTVT'
}]

export default {
    getSinhVien() {
        return JSON.parse(localStorage.getItem('SinhViens')) || sinhvien;
    },
    setSinhVien(SinhViens) {
        return localStorage.setItem('SinhViens', JSON.stringify(SinhViens))
    },
    getKhoa() {
        return JSON.parse(localStorage.getItem('Khoas'))
    },
    setKhoa() {
        return localStorage.setItem('Khoas', JSON.stringify(Khoas))
    },
}