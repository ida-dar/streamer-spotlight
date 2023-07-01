import { Streamer } from './streamer.interface';

export interface ClientToServerEvents {
  streamerAdded: () => void;
  votesUpdated: (streamer: Streamer) => void;
}

export interface SocketData {
  streamer: Streamer;
}
