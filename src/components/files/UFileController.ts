export type ProgressEventHandler = (ev: ProgressEvent<EventTarget>) => any;

export interface UploadResponse {
  type: 'success' | 'network-error' | 'server-error' | 'abort';
  status: number;
  message: string;
  data: any;
}

export interface UFileConfig {
  url: string;
  headers?: Record<string, string>;
  addCredential?: boolean;
}

export class UFileController {
  private static readonly requests: Map<File, XMLHttpRequest> = new Map();
  private static url: string = '';
  private static headers: Record<string, string> = {};
  private static addCredential: boolean = false;

  public static async setConfig(config: UFileConfig) {
    this.url = config.url;
    this.headers = config.headers || {};
    this.addCredential = config.addCredential || false;
  }

  public static async upload(file: File, onProgress: ProgressEventHandler): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('file', file);
      
      const request = new XMLHttpRequest();
      this.requests.set(file, request);
      request.open('POST', this.url, true);
      request.withCredentials = this.addCredential;
      for(const key in this.headers) {
        request.setRequestHeader(key, this.headers[key]);
      }

      request.onload = () => {
        this.requests.delete(file);
        if (request.status >= 200 && request.status < 300) {
          console.log('response:', request);
          resolve({
            type: 'success',
            status: request.status,
            message: request.statusText,
            data: request.response
          });
        } else {
          reject({
            type: request.status >= 500 ? 'server-error' : 'network-error',
            status: request.status,
            message: request.statusText,
            data: request.response
          });
        }
      }
      request.onerror = (event) => {
        console.log('error:', event);
        reject({
          type: 'network-error',
          status: request.status,
          message: request.statusText,
          data: request.response
        });
      };
      request.onabort = (event) => {
        console.log('abort:', event);
        reject({
          type: 'abort',
          status: request.status,
          message: request.statusText,
          data: request.response
        });
      };
      request.upload.onprogress = (event) => {
        onProgress(event);
      };

      request.send(form);
    });
  }

  public static async clear(file: File) {
    const request = this.requests.get(file);
    if(request) {
      request.abort();
      this.requests.delete(file);
    }
  }

  public static async clearAll() {
    this.requests.forEach((request) => {
      request.abort();
    });
    this.requests.clear();
  }

}