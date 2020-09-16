<template>
  <div class="home">
    <v-container>
      <v-row>
        <v-col>
          <v-text-field placeholder="enter username" v-model="username" />
        </v-col>
        <v-col>
          <v-text-field placeholder="enter pageid" v-model="pageId" />
        </v-col>
        <v-col>
          <v-btn @click="goToAbout" style="margin:0px 10px" color="primary">Check</v-btn>
        </v-col>
      </v-row>​
      <v-row>
        <router-link to="/usecase/Drivers" target="_blank">
          <v-btn style="margin:0px 10px" color="primary">Drivers</v-btn>
        </router-link>
        <router-link to="/usecase/Vechile" target="_blank">
          <v-btn style="margin:0px 10px" color="primary">Vechile</v-btn>
        </router-link>
        <router-link to="/usecase/GL SOV" target="_blank">
          <v-btn style="margin:0px 10px" color="primary">GL SOV</v-btn>
        </router-link>
        <router-link to="/usecase/Property" target="_blank">
          <v-btn style="margin:0px 10px" color="primary">Property</v-btn>
        </router-link>
      </v-row>​
      <v-row>
        <v-col cols="4">
          <v-text-field placeholder="Enter message" v-model="classmsg" />
        </v-col>
        <v-col>
          <v-btn
            @click="sendNotification('Broadcast')"
            style="margin:0px 10px"
            color="primary"
          >Broadcast</v-btn>
          <v-btn
            @click="sendNotification('Drivers')"
            style="margin:0px 10px"
            color="primary"
          >Drivers</v-btn>
          <v-btn
            @click="sendNotification('Vechile')"
            style="margin:0px 10px"
            color="primary"
          >Vechile</v-btn>
          <v-btn
            @click="sendNotification('Property')"
            style="margin:0px 10px"
            color="primary"
          >Property</v-btn>
          <v-btn @click="sendNotification('GL SOV')" style="margin:0px 10px" color="primary">GL SOV</v-btn>
          <!-- <v-btn
            @click="notifyClass"
            style="margin:0px 10px"
            color="primary"
          >Notify classification Screen</v-btn>-->
        </v-col>
      </v-row>​
      <!-- <v-row>
        <v-col>
          <v-text-field placeholder="enter notification message" v-model="extracmsg" />
        </v-col>
        <v-col>
          <v-btn
            @click="notifyExtract"
            style="margin:0px 10px"
            color="primary"
          >Notify Exatraction Screen</v-btn>
        </v-col>
      </v-row>-->
    </v-container>
  </div>
</template>
​
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
      pageId: "",
      classmsg: "",
      extracmsg: "",
    };
  },
  methods: {
    goToUsecase() {},
    goToAbout() {
      window.username = this.username;
      window.pageId = this.pageId;
      this.$router.push("/about/" + this.pageId);
      this.$socket.emit("checkSend", "hello how are you?");
    },
    notifyClass() {
      this.$socket.emit("notifyClassification", this.classmsg);
    },
    notifyExtract() {
      this.$socket.emit("notifyExtraction", this.extracmsg);
    },
    sendNotification(type) {
      this.$socket.emit("sendNotification", {
        msg: this.classmsg,
        type: type,
      });
    },
  },
};
</script>