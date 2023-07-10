import { PageMetaPageTeamOwner } from "../work-system/work-system-body"

export interface IRatingColor {
    color: String
}
export class RatingColor implements IRatingColor {
  constructor(public color: String) {
  }
}

export interface IRatingNote {
  owner: PageMetaPageTeamOwner,
  text: String,
  date: Date
}

export interface IRatingTask {
    id: string
    priority: string,
    task: string,
    notes: string,
    contributor: IRatingContibutors
    owner: IRatingOwner,
    status: string,
    dueDate: Date,
    pageId ?: string,
    pageType ?: string,
    ratingComponent ?: string,
    pageComponent ?: string

}
export class RatingTask implements IRatingTask {
    constructor(
        public id: string,
        public priority: string,
        public task: string,
        public notes: string,
        public contributor: RatingContributors,
        public owner: RatingOwner,
        public status: string,
        public dueDate: Date,
        public pageId ?: string,
        public pageType ?: string,
        public ratingComponent ?: string,
        public pageComponent ?: string
        ) { }
}
export interface IRatingDecision {
    date: Date
    summary: string,
    owner: IRatingOwner
}
export class RatingDecision implements IRatingDecision {
    constructor(
        public date: Date,
        public summary: string,
        public owner: RatingOwner) { }
}
export interface IRatingContibutors {
    userId: string,
    name: string
}
export class RatingContributors implements IRatingContibutors {
    constructor(public userId: string,
        public name: string) { }
}
export interface IRatingOwner {
    userId: string;
    name: string;
}
export class RatingOwner implements IRatingOwner {
    constructor(public userId: string,
        public name: string) { }
}
