<template>
  <v-container>
    <h1>USECASE PAGE : {{$router.currentRoute.params.usecase}}</h1>
    <hr />
    <div v-for="(val,index) in userMessages" :key="index">
      <h4>{{val}}</h4>
    </div>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      userMessages: [],
    };
  },
  sockets: {
    receiveNotification: function (data) {
      this.userMessages = data;
    },
  },
  mounted() {
    this.$socket.emit("addRoom", {
      page: this.$router.currentRoute.params.usecase,
    });
  },
};
</script>