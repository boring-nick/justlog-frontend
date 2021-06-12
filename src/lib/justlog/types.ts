export interface JustlogMessage {
    text: string;
    username: string;
    displayName: string;
    channel: string;
    timestamp: Date;
    id: string;
    type: number;
    raw: string;
    tags: Record<string, string>;
}

export interface JustlogLogQuery {
    json?: boolean;
    reverse?: boolean;
    from?: Date;
    to?: Date;
}

export interface JustlogMessagesResponse {
    messages: Array<JustlogMessage>;
}

export interface JustlogAvailableLog {
    year: string;
    month: string;
}

export interface JustlogAvailableLogsQuery {
    channel?: string;
    user?: string;
    channelid?: string;
    userid?: string;
}

export interface JustlogAvailableLogsResponse {
    availableLogs: Array<JustlogAvailableLog>;
}

export interface JustlogChannel {
    name: string;
    userID: string;
}

export interface JustlogChannelsResponse {
    channels: Array<JustlogChannel>;
}

export interface JustlogModifyChannelsRequest {
    channels: Array<string>;
}