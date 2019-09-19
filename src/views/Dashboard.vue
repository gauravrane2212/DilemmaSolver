<template>
  <div>
    <v-card
        class="mx-auto mt-5"
        width="860"
    >
      <v-card-title
        class="align-end fill-height title teal d-flex justify-space-between">
        <span class="card-title-text">
          What is the dilemma that you are facing now?
        </span>
        <v-btn
          :loading="isSavingDilemma"
          :disabled="currentArguments.length === 0"
          dark
          color="white"
          class="ma-2 tile teal--text"
          @click="saveDilemma()"
        >
          Save
          <v-icon right dark>mdi-cloud-upload</v-icon>
        </v-btn>
      </v-card-title>
      <v-col
        class="mt-2"
        cols="24"
        sm="12"
        >
        <v-text-field
          class="m-5 regular"
          label="Phrase your dilemma here with a Yes or No answer..."
          v-model="dilemma"
          clearable
          outlined>
        </v-text-field>
        <v-slide-y-transition>
          <DilemmaVerdict
            v-show="pros.length > 0 || cons.length > 0"
            :score="currentScore">
          </DilemmaVerdict>
        </v-slide-y-transition>
      </v-col>
    </v-card>

    <v-slide-y-transition>
      <DilemmaArgument
        v-show="dilemma.length > 0"
        @submitPressed="submitArgument"
        />
    </v-slide-y-transition>

    <v-slide-y-transition>
      <DilemmaProCon v-show="pros.length > 0" title="Pros" :arguments="pros"/>
    </v-slide-y-transition>

    <v-slide-y-transition>
      <DilemmaProCon v-show="cons.length > 0" title="Cons" :arguments="cons"/>
    </v-slide-y-transition>

    <v-snackbar
      :color="showSuccessSnackBar ? 'success' : 'error'"
      top
      :timeout="5000"
      v-model="showSnackBar"
    >
      {{ snackBarMessage }}
      <v-btn
        dark
        text
        @click="showSnackBar = false"
      >
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script lang="ts">
import {Vue, Component} from 'vue-property-decorator';
import DilemmaProCon from '@/components/DilemmaProCon.vue';
import DilemmaVerdict from '@/components/DilemmaVerdict.vue';
import DilemmaArgument from '@/components/DilemmaArgument.vue';
import api, { Argument, DilemmaScore, Dilemma } from '@/db/firebaseApi';

@Component({
  components: {
    DilemmaProCon,
    DilemmaVerdict,
    DilemmaArgument,
  },
})
export default class Dashboard extends Vue {
  private dilemma: string = '';
  private currentArguments: Argument[] = [];

  private isSavingDilemma: boolean = false;
  private showSnackBar: boolean = false;
  private showSuccessSnackBar: boolean = true;

  private submitArgument(argument: Argument) {
    this.currentArguments.push(argument);
  }

  private get pros(): Argument[] {
    return this.currentArguments.filter((argument: Argument) => argument.isPro);
  }

  private get cons(): Argument[] {
    return this.currentArguments.filter((argument: Argument) => !argument.isPro);
  }

  private get currentScore(): DilemmaScore {
    return {
      total_con_score: this.getTotalScore(this.cons),
      total_pro_score: this.getTotalScore(this.pros),
    };
  }

  private get snackBarMessage(): string {
    return this.showSuccessSnackBar ? 'Dilemma saved successfully!' : 'Error saving dilemma. Please try again!';
  }

  private getTotalScore(array: Argument[]): number {
    return array.map((el) => el.importance).reduce((p, c) => p + c, 0);
  }

  private async saveDilemma(): Promise<void> {
    this.isSavingDilemma = true;
    const dilemma: Dilemma = {
      question: this.dilemma,
      date: new Date().toDateString(),
      score: this.currentScore,
      arguments: this.currentArguments,
    };
    await api.saveDilemma(dilemma).catch((error) => this.showSuccessSnackBar = false);
    this.isSavingDilemma = false;
    this.showSnackBar = true;

    this.resetDilemmaState();
  }

  private resetDilemmaState() {
    this.currentArguments = [];
    this.dilemma = '';
  }
}
</script>

<style>
.card-title-text {
  color: white;
}
</style>