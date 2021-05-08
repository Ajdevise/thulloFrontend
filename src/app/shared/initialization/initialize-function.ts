import { AppInitService } from "./app-init.service";

export function initializeApp1(appInitService: AppInitService) {
    return (): Promise<any> => {
        return appInitService.init();
    }
}