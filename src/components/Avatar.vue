<template>
  <span :title="username">{{ slug }}</span>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  created() {
    this.setUser()
  },

  methods: {
    ...mapActions({
      'setUser': 'checkLogin'
    })
  },

  computed: {
    ...mapGetters([
      'username',
      'slug'
    ])
  },


};
</script>

<style lang="less" scoped>
span {
  display: inline-block;
  width: 30px;
  height: 30px;
  text-align: center;
  line-height: 32px;
  border-radius: 50%;
  background: #aab1cc;
  color: #fff;
  text-shadow: 1px 0 1px #795c19;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 18px;
  margin-top: 15px;
  cursor: pointer;
}


</style>
