import {getHarvestManagementServiceUrl, getAuthorizationHeader} from './ConfigService';

export const getHarvestRecords = (filters) => {
    const queryValues = new URLSearchParams();
    
        filters.orchardIds.forEach((val) => {
        queryValues.append('orchardIds', val);
    })

    if(filters.orchardIds.length > 0){
        queryValues.orchardIds = filters.orchardIds;
    } 
    if(!!filters.start){
        queryValues.append('start', filters.start.format());
    }
    if(!!filters.end){
        queryValues.append('end', filters.end.format());
    }
    return fetch(`${getHarvestManagementServiceUrl()}/api/v1/Harvest?`+ queryValues, {
        method: 'GET',
        headers: {'Authorization': getAuthorizationHeader()}
    });
}