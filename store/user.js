// 用户管理
export const state = () => ({
    // 采用接口返回的数据结构
    userInfo: {
        token: "",
        user: {},
    },
}) 

export const mutations = {
    setUserinfo(state, data) {
        state.userInfo = data
    }
};

export const actions = {
    login({commit}, data){
        return this.$axios({
            url:'/accounts/login',
            method: 'POST',
            data
        })
        .then(res => {
            const data= res.data
            commit('setUserinfo', data)
        })
    }
};