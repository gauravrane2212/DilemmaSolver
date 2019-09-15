<template>
  <v-app-bar
    color="teal"
    dark
    app>
    <v-toolbar-title class="headline text-uppercase">
      <router-link to="/" class="toolbar-title">
        <span>Dilemma Solver</span>
      </router-link>
    </v-toolbar-title>
    <v-spacer/>
    <v-btn
      color="white"
      class="ma-2"
      to="/history">
      <v-icon color="teal">mdi-playlist-check</v-icon>
      <span class="btn-text">Past Dilemmas</span>
    </v-btn>
    <v-btn
      color="white"
      class="ma-2"
      to="/about">
      <v-icon color="teal">mdi-account-circle</v-icon>
      <span class="btn-text">About</span>
    </v-btn>
  </v-app-bar>
</template>

<style scoped>
.toolbar-title {
  color: inherit;
  text-decoration: inherit;
}

.btn-text {
  color:teal;
}
</style>
