<template>
  <v-card
      class="mx-auto mt-5"
      width="860"
  >
    <v-card-title
      class="align-end fill-height title teal">
      <span class="card-title-text">
        Argument Input
      </span>
    </v-card-title>
    <v-col
      class="mt-2 d-inline-flex justify-space-between"
      cols="24"
      sm="12"
      >
      <v-text-field
        class="regular"
        label="Enter pro or con for the dilemma..."
        v-model="argumentText"
        clearable
        outlined>
      </v-text-field>
      <v-switch
        v-model="isPro"
        color="teal"
        class="ml-2"
        label="is Pro">
      </v-switch>
    </v-col>
    <v-row class="mx-2">
      <v-col cols="24" sm="12">
        <v-slider
          v-model="importance"
          label="Specify importance"
          min=1
          max=10
          step="1"
          color="teal"
          track-color="#c9c9c9"
          thumb-label="always"
          ticks
        ></v-slider>
      </v-col>
    </v-row>
    <v-row class="ma-2">
      <v-col cols="3">
        <v-btn :disabled="argumentText.length === 0" @click="submitArgument">submit</v-btn>
      </v-col>
    </v-row>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Emit} from 'vue-property-decorator';
import { Argument } from '../db/firebaseApi';

@Component({})
export default class DilemmaArgument extends Vue {
  private argumentText: string = '';
  private isPro: boolean = true;
  private importance: number = 5;

  @Emit('submitPressed')
  private submitArgument(): Argument {
    const argument: Argument = {
      isPro: this.isPro,
      importance: this.importance,
      reasoning: this.argumentText,
    };
    this.resetArgumentState();
    return argument;
  }

  private resetArgumentState() {
    this.argumentText = '';
    this.isPro = true;
    this.importance = 5;
  }
}
</script>

<style>

</style>