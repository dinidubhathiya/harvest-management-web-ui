import {getHarvestManagementServiceUrl, getAuthorizationHeader} from './ConfigService';

export const getAllOrchards = () => {
    const ss= getAuthorizationHeader();
    return fetch(`${getHarvestManagementServiceUrl()}/api/v1/Orchard/all`, {
        method: 'GET',
        headers: {'Authorization': getAuthorizationHeader()}
    });
}