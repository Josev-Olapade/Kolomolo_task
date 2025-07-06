export type EventPayload = {
  Headers: {
    userid: string;
  };
  body: string;
};

export type EventBody = {
  actionid: string;
};

export type ResponseType = {
  statusCode: number;
  body: {
    timestamp?: Date;
    color?: string;
    image?: string;
    result?: number;
    message?: string;
  };
};

export type Handler = {
  handle: (sources: any[]) => Promise<any> | any;
};
