<template>
  <v-snackbar
    :color="color"
    top
    :timeout="5000"
    :value="show"
    @input="dismissSnackbar"
  >
    {{ message }}
    <v-btn
      dark
      text
      @click="dismissSnackbar"
    >
      Close
    </v-btn>
  </v-snackbar>
</template>

<script lang="ts">
import {Vue, Component, Prop, Emit} from 'vue-property-decorator';

@Component({})
export default class DilemmaSnackbar extends Vue {
  @Prop({required: true})
  private show!: boolean;

  @Prop({required: true})
  private color!: string;

  @Prop({required: true})
  private message!: string;

  @Emit('dismiss')
  private dismissSnackbar(): void {
    return;
  }
}
</script>
