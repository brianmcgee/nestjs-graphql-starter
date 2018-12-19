export abstract class Clock {
	abstract now(): number;
}

export class ServerClock implements Clock {
	now(): number {
		return new Date().getTime();
	}
}
