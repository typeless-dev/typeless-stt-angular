import { Injectable, OnDestroy } from '@angular/core';
import { WebsocketManager } from './WebsocketManager';

interface StartRecordingResponse {
  microphoneLabel: string;
  error: string;
}

interface RecordAudioProps {
  onNewResult: (data: any) => void;
  websocketUrl: string;
  language: string;
  hotwords: string[];
  hotwordsWeight?: number;
  onStop: (entireAudioBlob: Blob, callKey: string) => void;
  manualPunctuation: boolean;
  voiceCommands?: { [key: string]: string };
  domain?: string;
}

@Injectable({
  providedIn: 'root',
})
export class AudioRecordingService implements OnDestroy {
  private webSocketManager: WebsocketManager | null = null;
  private currentlyStarting: boolean = false;
  private currentlyStopping: boolean = false;
  public currentlyRecording: boolean = false;

  constructor() {}

  async stopRecording(): Promise<string> {
    if (this.currentlyStopping || this.currentlyStarting) {
      return 'already_stopping';
    }
    this.currentlyStopping = true;
    const res = this.webSocketManager
      ? await this.webSocketManager.stop()
      : 'not_started';
    this.webSocketManager = null;
    this.currentlyStopping = false;
    this.currentlyRecording = false;
    return res;
  }

  async startRecording(
    props: RecordAudioProps & { callKey: string }
  ): Promise<StartRecordingResponse> {
    if (this.currentlyStopping) {
      return { microphoneLabel: '', error: 'stopping' };
    }
    if (this.currentlyStarting) {
      return { microphoneLabel: '', error: 'already_starting' };
    }
    if (this.currentlyRecording) {
      return { microphoneLabel: '', error: 'already_recording' };
    }
    this.currentlyStarting = true;
    this.webSocketManager = new WebsocketManager(
      props.onNewResult,
      props.websocketUrl,
      props.language,
      props.callKey,
      props.hotwords,
      props.onStop,
      props.manualPunctuation,
      props.hotwordsWeight,
      props.voiceCommands,
      props.domain
    );
    const microphoneLabel = await this.webSocketManager.start();
    this.currentlyStarting = false;
    this.currentlyRecording = true;
    return {
      microphoneLabel,
      error: '',
    };
  }

  ngOnDestroy(): void {
    this.stopRecording();
  }
}
