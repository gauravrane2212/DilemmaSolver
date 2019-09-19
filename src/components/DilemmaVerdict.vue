<template>
  <v-card
    class="mx-auto"
    max-width="860"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">Verdict</div>
        <v-list-item-title class="body mb-1">{{decisionText}}</v-list-item-title>
        <v-progress-linear
          :value="decisionPercent"
          :color="decisionColor"
          height="25"
          reactive
        >
          <template v-slot="{ value }">
            <strong class="white--text">{{ Math.ceil(value) }}%</strong>
          </template>
        </v-progress-linear>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {DilemmaScore} from '@/db/firebaseApi';

@Component({})
export default class DilemmaVerdict extends Vue {
  @Prop({required: true})
  private score!: DilemmaScore;

  private get decisionText(): string {
    if (this.score.total_pro_score === this.score.total_con_score) {
      return `You are still in dilemma! Add more arguments...`;
    }
    return `You choose to go ${(this.score.total_pro_score > this.score.total_con_score) ? 'with' : 'against'} your dilemma`;
  }

  private get decisionPercent(): number {
    const totalScore = this.score.total_pro_score + this.score.total_con_score;

    if (this.score.total_pro_score >= this.score.total_con_score) {
      const prosPercent = this.score.total_pro_score  * 100 / totalScore;
      return Math.round(prosPercent * 100) / 100;
    } else {
      const consPercent = this.score.total_con_score  * 100 / totalScore;
      return Math.round(consPercent * 100) / 100;
    }
  }

  private get decisionColor(): string {
    if (this.score.total_pro_score === this.score.total_con_score) {
      return 'teal';
    }
    return (this.score.total_pro_score > this.score.total_con_score) ? 'green' : 'red';
  }
}
</script>
