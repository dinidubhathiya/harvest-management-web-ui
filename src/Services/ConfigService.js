import config from '../config.json';

export const getHarvestManagementServiceUrl = () => {
    return config.UrlRegistry.HarvestManagementServiceUrl;
}

export const getAuthorizationHeader = () => {
    return config.AuthonticationToken;
}