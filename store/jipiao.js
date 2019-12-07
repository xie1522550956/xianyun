// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    jipiaoitem: [],
}) 

export const mutations = {
    setjipiao(state, data) {
        state.jipiaoitem.push(data)
    },

};

