<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field placeholder="enter username" v-model="username" />
        </v-col>
        <v-col>
          <v-btn @click="goToAbout" style="margin:0px 10px" color="primary">Check</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";

export default {
  name: "Home",
  components: {
    HelloWorld,
  },
  data() {
    return {
      username: "",
    };
  },
  methods: {
    goToAbout() {
      window.username = this.username;
      this.$router.push("/about/1");
      this.$socket.emit("checkSend", "hello how are you?");
    },
  },
};
</script>
