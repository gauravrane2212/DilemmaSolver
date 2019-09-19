<template>
  <div>
    <DilemmaVerdict :score="dilemma.score"></DilemmaVerdict>
    <DilemmaProCon title="Pros" :arguments="pros"></DilemmaProCon>
    <DilemmaProCon title="Cons" :arguments="cons"></DilemmaProCon>
  </div>
</template>

<script lang="ts">
import {Vue, Component, Prop} from 'vue-property-decorator';
import DilemmaVerdict from '@/components/DilemmaVerdict.vue';
import DilemmaProCon from '@/components/DilemmaProCon.vue';
import {Dilemma, Argument, DilemmaScore} from '@/db/firebaseApi';

@Component({
  components: {
    DilemmaVerdict,
    DilemmaProCon,
  },
})
export default class DilemmaSummary extends Vue {
  @Prop({required: true})
  private dilemma!: Dilemma;

  private get pros(): Argument[] {
    return this.dilemma.arguments.filter((argument: Argument) => argument.isPro);
  }

  private get cons(): Argument[] {
    return this.dilemma.arguments.filter((argument: Argument) => !argument.isPro);
  }
}
</script>
