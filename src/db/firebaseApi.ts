import db from '@/db/firebaseInit';

export interface Argument {
  isPro: boolean;
  reasoning: string;
  importance: number;
}

export interface Dilemma {
  id: number;
  date: string;
  question: string;
  arguments: Argument[];
  total_pro_score: number;
  total_con_score: number;
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
};

export default api;
