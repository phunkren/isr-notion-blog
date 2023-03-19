import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

type Cover = {
  type: "external";
  file: {
    url: string;
  };
};

type Date = {
  id: string;
  type: string;
  date: {
    start: string;
    end?: string;
  };
};

type Page = {
  id: string;
  type: string;
  title: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    annotations: {
      bold: boolean;
      italic: boolean;
      strikethrough: boolean;
      underline: boolean;
      code: boolean;
      color: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Published = {
  id: string;
  type: string;
  checkbox: boolean;
};

type Canonical = {
  id: string;
  type: string;
  url: string;
};

type Abstract = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type Slug = {
  id: string;
  type: string;
  rich_text: {
    type: string;
    text: {
      content: string;
      link?: string;
    };
    plain_text: string;
    href?: string;
  }[];
};

type TagColor =
  | "gray"
  | "brown"
  | "orange"
  | "yellow"
  | "green"
  | "blue"
  | "purple"
  | "pink"
  | "red"
  | "default";

export type Tag = {
  id: string;
  name: string;
  color: TagColor;
  count?: number;
};

type Tags = {
  id: string;
  type: string;
  multi_select: Tag[];
};

export type BlogPost = PageObjectResponse & {
  cover: Cover;
  properties: {
    published: Published;
    canonical: Canonical;
    abstract: Abstract;
    page: Page;
    date: Date;
    slug: Slug;
    tags: Tags;
  };
};
