<template>
  <v-card
    class="mx-auto mt-2"
    max-width="860"
    outlined
  >
    <v-list subheader>
      <v-subheader>{{title}}</v-subheader>
      <template v-for="(argument, i) in argumentList">
        <v-list-item :key="`${i}-${argument.reasoning}`">
          <v-list-item-content>
            <v-list-item-title v-text="argument.reasoning"></v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-icon medium :color="scoreColor(argument.isPro)">{{argumentScoreIcon(argument.importance)}}</v-icon>
          </v-list-item-icon>
        </v-list-item>
        <v-divider
          v-if="i + 1 < argumentList.length"
          :key="i"
        ></v-divider>
      </template>
    </v-list>
  </v-card>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import {Argument} from '@/db/firebaseApi';

@Component({})
export default class DilemmaProCon extends Vue {
  @Prop({required: true})
  private arguments!: Argument[];

  @Prop({required: true})
  private title!: string;

  get argumentList(): Argument[] {
    return this.arguments;
  }

  private argumentScoreIcon(score: number): string {
    return `mdi-numeric-${score}-box`;
  }

  private scoreColor(isPro: boolean): string {
    return isPro ? 'green' : 'red';
  }
}
</script>
