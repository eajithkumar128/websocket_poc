<template>
  <v-container>
    <div class="about">
      <div>
        <v-btn @click="goBack">Back</v-btn>
      </div>
      <h1>This is an about page</h1>
    </div>
  </v-container>
</template>

<script>
export default {
  sockets: {
    alreadyConnected: function (data) {
      if (data.connected) {
        if (data.sameUser) {
          if (!data.sameTab) {
            let confrm = confirm("Close the other tab");
            if (confrm) {
              this.$socket.emit("closeOtherTab", {
                pageId: this.$router.currentRoute.params.id,
              });
            }
          }
        } else {
          alert("different User");
        }
      }
    },
    closeCurrentPage: () => {
      alert("This page is closed");
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
      this.$router.push("/");
    },
    closeTab() {
      this.$socket.emit("closeOtherTab", {
        pageId: this.$router.currentRoute.params.id,
      });
    },
  },
};
</script>
