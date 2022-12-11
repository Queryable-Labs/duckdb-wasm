export function getIPFSUrl(url : string, location?: number, bytes?: number): string {
    const parsedUrl = new URL(url);

    if (location) {
        parsedUrl.searchParams.set("offset", location.toString());
    }

    if (bytes) {
        parsedUrl.searchParams.set("length", bytes.toString());
    }

    return parsedUrl.toString();
}

export function getIPFSFileSize(url: string): number {
    const parsedUrl = new URL(url);

    console.log("Search params", JSON.stringify(parsedUrl.searchParams));

    return parseInt(parsedUrl.searchParams.get('fileSize') as string, 10);
}

export function getIPFSLastModificationTime(url: string): number {
    const parsedUrl = new URL(url);

    return parseInt(parsedUrl.searchParams.get('lastModificationTime') as string, 10) || new Date().getTime();
}
