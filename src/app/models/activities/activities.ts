import { PageMetaPageTeamOwner } from "../work-system/work-system-body";

export interface ActivityRequest {
  pageType: String,
  pageComponent: String,
  ratingComponent: String,
  owner: String,
  date: String,
  priority: String,
  contributor: String,
  color: String
}

export interface ActivityResponse {
  type: String,
  color: String,
  //description
  note: String,
  dueDate: String,
  priority: String,
  ownerName: String,
  creationDate: Date
}
