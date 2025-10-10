export interface Camera {
  id: number;
  name: string;
  status: 'online' | 'offline' | 'recording';
  resolution: 'high' | 'low';
  nightVision: boolean;
  motionDetection: boolean;
  lastRecording?: Date;
  location?: string;
  streamUrl?: string;
}
