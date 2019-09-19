import db from '@/db/firebaseInit';

export interface Argument {
  isPro: boolean;
  reasoning: string;
  importance: number;
}

export interface DilemmaScore {
  total_pro_score: number;
  total_con_score: number;
}

export interface Dilemma {
  date: string;
  question: string;
  arguments: Argument[];
  score: DilemmaScore;
}

const api = {
  fetchPastDilemmas: async (): Promise<Dilemma[]> => {
    const querySnapshot = await db.collection('dilemmas').get();
    const result: Dilemma[] = [];
    querySnapshot.forEach((doc) => {
      result.push(doc.data() as Dilemma);
    });
    return result;
  },
  saveDilemma: async (dilemma: Dilemma): Promise<void> => {
    await db.collection('dilemmas').add({...dilemma});
  },
};

export default api;
