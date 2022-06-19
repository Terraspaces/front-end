import { apiCall } from "./_apicall";

export const drop_get = async () => {
    const url = `${process.env.NEXT_PUBLIC_API}/drops`;
    const results = await apiCall(url)
    return results
}

export const drop_like = async (params: { drop_name: string, account_id: string }) => {
    const url = `${process.env.NEXT_PUBLIC_API}/drops/like`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    await apiCall(url, options);
}

export const drop_unlike = async (params: { drop_name: string, account_id: string }) => {
    const url = `${process.env.NEXT_PUBLIC_API}/drops/unlike`;
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    await apiCall(url, options);
}

export const submit_referral = async (params: { referral_wallet_id: string, referred_wallet_id: string, collection_name: string }) => {
    const url = 'https://dev-api.terraspaces.io/referral';
    const options = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params)
    }
    await apiCall(url, options, true);
}

export const getReferralStats = async (wallet_id: string) => {
    const url = `https://dev-api.terraspaces.io/referral/${wallet_id}/stats`;
    const results = await apiCall(url);
    return results;
}