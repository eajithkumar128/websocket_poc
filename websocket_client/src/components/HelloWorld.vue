<template>
  <v-container>
    <v-row>
      <v-col>
        <v-text-field placeholder="enter username" v-model="username" />
        <v-text-field placeholder="enter page no" v-model="pageNo" />
      </v-col>
      <v-col>
        <v-btn @click="goToAbout" style="margin:0px 10px" color="primary">Check</v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "HelloWorld",

  data() {
    return {
      username: "",
      pageNo: "",
    };
  },
  methods: {
    goToAbout() {
      window.username = this.username;
      window.pageNo = this.pageNo;
      this.$router.push("/about/" + this.pageNo);
      // this.$socket.emit("checkSend", "hello how are you?");
    },
  },
};
</script>
