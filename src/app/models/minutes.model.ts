export interface Minutes {
  id: string;
  idActa: string;
  place: string;
  category: string;
  journey: number;
  date: Date;
  startTime: Date;
  startSecondTime: Date;
  homeName: string;
  homePlayingColour: string;
  homeColourGKPlayer: string;
  homeDungareesColour: string;
  visitorName: string;
  visitorPlayingColour: string;
  visitorColourGKPlayer: string;
  visitorDungareesColour: string;
  localScore: number;
  localFoulScore: number;
  visitorScore: number;
  visitorFoulScore: number;
  localTimeoutUsed: boolean;
  visitorTimeoutUsed: boolean;
  incidents: string;
}


  
  