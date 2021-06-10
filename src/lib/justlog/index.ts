import type { JustlogAvailableLogsResponse, JustlogChanngelsResponse, JustlogMessagesResponse, JustlogLogQuery, JustlogAvailableLogsQuery } from "./types";
export * from "./types";

export class Justlog {
    private base: string;
    private token?: string;

    constructor(base: string, token?: string) {
        this.base = base;
        this.token = token;
    }

    private async fetch<T>(path: string, init?: RequestInit): Promise<T> {
        if (!init)
            init = {}
        if (this.token && init) {
            if (!init.headers)
                init.headers = {};
            init.headers["X-Api-Key"] = `Bearer ${this.token}`;
        }

        const response = await fetch(`${this.base}/${path}`, init);

        if (response.status !== 200)
            throw new Error(await response.text());

        const json: T = await response.json();
        return json;
    }

    private async _getLogs(channel: string | number, query?: JustlogLogQuery, user?: string | number, year?: number, month?: number, random = false): Promise<JustlogMessagesResponse> {
        let path: Array<string> = [];

        switch (typeof channel) {
            case "string":
                path.push("channel", channel);
                break;
            case "number":
                path.push("channelid", channel.toString());
                break;
        }
        switch (typeof user) {
            case "string":
                path.push("user", user);
                break;
            case "number":
                path.push("userid", user.toString());
                break;
        }

        if (random) {
            path.push("random");
        }
        else if (year) {
            path.push(year.toString());
            if (month)
                path.push(month.toString());
        }

        return await this.fetch<JustlogMessagesResponse>(path.join("/") + "?json=1" + 
            (query ? ("&" + new URLSearchParams(query as Record<string, string>).toString()) : ""));
    }

    async getLogs(channel: string | number, query?: JustlogLogQuery, user?: string | number, year?: number, month?: number): Promise<JustlogMessagesResponse> {
        return await this._getLogs(channel, query, user, year, month);
    }

    async getRandom(channel: string | number, user: string | number, query?: JustlogLogQuery): Promise<JustlogMessagesResponse> {
        return await this._getLogs(channel, query, user, 0, 0, true);
    }

    async getChannels(): Promise<JustlogChanngelsResponse> {
        return await this.fetch<JustlogChanngelsResponse>("channels");
    }

    async listLogs(query: JustlogAvailableLogsQuery): Promise<JustlogAvailableLogsResponse> {
        return await this.fetch<JustlogAvailableLogsResponse>("list?" + new URLSearchParams(query as Record<string, string>).toString());
    }
}