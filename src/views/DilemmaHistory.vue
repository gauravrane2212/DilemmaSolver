<template>
  <v-card
      class="mx-auto"
      width="1024"
  >
    <v-expansion-panels multiple class="mt-5">
      <v-expansion-panel
        v-for="(dilemma,i) in dilemmas"
        :key="i"
      >
        <v-expansion-panel-header >
          {{dilemma.question}}
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <DilemmaSummary :dilemma="dilemma"></DilemmaSummary>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </v-card>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import DilemmaSummary from '@/components/DilemmaSummary.vue';
import api, { Dilemma, Argument } from '@/db/firebaseApi';

@Component({
  components: {
    DilemmaSummary,
  },
})
export default class DilemmaHistory extends Vue {
  private dilemmas: Dilemma[] = [];

  private async created(): Promise<void> {
    this.dilemmas = await api.fetchPastDilemmas();
  }
}
</script>
