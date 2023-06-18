import { ADD_SINH_VIEN_ACTION, ADD_SINH_VIEN_MUTATION, DELETE_SINH_VIEN_ACTION, DELETE_SINH_VIEN_MUTATION, EDIT_SINH_VIEN_ACTION, EDIT_SINH_VIEN_MUTATION, SET_SINH_VIEN_SEARCH_ACTION, SET_SINH_VIEN_SEARCH_MUTATION } from "@/store/storeconstants"

export default {
    [ADD_SINH_VIEN_ACTION](context, payload) {
        context.commit(ADD_SINH_VIEN_MUTATION, payload)
    },
    [EDIT_SINH_VIEN_ACTION](context, payload) {
        context.commit(EDIT_SINH_VIEN_MUTATION, payload)
    },
    [DELETE_SINH_VIEN_ACTION](context, payload) {
        context.commit(DELETE_SINH_VIEN_MUTATION, payload)
    },
    [SET_SINH_VIEN_SEARCH_ACTION](context, payload) {
        context.commit(SET_SINH_VIEN_SEARCH_MUTATION, payload)
    }
}