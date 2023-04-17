import {Schema, Action} from "./types";

const reducer = (state: Schema[], action: Action) => {
    const {type, payload} = action;
    switch (type) {
        case "new_field":
            return [...state, { key: "addName", type: "STRING", required: false }]
        case "change_field_type":
            return state.map((item) => item.key === payload.name ? {...item, type: payload.type} : item)
        case "remove_field":
            return state.filter((item) => item.key !== payload?.name)
        case "enable_editing":
            return state.map((item) => item.key === payload.name ? {...item, edit: true} : item)
        case "disable_editing":
            return state.map((item) => item.key === payload.name ? {...item, edit: false, key: payload?.value, value: payload?.schema} : item)
        case "is_required":
            return state.map((item) => item.key === payload.name ? {...item, required: payload.value} : item)
    }
    return state;
}

export default reducer;