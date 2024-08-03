import { ClearAll, ClearWindow, CreateWindow } from './Windows';

function DisplayCampaign(data){
    ClearAll();
    CreateWindow('campaign_preview', {
        title: data.name
    });
}

export {
    DisplayCampaign
};