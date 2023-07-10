import {PageBody} from "./work-system-body";
import {IPageMeta, PageMeta, IPageData, PageData} from "./work-system-header";

export interface IWorkSystem {
  id?: string
  // pageMeta: IPageMeta;
  pageMeta: PageMeta,
  // pageData: IPageData;
  pageData: PageData,
  body: PageBody
}

export class WorkSystem implements IWorkSystem {
  constructor(
    public id: string,
    // public pageMeta: PageMeta,
    public pageMeta: PageMeta,
    // public pageData: PageData,
    public pageData: PageData,
    public body: PageBody
  ) {
  }
}


