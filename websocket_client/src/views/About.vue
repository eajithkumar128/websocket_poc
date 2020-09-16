<template>
  <v-container>
    <div class="about">
      <div>
        <v-btn @click="goBack">Back</v-btn>
      </div>
      <h1>This is an about page</h1>
    </div>​
    <v-dialog v-model="dialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"></v-card-title>
        <v-card-text>{{msg}}</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="closeTab" v-if="showbtn">Yes</v-btn>
          <v-btn @click="goBack">{{btntxt}}</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
​
<script>
export default {
  data() {
    return {
      dialog: false,
      msg: "",
      showbtn: true,
      btntxt: "No",
    };
  },
  sockets: {
    alreadyConnected: function (data) {
      if (data.connected) {
        if (data.sameUser) {
          if (!data.sameTab) {
            this.msg =
              "Current page is open in another window, do you want to continue here?";
            this.dialog = true;
          }
        } else {
          if (data.connectedBy !== "") {
            this.msg = data.connectedBy + "  is currently editing this page";
            this.showbtn = false;
            this.btntxt = "Ok";
            this.dialog = true;
          }
        }
      }
    },
    closeCurrentPage: function (data) {
      this.msg = "This page is closed";
      this.showbtn = false;
      this.btntxt = "Ok";
      this.dialog = true;
    },
    receiveNotify: function (data) {
      alert(data);
    },
  },
  mounted() {
    this.$socket.emit("checkSend", "hello how are you?");
    this.$socket.emit("checkConnectionAvailable", {
      username: window.username,
      pageId: this.$router.currentRoute.params.id,
    });
  },
  methods: {
    goBack() {
      this.dialog = false;
      this.$router.push("/");
    },
    closeTab() {
      this.msg = "";
      this.dialog = false;
      this.$socket.emit("closeOtherTab", {
        pageId: this.$router.currentRoute.params.id,
      });
    },
  },
};
</script>