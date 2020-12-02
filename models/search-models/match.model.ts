export default class Match {
    constructor(
        public champion: number,
        public gameId: number,
        public lane: string,
        public platformId: string,
        public queue: number,
        public role: string,
        public season: number,
        public timestamp: number
    ) { }
}
