import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state={
    paddingTop:null,
    liheight:null
}

const getters={

}

const mutations={
    //设置获取上内边距的方法
    getPadding(state,data){
        state.paddingTop=data.paddingTop
        state.liheight=data.liheight
    }
}

const actions={
    getPaddings(context,data){
        context.commit('getPadding',data)
    }
}

const store=new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})

export default store
