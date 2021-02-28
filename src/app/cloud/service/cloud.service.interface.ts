export interface ICloudService {
    export(): Promise<boolean>;
    import(file: File);
}
