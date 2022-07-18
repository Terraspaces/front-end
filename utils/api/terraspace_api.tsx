import { apiCall } from "./_apicall";

export const drop_get = async () => {
    const url = `https://dev-api.terraspaces.io/drops`;
    const results = await apiCall(url)
    return results
}

export const drop_like = async (params: { drop_name: string, account_id: string }) => {
    const url = `https://dev-api.terraspaces.io/drops/like`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    await apiCall(url, options);
}

export const drop_unlike = async (params: { drop_name: string, account_id: string }) => {
    const url = `https://dev-api.terraspaces.io/drops/unlike`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    await apiCall(url, options);
}

export const submit_referral = async (params: { referral_wallet_id: string, referred_by: string, collection_name: string }) => {
    const url = `https://dev-api.terraspaces.io/referral`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    const result = await apiCall(url, options);
    return result
}

// export const getReferralStats = async (wallet_id: string) => {
//     const url = `https://dev-api.terraspaces.io/referral/${wallet_id}/stats`;
//     const results = await apiCall(url);
//     return results;
// }

export const getCollectionNameList = async () => {
    const url = `https://dev-api.terraspaces.io/drops/sorted`;
    const results = await apiCall(url);
    return results
}

export const getReferralTerraStats = async (wallet_id: string) => {
    const url = `https://dev-api.terraspaces.io/referral/${wallet_id}/stats/terraspaces`;
    const results = await apiCall(url);
    return results
}

export const getReferralStakingStats = async (wallet_id: string) => {
    const url = `https://dev-api.terraspaces.io/referral/${wallet_id}/stats/staking_partners`;
    const results = await apiCall(url);
    return results
}