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
    },
    cleanUserInfo(state){
        localStorage.removeItem('vuex')
        state.userInfo =  {
            token: "",
            user: {},
        }
    }
};

export const actions = {
    // 登录
    login({commit}, data){
        return this.$axios({
            url:'/accounts/login',
            method: 'POST',
            data
        })
        .then(res => {
            const data= res.data
            return data
        })
    }
};